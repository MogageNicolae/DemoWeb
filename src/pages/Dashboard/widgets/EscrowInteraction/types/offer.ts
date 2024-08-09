export type OfferPaymentType = {
  tokenIdentifier: string;
  amount: string;
  nonce: number;
  numDecimals: number;
};

export type OfferType = {
  offerId: number;
  creator: string;
  offeredPayment: OfferPaymentType;
  acceptedPaymenet: OfferPaymentType;
  acceptedAddress: string;
};
