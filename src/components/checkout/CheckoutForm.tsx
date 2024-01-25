import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

import { postApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import FlatButton from '@/components/form/FlatButton';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';
import { GetOrdeItemDto, GetOrderReqDto } from '@/domain/dto';
function CheckoutFormSubmitted({
  orderId,
  orderNumber,
}: {
  orderId: string;
  orderNumber: string;
}) {
  return (
    <div className='mb-5 bg-white p-5'>
      <h3 className=''>Created order</h3>
      <div className='my-10'>
        {' '}
        View detail order{' '}
        <a
          className='font-semibold text-red-700'
          href={`/user/order/${orderId}`}
        >
          #{orderNumber}
        </a>
      </div>

      <div>
        <PrimaryButton className='h-10' name='Go to home' />
      </div>
    </div>
  );
}

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [subtotal, setSubtotal] = useState<number>();
  const [discountTotal, setDiscountTotal] = useState<number>();
  const [grandTotal, setGrandTotal] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string>();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [items, setItems] = useState<GetOrdeItemDto[]>();
  const [alert, setAlert] = React.useState<string>();
  const [haveCoupon, setHaveCoupon] = React.useState<boolean>(false);
  const { isAuthenticated } = useAuthState();
  const skuList = searchParams.get('skuList');
  const getOrderBySkuList = (skuList: string | null) => {
    const items = skuList?.split(',').map((sku) => {
      return {
        productSku: sku,
        quantity: 1,
      };
    });

    if (!items || !items.length) {
      return;
    }

    const payload: GetOrderReqDto = {
      items,
    };

    if (promoCode && promoCode?.length > 3) {
      payload.promoCode = promoCode;
    }
    postApi('order/getGrandTotal', payload).then((data) => {
      setSubtotal(data.subtotal);
      setDiscountTotal(data.discountTotal);
      setGrandTotal(data.grandTotal);
      setItems(data.items);
    });
  };

  React.useEffect(() => {
    if (!skuList) {
      return;
    }
    getOrderBySkuList(skuList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skuList]);

  React.useEffect(() => {
    if (isAuthenticated === false) {
      Router.push('/user/login');
    }
  }, [isAuthenticated]);

  const submitForm = ({
    paymentMethod,
    paymentOrderId,
  }: {
    paymentMethod?: string;
    paymentOrderId?: string;
  }) => {
    postApi('order', {
      promoCode,
      paymentMethod,
      paymentOrderId,
      items: skuList?.split(',').map((sku) => {
        return {
          productSku: sku,
          quantity: 1,
        };
      }),
    }).then((data) => {
      if (data.statusCode) {
        setAlert(data.message);
        return;
      }

      if (data.orderId) {
        setOrderId(data.orderId);
        setOrderNumber(data.orderNumber);
      }
    });
  };
  // onFinish={(values) => handleReCaptchaVerify(values)}

  return (
    <div className='max-w-24'>
      {orderId ? (
        <CheckoutFormSubmitted orderNumber={orderNumber} orderId={orderId} />
      ) : (
        <form noValidate>
          <div className='mb-5 bg-white p-5'>
            <Alert content={alert} hidden={!alert} />
            <div
              id='cartItems'
              className='w-96 border-b border-gray-300 text-sm'
            >
              {items?.map((item) => {
                return (
                  <div className='flex flex-row' key={item.sku}>
                    <div className='basis-2/3 px-2 py-3 font-semibold'>
                      {item.name}
                    </div>
                    <div className='basis-1/3 px-2 py-3 text-right font-semibold'>
                      US${item.total}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              id='cartTotal'
              className='border-b border-gray-300 py-2 text-xs '
            >
              <div className='flex flex-row'>
                <div className='basis-2/3 px-2 py-2'>Subtotal</div>
                <div className='basis-1/3 px-2 py-2 text-right'>
                  US${subtotal}
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-2/3 px-2 py-2'>Discount</div>
                <div className='basis-1/3 px-2 py-2 text-right'>
                  US${discountTotal}
                </div>
              </div>
            </div>
            <div id='grandTotal' className='font-semibold'>
              <div className='flex flex-row'>
                <div className='basis-2/3 px-2 py-3'>Total</div>
                <div className='basis-1/3 px-2 py-3 text-right'>
                  US${grandTotal}
                </div>
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
                    currentValue={(value) => setPromoCode(value)}
                  />
                </div>
                <div className='basis-1/4 text-right'>
                  <PrimaryButton
                    className='h-10'
                    name='Apply'
                    onClick={() => getOrderBySkuList(skuList)}
                  />
                </div>
              </div>
            </div>
          </div>
          {typeof grandTotal === 'number' && grandTotal > 0 ? (
            <PayPalButton
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
              }}
              amount={grandTotal}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSuccess={(details: any, data: any) => {
                // eslint-disable-next-line no-console
                console.log('-----------details', details);
                // eslint-disable-next-line no-console
                console.log('-----------data', data);
                // OPTIONAL: Call your server to save the transaction
                return submitForm({
                  paymentMethod: 'paypal',
                  paymentOrderId: data.orderID,
                });
              }}
            />
          ) : (
            <FlatButton
              name='Checkout'
              className='w-full'
              onClick={() => submitForm}
            />
          )}
        </form>
      )}
    </div>
  );
}
