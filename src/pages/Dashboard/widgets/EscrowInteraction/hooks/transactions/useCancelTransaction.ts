import axios from "axios";
import { ESCROW_API_SERIVCE_URL } from "config/config.devnet";
import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

export const useCancelTransaction = () => {
    const getCancelTransaction = async ({
        offerId
    }: { offerId: number }) => {
        try {
            const response = await axios.post<IPlainTransactionObject>(
                ESCROW_API_SERIVCE_URL + "/offers/create",
                {
                    offerId
                }
            );
            return Transaction.fromPlainObject(response.data);
        } catch (error) {
            console.error("Error canceling offer", error);
        }
    }

    const onCancelOffer = async (offerId: number) => {
        const cancelTransaction = await getCancelTransaction({offerId});

        if (!cancelTransaction) {
            throw new Error("Error getting 'cancel offer' transaction");
        }

        await sendTransactions({
            transactions: cancelTransaction,
            transactionDisplayInfo: {
                processingMessage: 'Canceling offer...',
                ErrorMessage: 'Error canceling offer',
                successMessge: 'Offer canceled successfully'
            },
            redirectAfterSign: false
        });

    }

    return { getCancelTransaction, onCancelOffer }
}