import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import axios from 'axios';
import { get } from 'http';
import { useCallback, useEffect, useState } from 'react';
import { OfferType } from '../../types';
import { ESCROW_API_SERIVCE_URL } from 'config';
import { useResolveTokenDecimals } from '../useResolveTokenDecimals';

let lastPendingTransactionCount = -1;

export const useCreatedOffers = () => {
  const { pendingTransactionsArray } = useGetPendingTransactions();
  const { account } = useGetAccountInfo();
  const [createdOffers, setCreatedOffers] = useState<OfferType[]>([]);
  const resolveDecimals = useResolveTokenDecimals();

  const getCreatedOffers = useCallback(async () => {
    const response = await axios.get<OfferType[]>(
      ESCROW_API_SERIVCE_URL + '/offers/created',
      { headers: { Origin: 'https://localhost:3001' } }
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
    setCreatedOffers([...offers]);
    return offers;
  }, [account.address]);

  useEffect(() => {
    if (lastPendingTransactionCount === pendingTransactionsArray.length) {
      return;
    }

    lastPendingTransactionCount = pendingTransactionsArray.length;
    getCreatedOffers();
  }, [account.address, pendingTransactionsArray.length]);

  return {
    createdOffers,
    getCreatedOffers
  };
};
