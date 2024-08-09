import { Address } from "utils";
import { BigNumber} from "bignumber.js";

export type OfferResponseType = {
    creator: Address;
    offeredPayment: {
        amount: BigNumber;
        token_identifier: string;
        token_nonce: BigNumber;
    };
    accepted_payment: {
        amount: BigNumber;
        token_identifier: string;
        token_nonce: BigNumber;
    }
    accepted_address: Address;
}
