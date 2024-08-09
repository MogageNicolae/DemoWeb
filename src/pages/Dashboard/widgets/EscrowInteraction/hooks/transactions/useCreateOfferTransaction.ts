import axios from "axios"
import { CreateOfferValuesType } from "../../types"
import { ESCROW_API_SERIVCE_URL } from "config/config.devnet"
import { parseAmount } from "@multiversx/sdk-dapp/utils/operations/parseAmount"
import { DECIMALS } from "@multiversx/sdk-dapp/constants"
import { Transaction } from "@multiversx/sdk-core/out"

export const useCreateOfferTransaction = () => {

    const getCreateOfferTransaction = async ({
        wantedNFT,
        wantedNonce,
        wantedAddress,
        acceptedToken,
        acceptedAmount,
        decimals = DECIMALS
    }: CreateOfferValuesType & { decimals?: number }) => {
        try {
            const response = await axios.post(
                ESCROW_API_SERIVCE_URL + "/offers/create", {
                wantedNFT,
                wantedNonce,
                wantedAddress,
                acceptedToken,
                acceptedAmount: parseAmount(acceptedAmount, decimals)
            });
            return Transaction.fromPlainObject(response.data);
        } catch (error) {
            console.error("Error creating offer transaction", error);
        }
    }
    return { getCreateOfferTransaction }

}