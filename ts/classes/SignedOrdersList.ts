import { SignedOrder, StateFetcher } from 'pollenium-alchemilla'
import { Uintable, Address } from 'pollenium-buttercup'
import { EngineReader, SignedOrderPair, Solution, OrderDirection } from 'pollenium-alchemilla'
import { Uish } from 'pollenium-uvaursi'
import { Proposal } from '../interfaces/Proposal'

export class InvalidQuotTokenError extends Error {
  constructor() {
    super('Invalid quot token')
    Object.setPrototypeOf(this, InvalidQuotTokenError.prototype)
  }
}

export class InvalidVariTokenError extends Error {
  constructor() {
    super('Invalid vari token')
    Object.setPrototypeOf(this, InvalidVariTokenError.prototype)
  }
}


export class SignedOrdersList {

  readonly quotToken: Address
  readonly variToken: Address

  private signedOrders: SignedOrder[] = []


  constructor(struct: { quotToken: Uish, variToken: Uish }) {
    this.quotToken = new Address(struct.quotToken)
    this.variToken = new Address(struct.variToken)
  }

  handleSignedOrder(signedOrder: SignedOrder) {
    if (!signedOrder.quotToken.uu.getIsEqual(this.quotToken)) {
      throw new InvalidQuotTokenError
    }
    if (!signedOrder.variToken.uu.getIsEqual(this.variToken)) {
      throw new InvalidVariTokenError
    }
    this.signedOrders.push(signedOrder)
  }

  removeExpirationLte(expirationCutoff: Uintable) {
    this.signedOrders = this.signedOrders.filter((signedOrder) => {
      return signedOrder.expiration.compGt(expirationCutoff)
    })
  }

  async removeFilled(stateFetcher: StateFetcher) {
    this.signedOrders = await this.fetchUnfilled(stateFetcher)
  }

  private async fetchUnfilled(stateFetcher: StateFetcher): Promise<SignedOrder[]> {
    const signedOrders: Array<SignedOrder | null> = await Promise.all(this.signedOrders.map(async (signedOrder) => {
      const fill = await stateFetcher.fetchFill(signedOrder.getSignatureHash())
      if (fill.compEq(signedOrder.tokenLimit)) {
        return signedOrder
      } else {
        return null
      }
    }))
    return signedOrders.filter((signedOrder) => {
      return signedOrder !== null
    })
  }

  private getSignedOrderPairs(): SignedOrderPair[] {
    const signedBuyyOrders = this.getSignedOrdersByDirection(OrderDirection.BUYY)
    const signedSellOrders = this.getSignedOrdersByDirection(OrderDirection.SELL)

    const signedOrderPairs: SignedOrderPair[] = []

    signedBuyyOrders.forEach((signedBuyyOrder) => {
      signedSellOrders.forEach((signedSellOrder) => {
        if (signedBuyyOrder.getPrice().lt(signedSellOrder.getPrice())) {
          return
        }
        signedOrderPairs.push(new SignedOrderPair({ signedBuyyOrder, signedSellOrder }))
      })
    })

    return signedOrderPairs
  }

  private getSignedOrdersByDirection(orderDirection: OrderDirection): SignedOrder[] {
    return this.signedOrders.filter((signedOrder) => {
      return signedOrder.direction === orderDirection
    })
  }

  async fetchProposals(stateFetcher: StateFetcher): Promise<Proposal[]> {
    const signedOrderPairs = this.getSignedOrderPairs()
    const proposals = await Promise.all(signedOrderPairs.map(async (signedOrderPair) => {
      return {
        signedOrderPair,
        solution: await signedOrderPair.calcSolution(stateFetcher)
      }
    }))
    return proposals.filter((proposal) => {
      if (proposal.solution.quotTokenTrans.compEq(0)) {
        return false
      } else {
        return true
      }
    })
  }

  async fetchBestProposal(stateFetcher: StateFetcher): Promise<Proposal | null> {
    const proposals = await this.fetchProposals(stateFetcher)
    if (proposals.length === 0) {
      return null
    }
    return proposals.sort((proposalA, proposalB) => {
      if (proposalA.solution.quotTokenArbit.compGte(proposalB.solution.quotTokenArbit)) {
        return -1
      } else {
        return 1
      }
    })[0]
  }

  getSignedOrdersCount(): number {
    return this.signedOrders.length
  }
}
