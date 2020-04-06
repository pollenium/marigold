import { Uintable, Address } from 'pollenium-buttercup';
import { TokenReader } from 'pollenium-toadflax';
export declare function deployToken(struct: {
    totalSupply: Uintable;
    engine: Address;
}): Promise<{
    address: Address;
    tokenReader: TokenReader;
}>;
