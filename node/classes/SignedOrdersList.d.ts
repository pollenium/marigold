import { SignedOrder, StateFetcher } from 'pollenium-alchemilla';
import { Uintable, Address } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { Proposal } from '../interfaces/Proposal';
export declare class InvalidQuotTokenError extends Error {
    constructor();
}
export declare class InvalidVariTokenError extends Error {
    constructor();
}
export declare class SignedOrdersList {
    readonly quotToken: Address;
    readonly variToken: Address;
    private signedOrders;
    constructor(struct: {
        quotToken: Uish;
        variToken: Uish;
    });
    handleSignedOrder(signedOrder: SignedOrder): void;
    removeExpirationLte(expirationCutoff: Uintable): void;
    removeFilled(stateFetcher: StateFetcher): Promise<void>;
    private fetchUnfilled;
    private getSignedOrderPairs;
    private getSignedOrdersByDirection;
    fetchProposals(stateFetcher: StateFetcher): Promise<Proposal[]>;
    fetchBestProposal(stateFetcher: StateFetcher): Promise<Proposal | null>;
    getSignedOrdersCount(): number;
}
