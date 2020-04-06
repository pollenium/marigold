import { Address, Uint256 } from 'pollenium-buttercup';
import { FetchBalance } from '../types';
export declare class BalancesDb {
    private readonly balancesByTokenHexTraderHex;
    private readonly fetchBalance;
    constructor(struct: {
        fetchBalance: FetchBalance;
    });
    maybeUpdate(struct: {
        token: Address;
        trader: Address;
    }): Promise<void>;
    fetch(struct: {
        token: Address;
        trader: Address;
    }): Promise<Uint256>;
    decrement(struct: {
        token: Address;
        trader: Address;
        amount: Uint256;
    }): Promise<void>;
}
