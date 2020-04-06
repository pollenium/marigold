import { Bytes32, Address, Uint256 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { SignedOrder, EngineReader, ORDER_TYPE } from 'pollenium-alchemilla';
import { SignedOrdersList } from './SignedOrdersList';
export declare class SignedOrdersList {
    readonly orderType: ORDER_TYPE;
    private readonly signedOrders;
    constructor(orderType: ORDER_TYPE);
    push(signedOrder: SignedOrder): void;
    private sort;
}
export declare class SignedOrdersDb {
    readonly signedOrdersByQuotTokenHexVariTokenHexOrderType: Record<string, Record<string, {
        buyy: SignedOrdersList;
        sell: SignedOrdersList;
    }>>;
}
export declare class SignedOrdersBatch {
    readonly blockHash: Bytes32;
    readonly quotTokens: Array<Address>;
    readonly engineReader: EngineReader;
    readonly balancesByTokenHexTraderHex: Record<string, Record<string, Uint256>>;
    private isExecuted;
    constructor(struct: {
        engineReader: EngineReader;
        blockHash: Uish;
        quotTokens: Array<Uish>;
    });
    handleSignedOrder(signedOrder: SignedOrder): Promise<void>;
    private maybeUpdateBalance;
    execute(): Promise<void>;
}
