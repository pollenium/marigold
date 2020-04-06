import { SignedOrder, ExecutionRequest } from 'pollenium-alchemilla';
import { BalancesDb } from './BalancesDb';
import { Uintable } from 'pollenium-buttercup';
export declare class SignedOrdersDb {
    private readonly expiration;
    private readonly balancesDb;
    private readonly signedOrders;
    private executionRequestPrimrose;
    constructor(struct: {
        expiration: Uintable;
        balancesDb: BalancesDb;
    });
    handleSignedOrder(signedOrder: SignedOrder): void;
    fetchExecutionRequest(): Promise<ExecutionRequest>;
}
