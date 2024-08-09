import { Loader } from '@multiversx/sdk-dapp/UI';
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useFetchUserTokens } from 'hooks';
import { USER_TOKENS_KEY } from 'localConstants';
import { CreateOfferValuesType } from '../../types';

export const CreateOfferFrom = () => {
  const { userTokens, isLoading, isError } = useFetchUserTokens();
  const { errors, values } = useFormikContext<CreateOfferValuesType>();
  const fieldClassName =
    'bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';

  if (isError) {
    return (
      <div className='w-full flex flex-col p-4 text-center bg-white border-gray-200 rounded-lg shadow sm:p-8 mt-8'>
        Something went wrong...
      </div>
    );
  }

  if (isLoading && !sessionStorage.getItem(USER_TOKENS_KEY)) {
    return <Loader />;
  }

  return (
    <Form className='w-full flex flex-col p-4 text-center bg-white border-gray-200 rounded-lg shadow sm:p-8 mt-8'>
      <h5 className='font-bold text-xl mb-2'> Create Offer </h5>
      <div className='mb-6'>
        <label
          htmlFor='wantedNFT'
          className='block text-left mb-2 text-sm font-medium text-gray-900'
        >
          Wanted NFT
        </label>
        <Field
          type='text'
          placeholder='Wanted NFT'
          id='wantedNFT'
          name='wantedNFT'
          className={fieldClassName}
        />
        <ErrorMessage name='wantedNFT' component='div' />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='wantedNonce'
          className='block text-left mb-2 text-sm font-medium text-gray-900'
        >
          Wanted Nonce
        </label>
        <Field
          type='number'
          placeholder='Wanted Nonce'
          id='wantedNonce'
          name='wantedNonce'
          min='0'
          className={fieldClassName}
        />
        <ErrorMessage name='wantedNonce' component='div' />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='wantedAddress'
          className='block text-left mb-2 text-sm font-medium text-gray-900'
        >
          Wanted address
        </label>
        <Field
          type='text'
          placeholder='Wanted Address'
          id='wantedAddress'
          name='wantedAddress'
          className={fieldClassName}
        />
        <ErrorMessage name='wantedAddress' component='div' />
      </div>
      <div className='font-bold text-xl mb-2'>
        <label
          htmlFor='acceptedToken'
          className='block text-left mb-2 text-sm font-medium text-gray-900'
        >
          Token ID
        </label>
        <Field
          as='select'
          id='acceptedToken'
          placeholder='Select Token'
          name='acceptedToken'
          className={fieldClassName}
        >
          <option value='' disabled>
            {' '}
            Select Token
          </option>
          {userTokens?.map((token) => (
            <option key={token.identifier} value={token.identifier}>
              {token.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name='acceptedToken' component='div' />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='acceptedAmount'
          className='block text-left mb-2 text-sm font-medium text-gray-900'
        >
          Accepted Amount
        </label>
        <Field
          type='text'
          placeholder='Accepted amount'
          id='acceptedAmount'
          name='acceptedAmount'
          className={fieldClassName}
        />
        <ErrorMessage name='acceptedAmount' component='div' />
      </div>
      <button
        type='submit'
        disabled={Object.entries(errors).length > 0}
        className='text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300'
        style={{ height: '2.5rem' }}
      >
        Submit
      </button>
    </Form>
  );
};
