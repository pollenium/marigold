import { Uint256, Uintable } from 'pollenium-buttercup';
export declare class NegativeError extends Error {
    constructor();
}
export declare enum DeviationDirection {
    INCREMENT = "increment",
    DECREMENT = "decrement"
}
export declare class Uint256Tracker {
    private originalPromise;
    private cumulativeIncrements;
    private cumulativeDecrements;
    constructor(originalPromise: Promise<Uint256>);
    fetchOriginal(): Promise<Uint256>;
    increment(amount: Uintable): Promise<void>;
    decrement(amount: Uintable): Promise<void>;
    assertPositive(): Promise<void>;
    fetchCumulative(): Promise<Uint256>;
}
