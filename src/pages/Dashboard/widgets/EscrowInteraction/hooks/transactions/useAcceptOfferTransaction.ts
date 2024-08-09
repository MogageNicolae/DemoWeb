import axios from "axios";
import { ESCROW_API_SERIVCE_URL } from "config/config.devnet";
import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

export const useAcceptOfferTransaction = () => {

    const getAcceptedTransaction = async ({
        offerId,
        paymentToken,
        paymentTokenAmount
    }: {
        offerId: number;
        paymentToken: string;
        paymentTokenAmount: string;
    }) => {
        try {
            const response = await axios.post<IPlainTransactionObject>(
                ESCROW_API_SERIVCE_URL + '/offers/accept',
                {
                    offerId,
                    paymentToken,
                    paymentTokenAmount
                }
            );
            return Transaction.fromPlainObject(response.data);
        } catch (error) {
            console.error("Error getting accepted transaction", error);
        }
    }

    const onAcceptedOffer = async ({
        offerId,
        paymentToken,
        paymentTokenAmount
    }: {
        offerId: number;
        paymentToken: string;
        paymentTokenAmount: string;
    }) => {
        const acceptTransaction = await getAcceptedTransaction({
            offerId,
            paymentToken,
            paymentTokenAmount
        });
        
        if(!acceptTransaction){
            throw new Error("Error getting 'accept offer' transaction");
        }

        await sendTransactions({
            transactions: acceptTransaction,
            transactionDisplayInfo: {
                processingMessage: 'Accepting offer...',
                ErrorMessage: 'Error accepting offer',
                successMessge: 'Offer accepted successfully'
            },
            redirectAfterSign: false
        });
    }

    return {
        getAcceptedTransaction,
        onAcceptedOffer
    };

};
