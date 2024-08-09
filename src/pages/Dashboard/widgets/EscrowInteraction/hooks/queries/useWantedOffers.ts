import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import axios from 'axios';
import { get } from 'http';
import { useCallback, useEffect, useState } from 'react';
import { OfferType } from '../../types';
import { ESCROW_API_SERIVCE_URL } from 'config';
import { useResolveTokenDecimals } from '../useResolveTokenDecimals';

let lastPendingTransactionCount = -1;

export const useWantedOffers = () => {
  const { pendingTransactionsArray } = useGetPendingTransactions();
  const { account } = useGetAccountInfo();
  const [wantedOffers, setWantedOffers] = useState<OfferType[]>([]);
  const resolveDecimals = useResolveTokenDecimals();

  const getWantedOffers = useCallback(async () => {
    const response = await axios.get<OfferType[]>(
      ESCROW_API_SERIVCE_URL + '/offers/wanted'
    );

    const offers = response.data.map((offer) => {
      return {
        ...offer,
        offerPayment: {
          ...offer.offeredPayment,
          numDecimals: resolveDecimals(offer.offeredPayment.tokenIdentifier)
        },
        acceptOfferPayment: {
          ...offer.acceptedPaymenet,
          numDecimals: resolveDecimals(offer.acceptedPaymenet.tokenIdentifier)
        }
      };
    });
    setWantedOffers([...offers]);
    return offers;
  }, [account.address]);

  useEffect(() => {
    if (lastPendingTransactionCount === pendingTransactionsArray.length) {
      return;
    }

    lastPendingTransactionCount = pendingTransactionsArray.length;
    getWantedOffers();
  }, [account.address, pendingTransactionsArray.length]);

  return {
    wantedOffers,
    getWantedOffers
  };
};
