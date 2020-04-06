import { SignedOrderPair, Solution } from 'pollenium-alchemilla'

export interface Proposal {
  signedOrderPair: SignedOrderPair,
  solution: Solution
}
