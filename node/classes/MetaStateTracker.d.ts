import { Solution, SignedOrderPair, StateFetcher } from 'pollenium-alchemilla';
import { Uish } from 'pollenium-uvaursi';
import { Uint256 } from 'pollenium-buttercup';
import { Uint256Tracker } from './Uint256Tracker';
import { Proposal } from '../interfaces/Proposal';
export declare class MetaStateTracker extends StateFetcher {
    private stateFetcher;
    private balanceTrackersByHolderHexTokenHex;
    private fillTrackersBySignatureHashHex;
    constructor(stateFetcher: StateFetcher);
    getBalanceTracker(struct: {
        holder: Uish;
        token: Uish;
    }): Uint256Tracker;
    getFillTracker(signatureHash: Uish): Uint256Tracker;
    fetchBalance(struct: {
        holder: Uish;
        token: Uish;
    }): Promise<Uint256>;
    fetchFill(signatureHash: Uish): Promise<Uint256>;
    calcSolution(signedOrderPair: SignedOrderPair): Promise<Solution>;
    incorporateProposal(proposal: Proposal): Promise<void>;
}
