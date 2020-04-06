import { SignedOrdersList, InvalidQuotTokenError, InvalidVariTokenError } from './SignedOrdersList'
import { Uint256, Address, Uintable } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { SignedOrder, Order, OrderDirection, StateFetcher } from 'pollenium-alchemilla'
import { Keypair } from 'pollenium-ilex'
import { MetaStateTracker } from './MetaStateTracker'

class PseudoStateFetcher extends StateFetcher {

  private readonly fill: Uint256
  private readonly balance: Uint256

  constructor(struct: { fill: Uintable, balance: Uintable }) {
    super()
    this.fill = new Uint256(struct.fill)
    this.balance = new Uint256(struct.balance)
  }

  fetchFill(): Promise<Uint256> {
    return Promise.resolve(this.fill)
  }

  fetchBalance(): Promise<Uint256> {
    return Promise.resolve(this.balance)
  }
}

describe('SignedOrdersList', () => {

  const quotToken = new Address(Uu.genRandom(20))
  const variToken = new Address(Uu.genRandom(20))
  const randToken = new Address(Uu.genRandom(20))
  const salt = Uu.genRandom(32)

  const aliceKeypair = Keypair.generate()
  const bobKeypair = Keypair.generate()

  test('should throw InvalidQuotTokenError', async () => {
    expect.assertions(1)

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const signedOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken: randToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })

    try {
      signedOrdersList.handleSignedOrder(signedOrder)
    } catch(error) {
      expect(error).toBeInstanceOf(InvalidQuotTokenError)
    }
  })
  test('should throw InvalidVariTokenError', async () => {
    expect.assertions(1)

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const signedOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken: randToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })
    try {
      signedOrdersList.handleSignedOrder(signedOrder)
    } catch(error) {
      expect(error).toBeInstanceOf(InvalidVariTokenError)
    }
  })
  test('should handle/remove expired order', () => {

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const signedOrder0 = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })
    signedOrdersList.handleSignedOrder(signedOrder0)
    expect(signedOrdersList.getSignedOrdersCount()).toBe(1)

    const signedOrder1 = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 1,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })
    signedOrdersList.handleSignedOrder(signedOrder1)
    expect(signedOrdersList.getSignedOrdersCount()).toBe(2)

    signedOrdersList.removeExpirationLte(0)
    expect(signedOrdersList.getSignedOrdersCount()).toBe(1)

    signedOrdersList.removeExpirationLte(1)
    expect(signedOrdersList.getSignedOrdersCount()).toBe(0)
  })
  test('should create/incorporateProposal a proposal', async () => {

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const metaStateTracker = new MetaStateTracker(new PseudoStateFetcher({
      fill: 0,
      balance: 100
    }))

    const signedBuyyOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })

    const signedSellOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.SELL,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 1,
        salt
      },
      privateKey: bobKeypair.privateKey
    })

    signedOrdersList.handleSignedOrder(signedBuyyOrder)
    signedOrdersList.handleSignedOrder(signedSellOrder)

    const proposals = await signedOrdersList.fetchProposals(metaStateTracker)
    expect(proposals.length).toBe(1)

    const proposal = proposals[0]
    expect(proposal.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder)
    expect(proposal.signedOrderPair.signedSellOrder).toBe(signedSellOrder)

    expect(proposal.solution.quotTokenTrans.toNumber()).toBe(1)
    expect(proposal.solution.variTokenTrans.toNumber()).toBe(1)
    expect(proposal.solution.quotTokenArbit.toNumber()).toBe(0)

    await metaStateTracker.incorporateProposal(proposal)

    const buyyerQuotBalance = await metaStateTracker.fetchBalance({
      holder: signedBuyyOrder.getTrader(),
      token: quotToken
    })

    const buyyerVariBalance = await metaStateTracker.fetchBalance({
      holder: signedBuyyOrder.getTrader(),
      token: variToken
    })

    const sellerQuotBalance = await metaStateTracker.fetchBalance({
      holder: signedSellOrder.getTrader(),
      token: quotToken
    })

    const sellerVariBalance = await metaStateTracker.fetchBalance({
      holder: signedSellOrder.getTrader(),
      token: variToken
    })

    expect(buyyerQuotBalance.toNumber()).toBe(99)
    expect(buyyerVariBalance.toNumber()).toBe(101)
    expect(sellerQuotBalance.toNumber()).toBe(101)
    expect(sellerVariBalance.toNumber()).toBe(99)

    const signedBuyyOrderFill = await metaStateTracker.fetchFill(signedBuyyOrder.getSignatureHash())
    const signedSellOrderFill = await metaStateTracker.fetchFill(signedSellOrder.getSignatureHash())

    expect(signedBuyyOrderFill.toNumber()).toBe(1)
    expect(signedSellOrderFill.toNumber()).toBe(1)

  })

  test('should create/incorporateProposal a proposal', async () => {

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const metaStateTracker = new MetaStateTracker(new PseudoStateFetcher({
      fill: 75,
      balance: 50
    }))

    const signedBuyyOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 2,
        priceDenom: 1,
        tokenLimit: 100,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })

    const signedSellOrder = SignedOrder.gen({
      order: {
        direction: OrderDirection.SELL,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 2,
        priceDenom: 1,
        tokenLimit: 100,
        salt
      },
      privateKey: bobKeypair.privateKey
    })

    signedOrdersList.handleSignedOrder(signedBuyyOrder)
    signedOrdersList.handleSignedOrder(signedSellOrder)

    const proposals = await signedOrdersList.fetchProposals(metaStateTracker)
    expect(proposals.length).toBe(1)

    const proposal = proposals[0]
    expect(proposal.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder)
    expect(proposal.signedOrderPair.signedSellOrder).toBe(signedSellOrder)

    expect(proposal.solution.quotTokenTrans.toNumber()).toBe(24)
    expect(proposal.solution.variTokenTrans.toNumber()).toBe(12)
    expect(proposal.solution.quotTokenArbit.toNumber()).toBe(0)

    await metaStateTracker.incorporateProposal(proposal)

    const buyyerQuotBalance = await metaStateTracker.fetchBalance({
      holder: signedBuyyOrder.getTrader(),
      token: quotToken
    })

    const buyyerVariBalance = await metaStateTracker.fetchBalance({
      holder: signedBuyyOrder.getTrader(),
      token: variToken
    })

    const sellerQuotBalance = await metaStateTracker.fetchBalance({
      holder: signedSellOrder.getTrader(),
      token: quotToken
    })

    const sellerVariBalance = await metaStateTracker.fetchBalance({
      holder: signedSellOrder.getTrader(),
      token: variToken
    })

    expect(buyyerQuotBalance.toNumber()).toBe(26)
    expect(buyyerVariBalance.toNumber()).toBe(62)
    expect(sellerQuotBalance.toNumber()).toBe(74)
    expect(sellerVariBalance.toNumber()).toBe(38)

    const signedBuyyOrderFill = await metaStateTracker.fetchFill(signedBuyyOrder.getSignatureHash())
    const signedSellOrderFill = await metaStateTracker.fetchFill(signedSellOrder.getSignatureHash())

    expect(signedBuyyOrderFill.toNumber()).toBe(99)
    expect(signedSellOrderFill.toNumber()).toBe(87)

  })

  test('should create/incorporateProposal a proposal', async () => {

    const signedOrdersList = new SignedOrdersList({ quotToken, variToken })
    const metaStateTracker = new MetaStateTracker(new PseudoStateFetcher({
      fill: 0,
      balance: 100
    }))

    const signedBuyyOrder1 = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 2,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })

    const signedBuyyOrder2 = SignedOrder.gen({
      order: {
        direction: OrderDirection.BUYY,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 2,
        priceDenom: 1,
        tokenLimit: 2,
        salt
      },
      privateKey: aliceKeypair.privateKey
    })

    const signedSellOrder1 = SignedOrder.gen({
      order: {
        direction: OrderDirection.SELL,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 1,
        priceDenom: 1,
        tokenLimit: 2,
        salt
      },
      privateKey: bobKeypair.privateKey
    })

    const signedSellOrder2 = SignedOrder.gen({
      order: {
        direction: OrderDirection.SELL,
        quotToken,
        variToken,
        expiration: 0,
        priceNumer: 2,
        priceDenom: 1,
        tokenLimit: 2,
        salt
      },
      privateKey: bobKeypair.privateKey
    })

    signedOrdersList.handleSignedOrder(signedBuyyOrder1)
    signedOrdersList.handleSignedOrder(signedBuyyOrder2)
    signedOrdersList.handleSignedOrder(signedSellOrder1)
    signedOrdersList.handleSignedOrder(signedSellOrder2)

    const proposals0 = await signedOrdersList.fetchProposals(metaStateTracker)
    expect(proposals0.length).toBe(3)

    const proposal0 = await signedOrdersList.fetchBestProposal(metaStateTracker)
    expect(proposal0.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder2)
    expect(proposal0.signedOrderPair.signedSellOrder).toBe(signedSellOrder1)

    expect(proposal0.solution.quotTokenArbit.toNumber()).toBe(1)

    await metaStateTracker.incorporateProposal(proposal0)

    const signedBuyyOrder2Fill = await metaStateTracker.fetchFill(signedBuyyOrder2.getSignatureHash())
    const signedSellOrder2Fill = await metaStateTracker.fetchFill(signedSellOrder1.getSignatureHash())

    expect(signedBuyyOrder2Fill.toNumber()).toBe(2)
    expect(signedSellOrder2Fill.toNumber()).toBe(1)

    const proposals1 = await signedOrdersList.fetchProposals(metaStateTracker)
    expect(proposals1.length).toBe(1)

    const proposal1 = await signedOrdersList.fetchBestProposal(metaStateTracker)
    expect(proposal1.signedOrderPair.signedBuyyOrder).toBe(signedBuyyOrder1)
    expect(proposal1.signedOrderPair.signedSellOrder).toBe(signedSellOrder1)

    await metaStateTracker.incorporateProposal(proposal1)

    const signedBuyyOrder1Fill = await metaStateTracker.fetchFill(signedBuyyOrder1.getSignatureHash())
    const signedSellOrder1Fill = await metaStateTracker.fetchFill(signedSellOrder1.getSignatureHash())

    expect(signedBuyyOrder1Fill.toNumber()).toBe(1)
    expect(signedSellOrder1Fill.toNumber()).toBe(2)

    const proposal2 = await signedOrdersList.fetchBestProposal(metaStateTracker)
    expect(proposal2).toBe(null)

  })

})
