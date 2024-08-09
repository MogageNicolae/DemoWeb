import { useCallback } from "react";
import { CreateOfferValuesType } from "../../types";
import * as Yup from 'yup';
import { useCreateOfferTransaction } from "../transactions/useCreateOfferTransaction";
import { useResolveTokenDecimals } from "../useResolveTokenDecimals";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

type CreateOfferSchemaObject = {
    [key in keyof CreateOfferValuesType]: Yup.Schema<CreateOfferValuesType[key]>;
}
export const useCreateOfferForm = () => {

    const {getCreateOfferTransaction} = useCreateOfferTransaction();

    const initialValues: CreateOfferValuesType = {
        wantedNFT: '',
        wantedNonce: 0,
        wantedAddress: '',
        acceptedToken: '',
        acceptedAmount: ''
    };

    const validationSchema = Yup.object().shape<CreateOfferSchemaObject>({
        wantedNFT: Yup.string().required('Wanted NFT is required'),
        wantedNonce: Yup.number().required('Wanted Nonce is required'),
        wantedAddress: Yup.string().required('Wanted Address is required'),
        acceptedToken: Yup.string().required('Accepted Token is required'),
        acceptedAmount: Yup.string().required('Accepted Amount is required')
    });

    const resolveDecimals = useResolveTokenDecimals();

    const onSubmit = useCallback(async (values: CreateOfferValuesType) => {
        const tx = getCreateOfferTransaction({
            wantedNFT: values.wantedNFT,
            wantedNonce: values.wantedNonce,
            wantedAddress: values.wantedAddress,
            acceptedToken: values.acceptedToken,
            acceptedAmount: values.acceptedAmount,
            decimals: resolveDecimals(values.acceptedToken)
        });

        if (!tx) {
            throw new Error('Error getting create offer transaction');
        }

        await sendTransactions({
            transactions: tx,
            transactionDisplayInfo: {
                processingMessage: 'Creating offer...',
                ErrorMessage: 'Error creating offer',
                successMessge: 'Offer created successfully'
            },
            redirectAfterSign: false
        });

    }, []);

    return {
        initialValues,
        validationSchema,
        onSubmit
    };
}