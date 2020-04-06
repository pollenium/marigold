import { Keypair } from 'pollenium-ilex';
import { OrderStruct, SignedOrder } from 'pollenium-alchemilla';
export declare function genSignedOrder(keypair: Keypair, orderStruct: OrderStruct): SignedOrder;
