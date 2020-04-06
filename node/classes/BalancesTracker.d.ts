import { EngineReader } from 'pollenium-alchemilla';
import { Uish } from 'pollenium-uvaursi';
import { Uint256 } from 'pollenium-buttercup';
export declare class BalancesTracker {
    private engineReader;
    private balancePromisesByTraderHex;
    constructor(struct: {
        engineReader: EngineReader;
    });
    fetchBalance(trader: Uish): Promise<Uint256>;
}
