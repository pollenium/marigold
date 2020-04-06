import { Uish } from 'pollenium-uvaursi';
import { SignedOrder, StateFetcher } from 'pollenium-alchemilla';
import { ethers } from 'ethers';
import { SignedOrdersList } from './classes/SignedOrdersList';
interface Pair {
    quotToken: Uish;
    variToken: Uish;
}
export declare class Marigold {
    private readonly bellflower;
    private readonly engineReader;
    private readonly engineWriter;
    private latency;
    private isHandledBySignatureHashHex;
    private signedOrdersListsByPairIdHex;
    constructor(struct: {
        privateKey: Uish;
        provider: ethers.providers.Provider;
        latency: number;
        engine: Uish;
    });
    handleSignedOrder(signedOrder: SignedOrder): Promise<void>;
    getSignedOrdersListByPair(pair: Pair): SignedOrdersList;
    getIsHandled(signedOrder: SignedOrder): boolean;
    private getSignedOrdersLists;
    removeExpired(): Promise<void>;
    removeFilled(stateFetcher: StateFetcher): Promise<void[]>;
    execute(): Promise<void>;
    private fetchBestProposal;
}
export {};
