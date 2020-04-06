import { Uint256 } from 'pollenium-buttercup';
import { SignedOrder } from 'pollenium-alchemilla';
export declare class SignedOrderTracker {
    private filled;
    private executionRequestIndex;
    readonly signedOrder: SignedOrder;
    constructor(struct: {
        signedOrder: SignedOrder;
    });
    getFilled(): Uint256;
    incrementFilled(amount: Uint256): void;
    getExecutionRequestIndex(): null | number;
    setExecutionRequestIndex(executionRequestIndex: number): void;
}
