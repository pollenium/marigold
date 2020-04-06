import { Uint256 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
export declare type FetchBalance = (struct: {
    token: Uish;
    trader: Uish;
}) => Promise<Uint256>;
