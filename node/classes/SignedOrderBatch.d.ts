import { Bytes32, Address, Uint256 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { SignedOrder, EngineReader } from 'pollenium-alchemilla';
export declare class SignedOrdersBatch {
    readonly blockHash: Bytes32;
    readonly quotTokens: Array<Address>;
    readonly engineReader: EngineReader;
    readonly balancesByTokenHexTraderHex: Record<string, Record<string, Uint256>>;
    readonly signedOrdersByQuotTokenHexVariTokenHex: Record<string, Record<string, Array<SignedOrder>>>;
    constructor(struct: {
        engineReader: EngineReader;
        blockHash: Uish;
        quotTokens: Array<Uish>;
    });
    handleSignedOrder(signedOrder: SignedOrder): Promise<void>;
    private maybeUpdateBalance;
}
