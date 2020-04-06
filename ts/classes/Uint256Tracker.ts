import { Uint256, Uintable } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { EngineReader } from 'pollenium-alchemilla'

export class NegativeError extends Error {
  constructor() {
    super('Cannot be negative')
    Object.setPrototypeOf(this, NegativeError.prototype)
  }
}

export enum DeviationDirection {
  INCREMENT = 'increment',
  DECREMENT = 'decrement'
}

export class Uint256Tracker {

  private cumulativeIncrements: Uint256 = new Uint256(0)
  private cumulativeDecrements: Uint256 = new Uint256(0)

  constructor(private originalPromise: Promise<Uint256>){}

  fetchOriginal(): Promise<Uint256> {
    return this.originalPromise
  }

  async increment(amount: Uintable): Promise<void> {
    this.cumulativeIncrements = this.cumulativeIncrements.opAdd(amount)
    await this.assertPositive()
  }

  async decrement(amount: Uintable): Promise<void> {
    this.cumulativeDecrements = this.cumulativeDecrements.opAdd(amount)
    await this.assertPositive()
  }

  async assertPositive() {
    const original = await this.fetchOriginal()
    if (original.opAdd(this.cumulativeIncrements).compLt(this.cumulativeDecrements)) {
      throw new NegativeError()
    }
  }

  async fetchCumulative() {
    const original = await this.fetchOriginal()
    return original.opAdd(this.cumulativeIncrements).opSub(this.cumulativeDecrements)
  }

}
