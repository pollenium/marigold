import { DepositToStruct } from './depositTo';
import { EngineWriter, OrderStruct } from 'pollenium-alchemilla';
import { Address } from 'pollenium-buttercup';
import { FetchBalance } from '../../';
import { Keypair } from 'pollenium-ilex';
interface TestScenarioStruct {
    engine: Address;
    engineWriter: EngineWriter;
    quotTokens: Array<Address>;
    fetchBalance: FetchBalance;
    depositTos: Array<Omit<DepositToStruct, 'engine'>>;
    signedOrders: Array<{
        trader: Keypair;
        orderStruct: Omit<OrderStruct, 'blockNumber'>;
    }>;
    expected: {
        signedBuyyOrdersLength: number;
        signedSellOrdersLength: number;
        exchangesLength: number;
        balances: Array<{
            holder: Address;
            token: Address;
            balance: number;
        }>;
    };
}
export declare function testScenario(struct: TestScenarioStruct): Promise<void>;
export {};
