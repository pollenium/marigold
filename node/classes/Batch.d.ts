import { Bytes32, Address, Uint256, Uintable } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { SignedOrder, ExecutionRequest } from 'pollenium-alchemilla';
import { BalancesDb } from './BalancesDb';
import { SignedOrdersDb } from './SignedOrdersDb';
import { FetchBalance } from '../types';
export interface ExplicitExecutionRequest extends ExecutionRequest {
    signedOrders: Array<SignedOrder>;
    exchanges: Array<{
        signedBuyyOrderIndex: number;
        signedSellOrderIndex: number;
        quotTokenTrans: Uint256;
        variTokenTrans: Uint256;
        quotTokenArbit: Uint256;
    }>;
}
export declare class InvalidBlockNumberError extends Error {
    constructor(expiration: Uint256);
}
export declare class InvalidSaltError extends Error {
    constructor(orderSalt: Bytes32);
}
export declare class InvalidQuotTokenError extends Error {
    constructor(quotToken: Address);
}
export declare class Batch {
    readonly expiration: Uint256;
    readonly quotTokens: Array<Address>;
    readonly fetchBalance: FetchBalance;
    readonly orderSalt: Bytes32;
    readonly balancesDb: BalancesDb;
    readonly signedOrdersDb: SignedOrdersDb;
    private executionRequestPromise;
    constructor(struct: {
        expiration: Uintable;
        quotTokens: Array<Uish>;
        fetchBalance: FetchBalance;
        orderSalt: Uish;
    });
    handleSignedOrder(signedOrder: SignedOrder): Promise<void>;
    fetchExecutionRequest(): Promise<ExplicitExecutionRequest>;
}
