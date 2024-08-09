import { formatAmount } from 'utils/sdkDappUtils';
import { useAcceptOfferTransaction, useWantedOffers } from '../../hooks';

export const WantedOffers = () => {
  const { wantedOffers } = useWantedOffers();
  const { onAcceptOffer } = useAcceptOfferTransaction();

  if (!WantedOffers.length) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-gray-500'> No wanted offers</p>
      </div>
    );
  }

  return (
    <div className='flex bg-gray-50 h-full overflow-x-auto'>
      <table className='text-sm w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg'>
        <thead className='bg-gray-500'>
          <tr className='px-6 py-4 font-semibold'>Offer ID</tr>
          <tr className='px-6 py-4 font-semibold'>Creator</tr>
          <tr className='px-6 py-4 font-semibold'>Offered</tr>
          <tr className='px-6 py-4 font-semibold'>Accepted</tr>
          <tr className='px-6 py-4 font-semibold text-center'>Actions</tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {wantedOffers.map((offer) => (
            <tr key={offer.offerId} className='text-gray-700'>
              <td className='px-6 py-4'>
                <div className='flex items-center space-x-3'>
                  {offer.offerId}
                </div>
              </td>
              <td className='px-3 py-4 break-all' style={{ maxWidth: '10rem' }}>
                <p className='break-all'>{offer.creator}</p>
              </td>
              <td className='px-3 py-4 text-center'>
                {`${formatAmount({
                  input: offer.offerPayment.amount,
                  decimals: Number(offer.offerPayment.numDecimals)
                })} ${offer.offerPayment.tokenIdentifier}`}
              </td>
              <td className='px-3 py-4 text-center'>
                {`${formatAmount({
                  input: offer.acceptOfferPayment.amount,
                  decimals: Number(offer.acceptOfferPayment.numDecimals)
                })} ${offer.acceptOfferPayment.tokenIdentifier}`}
              </td>
              <td>
                <button
                  className='text-left max-w-fit w-auto bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold '
                  onClick={() => {
                    onAcceptOffer({
                      offerId: offer.offerId,
                      paymentToken: offer.acceptOfferPayment.tokenIdentifier,
                      paymentTokenAmount: offer.acceptOfferPayment.amount
                    });
                  }}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
