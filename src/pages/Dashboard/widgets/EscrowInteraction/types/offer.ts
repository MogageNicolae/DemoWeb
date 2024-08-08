import { off } from "process";

export type OfferPaymentType = {
    tokenIdentifier: string;
    amount: string;
    nonce: number;
    numDecimals: number;
}

export type OfferType = {
    offerId: number;
    creator: string;
    offerPayment: OfferPaymentType;
    acceptOfferPayment: OfferPaymentType;
    acceptedOffer: string;
}