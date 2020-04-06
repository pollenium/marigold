import { EngineReader, Solution, OrderDirection, SignedOrderPair, StateFetcher } from 'pollenium-alchemilla'
import { Uish, Uu } from 'pollenium-uvaursi'
import { Address, Uint256 } from 'pollenium-buttercup'
import { $enum } from 'ts-enum-util'
import { Uint256Tracker } from './Uint256Tracker'
import { Proposal } from '../interfaces/Proposal'

export class MetaStateTracker extends StateFetcher {

  private balanceTrackersByHolderHexTokenHex: { [traderHex: string]: { [tokenHex: string]: Uint256Tracker } } = {}
  private fillTrackersBySignatureHashHex: { [signatureHashHex: string]: Uint256Tracker } = {}

  constructor(private stateFetcher: StateFetcher) {
    super()
  }

  getBalanceTracker(struct: { holder: Uish, token: Uish }): Uint256Tracker {
    const holderHex = new Address(struct.holder).uu.toHex()
    const tokenHex = new Address(struct.token).uu.toHex()
    if (this.balanceTrackersByHolderHexTokenHex[holderHex] === undefined) {
      this.balanceTrackersByHolderHexTokenHex[holderHex] = {}
    }
    if (this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex] === undefined) {
      this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex] = new Uint256Tracker(
        this.stateFetcher.fetchBalance(struct)
      )
    }
    return this.balanceTrackersByHolderHexTokenHex[holderHex][tokenHex]
  }

  getFillTracker(signatureHash: Uish): Uint256Tracker {
    const signatureHashHex = Uu.wrap(signatureHash).toHex()
    if (this.fillTrackersBySignatureHashHex[signatureHashHex] === undefined) {
      this.fillTrackersBySignatureHashHex[signatureHashHex] = new Uint256Tracker(
        this.stateFetcher.fetchFill(signatureHash)
      )
    }
    return this.fillTrackersBySignatureHashHex[signatureHashHex]
  }

  fetchBalance(struct: { holder: Uish, token: Uish }): Promise<Uint256> {
    return this.getBalanceTracker(struct).fetchCumulative()
  }

  fetchFill(signatureHash: Uish): Promise<Uint256> {
    return this.getFillTracker(signatureHash).fetchCumulative()
  }

  async calcSolution(signedOrderPair: SignedOrderPair) {
    return signedOrderPair.calcSolution(this)
  }

  async incorporateProposal(proposal: Proposal) {

    const { signedBuyyOrder, signedSellOrder, quotToken, variToken } = proposal.signedOrderPair

    const { quotTokenTrans, variTokenTrans, quotTokenArbit } = proposal.solution
    const quotTokenTotal = quotTokenTrans.opAdd(quotTokenArbit)

    const signedBuyyOrderFillTracker = this.getFillTracker(signedBuyyOrder.getSignatureHash())
    const signedSellOrderFillTracker = this.getFillTracker(signedSellOrder.getSignatureHash())

    const buyyerQuotBalanceTracker = this.getBalanceTracker({
      holder: signedBuyyOrder.getTrader(),
      token: quotToken
    })

    const buyyerVariBalanceTracker = this.getBalanceTracker({
      holder: signedBuyyOrder.getTrader(),
      token: variToken
    })

    const sellerQuotBalanceTracker = this.getBalanceTracker({
      holder: signedSellOrder.getTrader(),
      token: quotToken
    })

    const sellerVariBalanceTracker = this.getBalanceTracker({
      holder: signedSellOrder.getTrader(),
      token: variToken
    })

    await signedBuyyOrderFillTracker.increment(quotTokenTotal)
    await signedSellOrderFillTracker.increment(variTokenTrans)

    await buyyerVariBalanceTracker.increment(variTokenTrans)
    await buyyerQuotBalanceTracker.decrement(quotTokenTotal)

    await sellerQuotBalanceTracker.increment(quotTokenTrans)
    await sellerVariBalanceTracker.decrement(variTokenTrans)

  }


}
