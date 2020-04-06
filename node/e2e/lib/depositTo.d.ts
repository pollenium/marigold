import { Address, Uintable } from 'pollenium-buttercup';
export interface DepositToStruct {
    engine: Address;
    token: Address;
    holder: Address;
    amount: Uintable;
}
export declare function depositTo(struct: DepositToStruct): Promise<void>;
