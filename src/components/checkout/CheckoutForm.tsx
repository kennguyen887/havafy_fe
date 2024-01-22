import clsx from 'clsx';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

import { setItem } from '@/lib/localStorage';
import { postApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';

export default function CheckoutForm() {
  const [email, setEmail] = useState<string>();
  const [firstName] = useState<string>();
  // const [lastName, setLastName] = useState<string>();
  // const [password, setPassword] = useState<string>();
  // const [coupon, setCoupon] = useState<string>();
  const [alert, setAlert] = React.useState<string>();
  const [haveCoupon, setHaveCoupon] = React.useState<boolean>(false);
  const { isAuthenticated } = useAuthState();

  React.useEffect(() => {
    if (isAuthenticated === false) {
      Router.push('/user/login');
    }
  }, [isAuthenticated]);

  const submitForm = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      const data = await postApi('user/register', {
        email,
        firstName,
        token: '',
      });
      if (data) {
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }

        if (data.user && data.user.token) {
          setItem('auth', data.user.token);
          Router.push('/');
          return;
        }
      }

      // Do whatever you want with the token
    },
    [email, firstName]
  );

  // onFinish={(values) => handleReCaptchaVerify(values)}

  return (
    <div className='max-w-24'>
      <form onSubmit={submitForm} noValidate>
        <div className='mb-5 bg-white p-5'>
          <Alert content={alert} hidden={!alert} />
          <div id='cartItems' className='border-b border-gray-300 text-sm'>
            <div className='flex flex-row'>
              <div className='basis-2/3 px-2 py-3 font-semibold'>
                1 million characters for the Text-to-Speech service.
              </div>
              <div className='basis-1/3 px-2 py-3 text-right font-semibold'>
                US$9
              </div>
            </div>
          </div>
          <div
            id='cartTotal'
            className='border-b border-gray-300 py-2 text-xs '
          >
            <div className='flex flex-row'>
              <div className='basis-2/3 px-2 py-2'>Subtotal</div>
              <div className='basis-1/3 px-2 py-2 text-right'>US$9</div>
            </div>
            <div className='flex flex-row'>
              <div className='basis-2/3 px-2 py-2'>Service fees</div>
              <div className='basis-1/3 px-2 py-2 text-right'>US$0</div>
            </div>
          </div>
          <div id='grandTotal' className='font-semibold'>
            <div className='flex flex-row'>
              <div className='basis-2/3 px-2 py-3'>Total</div>
              <div className='basis-1/3 px-2 py-3 text-right'>US$9</div>
            </div>
          </div>
          <div id='couponApply'>
            <div
              className={clsx(
                haveCoupon ? 'hidden' : '',
                'mt-2 cursor-pointer text-xs text-blue-500'
              )}
              onClick={() => setHaveCoupon(true)}
            >
              Have a Coupon?
            </div>
            <div
              className={clsx(
                haveCoupon ? '' : 'hidden',
                'flex flex-row border-t border-gray-300 pt-5'
              )}
            >
              <div className='mr-5 basis-3/4'>
                <TextInput
                  name='Enter your coupon'
                  id='coupon'
                  className='h-10'
                  currentValue={(value) => setEmail(value)}
                  valueValidate={[
                    (value) => value.length < 3,
                    'Coupon is invalid',
                  ]}
                />
              </div>
              <div className='basis-1/4 text-right'>
                <PrimaryButton className='h-10' name='Apply' />
              </div>
            </div>
          </div>
        </div>
        <PayPalButton
          options={{
            clientId:
              'AV8-_8dTFiq9NwHnXct-Fdwxhwhn0QP6Ph8KfmwmXR6Aqspj7wXWAkIY9O4Q6iNM6VBkh69xIP2AuQe0',
          }}
          amount='9'
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess={(details: any, data: any) => {
            // eslint-disable-next-line no-console
            console.log('-----------details', details);
            // eslint-disable-next-line no-console
            console.log('-----------data', data);
            // OPTIONAL: Call your server to save the transaction
            return fetch('/paypal-transaction-complete', {
              method: 'post',
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });
          }}
        />
      </form>
    </div>
  );
}
