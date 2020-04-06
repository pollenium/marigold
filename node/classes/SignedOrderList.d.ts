import { SignedOrder } from 'pollenium-alchemilla';
import { Uintable } from 'pollenium-buttercup';
export declare class SignedOrdersList {
    private signedOrders;
    handleSignedOrder(signedOrder: SignedOrder): Promise<void>;
    removeExpirationLte(expirationCutoff: Uintable): Promise<void>;
}
