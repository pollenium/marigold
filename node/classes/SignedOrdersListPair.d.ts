import { SignedOrder, ExecutionRequest } from 'pollenium-alchemilla';
import { BalancesDb } from './BalancesDb';
export declare class SignedOrdersListPair {
    private readonly balancesDb;
    private readonly buyy;
    private readonly sell;
    private isExecutionRequestUpdated;
    constructor(struct: {
        balancesDb: BalancesDb;
    });
    handleSignedOrder(signedOrder: SignedOrder): void;
    updateExecutionRequest(executionRequest: ExecutionRequest): Promise<void>;
}
