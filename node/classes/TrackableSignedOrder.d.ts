import { Uint256 } from 'pollenium-buttercup';
import { SignedOrder } from 'pollenium-alchemilla';
export declare class SignedOrderTracker {
    filled: Uint256;
    readonly signedOrder: SignedOrder;
    constructor(struct: {
        signedOrder: SignedOrder;
    });
    fill(amount: Uint256): void;
    getRemaining(): Uint256;
}
