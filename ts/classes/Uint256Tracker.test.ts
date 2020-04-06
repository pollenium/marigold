import { Uint256Tracker, NegativeError } from './Uint256Tracker'
import { Uint256 } from 'pollenium-buttercup'


describe('Uint256Tracker', () => {
  let start100Tracker: Uint256Tracker
  test('create start100Tracker', () => {
    start100Tracker = new Uint256Tracker(Promise.resolve(new Uint256(100)))
  })
  test('increment 10', async () => {
    await start100Tracker.increment(10)
    const cumulative = await start100Tracker.fetchCumulative()
    expect(cumulative.toNumber()).toBe(110)
  })
  test('decrement 20', async () => {
    await start100Tracker.decrement(20)
    const cumulative = await start100Tracker.fetchCumulative()
    expect(cumulative.toNumber()).toBe(90)
  })
  test('decrement 90', async () => {
    await start100Tracker.decrement(90)
    const cumulative = await start100Tracker.fetchCumulative()
    expect(cumulative.toNumber()).toBe(0)
  })
  test('decrement 1 should throw NegativeError', async () => {
    expect.assertions(1)
    try {
      await start100Tracker.decrement(1)
    } catch(error) {
      expect(error).toBeInstanceOf(NegativeError)
    }
  })
})
