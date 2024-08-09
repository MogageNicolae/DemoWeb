import { formatAmount } from 'utils/sdkDappUtils';
import { useCancelTransaction, useCreatedOffers } from '../../hooks';

export const CreatedOffers = () => {
  const { createdOffers } = useCreatedOffers();
  const { onCancelOffer } = useCancelTransaction();

  if (createdOffers.length === 0) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-gray-500'> No created offers</p>
      </div>
    );
  }

  return (
    <div className='flex bg-gray-50 h-full overflow-x-auto'>
      <table className='text-sm w-full max-w-4xl mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg'>
        <thead className='bg-gray-500'>
          <tr className='text-left text-white text-xs'>
            <th className='px-6 py-4 font-semibold'>Offer ID</th>
            <th className='px-6 py-4 font-semibold'>Creator</th>
            <th className='px-6 py-4 font-semibold'>Offered</th>
            <th className='px-6 py-4 font-semibold'>Accepted</th>
            <th className='px-6 py-4 font-semibold'>Destination Address</th>
            <th className='px-6 py-4 font-semibold text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {createdOffers.map((offer) => (
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
                {`${offer.offeredPayment.amount} - ${offer.offeredPayment.tokenIdentifier}`}
              </td>
              <td className='px-3 py-4 text-center'>
                {`${offer.acceptedPaymenet.amount} - ${offer.acceptedPaymenet.tokenIdentifier}`}
              </td>
              <td className='px-3 py-4 break-all' style={{ maxWidth: '10rem' }}>
                <p className='break-all'>{offer.acceptedAddress}</p>
              </td>
              <td>
                <button
                  className='text-left max-w-fit w-auto bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none'
                  onClick={() => {
                    onCancelOffer(offer.offerId);
                  }}
                >
                  Cancel
                </button>
              </td>
              {/* 
              <td className='px-3 py-4 text-center'>
                {`${formatAmount({
                    input: offer.offeredPayment.amount,
                    decimals: Number(offer.offeredPayment.numDecimals)
                    })} ${offer.offeredPayment.tokenIdentifier}`}
              </td>
              <td className='px-3 py-4 text-center'>
                {`${formatAmount({
                  input: offer.acceptedPaymenet.amount,
                  decimals: Number(offer.acceptedPaymenet.numDecimals)
                })} ${offer.acceptedPaymenet.tokenIdentifier}`}
              </td>
              
               */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
