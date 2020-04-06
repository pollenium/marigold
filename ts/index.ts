import { Bellflower } from 'pollenium-bellflower'
import { Uu, Uish } from 'pollenium-uvaursi'
import { SignedOrder, EngineReader, EngineWriter, StateFetcher, Exchange } from 'pollenium-alchemilla'
import { Address, Bytes20 } from 'pollenium-buttercup'
import { ethers } from 'ethers'
import { SignedOrdersList } from './classes/SignedOrdersList'
import { MetaStateTracker } from './classes/MetaStateTracker'
import { Proposal } from './interfaces/Proposal'

interface Pair { quotToken: Uish, variToken: Uish}

function calcPairId(pair: Pair): Uu {
  return Uu.wrap(pair.quotToken).genXor(pair.variToken)
}

export class Marigold {

  private readonly bellflower: Bellflower
  private readonly engineReader: EngineReader
  private readonly engineWriter: EngineWriter
  private latency: number

  private isHandledBySignatureHashHex: { [signatureHashHex: string] : boolean } = {}
  private signedOrdersListsByPairIdHex: { [pairIdHex: string]: SignedOrdersList } = {}

  constructor(struct: {
    privateKey: Uish
    provider: ethers.providers.Provider,
    latency: number,
    engine: Uish
  }) {
    this.bellflower = new Bellflower(struct.provider)
    this.latency = struct.latency
    this.engineReader = new EngineReader({ provider: struct.provider, address: struct.engine })
    this.engineWriter = new EngineWriter({
      signer: new ethers.Wallet(Uu.wrap(struct.privateKey).u, struct.provider),
      address: struct.engine
    })

    this.bellflower.blockIndexSnowdrop.addHandle(async (blockIndex) => {
      await this.execute()
    })
  }

  async handleSignedOrder(signedOrder: SignedOrder) {
    console.log('handleSignedOrder')
    if (this.getIsHandled(signedOrder)) {
      return
    }
    this.getSignedOrdersListByPair({...signedOrder}).handleSignedOrder(signedOrder)
  }

  getSignedOrdersListByPair(pair: Pair): SignedOrdersList {
    const pairIdHex = calcPairId(pair).toHex()
    if (this.signedOrdersListsByPairIdHex[pairIdHex] === undefined) {
      this.signedOrdersListsByPairIdHex[pairIdHex] = new SignedOrdersList(pair)
    }
    return this.signedOrdersListsByPairIdHex[pairIdHex]
  }

  getIsHandled(signedOrder: SignedOrder): boolean {
    if (this.isHandledBySignatureHashHex[signedOrder.getSignatureHash().uu.toHex()] === true) {
      return true
    } else {
      return false
    }
  }

  private getSignedOrdersLists(): SignedOrdersList[] {
    const pairIdHexes = Object.keys(this.signedOrdersListsByPairIdHex)
    return pairIdHexes.map((pairIdHex) => {
      return this.signedOrdersListsByPairIdHex[pairIdHex]
    })
  }

  async removeExpired() {
    const blockIndex = await this.bellflower.fetchLatestBlockIndex()
    this.getSignedOrdersLists().forEach((signedOrdersList) => {
      signedOrdersList.removeExpirationLte(blockIndex.opAdd(this.latency))
    })
  }

  async removeFilled(stateFetcher: StateFetcher) {
    const blockIndex = await this.bellflower.fetchLatestBlockIndex()
    return Promise.all(this.getSignedOrdersLists().map(async (signedOrdersList) => {
      await signedOrdersList.removeFilled(stateFetcher)
    }))
  }

  async execute() {

    const metaStateTracker = new MetaStateTracker(this.engineReader)

    await this.removeExpired()
    await this.removeFilled(metaStateTracker)

    const proposals = []

    do {
      const bestProposal = await this.fetchBestProposal(metaStateTracker)
      if (bestProposal === null) {
        break;
      }
      proposals.push(bestProposal)
      await metaStateTracker.incorporateProposal(bestProposal)
    } while(proposals.length < 100)

    if (proposals.length === 0) {
      console.log('nothing to execute')
      return
    }

    const signedOrders: SignedOrder[] = []
    const exchanges: Exchange[] = []

    proposals.forEach((proposal) => {
      const { signedOrderPair, solution } = proposal
      const { signedBuyyOrder, signedSellOrder } = signedOrderPair

      if (signedOrders.indexOf(signedBuyyOrder) === -1) {
        signedOrders.push(signedBuyyOrder)
      }

      if (signedOrders.indexOf(signedSellOrder) === -1) {
        signedOrders.push(signedSellOrder)
      }

      exchanges.push({
        signedBuyyOrderIndex: signedOrders.indexOf(signedBuyyOrder),
        signedSellOrderIndex: signedOrders.indexOf(signedSellOrder),
        ...solution
      })
    })

    await this.engineWriter.execute({ signedOrders, exchanges })

  }

  private async fetchBestProposal(stateFetcher: StateFetcher): Promise<Proposal | null> {
    const unsortedProposals: Proposal[] = []

    await Promise.all(this.getSignedOrdersLists().map(async (signedOrdersList) => {
      const _unsortedProposals = await signedOrdersList.fetchProposals(stateFetcher)
      unsortedProposals.push(..._unsortedProposals)
    }))

    if (unsortedProposals.length === 0) {
      return null
    }

    const sortedProposals = unsortedProposals.sort((proposalA, proposalB) => {
      const quotTokenArbitA = proposalA.solution.quotTokenArbit
      const quotTokenArbitB = proposalB.solution.quotTokenArbit
      if (quotTokenArbitA.compGte(quotTokenArbitB)) {
        return -1
      } else {
        return 1
      }
    })

    return sortedProposals[0]
  }
}
