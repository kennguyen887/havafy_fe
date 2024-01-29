import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

import { postApi } from '@/lib/request';

import Accent from '@/components/Accent';
import Alert from '@/components/form/Alert';
import FlatButton from '@/components/form/FlatButton';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';
import {
  GetOrdeItemDto,
  GetOrderReqDto,
  PaypalOrderDataResponse,
  PaypalOrderResponse,
  SubmitOrderReqDto,
} from '@/domain/dto';
function CheckoutFormSubmitted({
  orderId,
  orderNumber,
}: {
  orderId: string;
  orderNumber: string;
}) {
  return (
    <div className='mb-5 bg-white p-10 text-center'>
      <h3 className='font-extrabold text-red-500'>Thank you for your order!</h3>
      <div className='my-10 text-sm'>
        Your order has been confirmed{' '}
        <a
          className='font-semibold text-red-700'
          href={`/user/order/${orderId}`}
        >
          #{orderNumber}
        </a>
        <div className='mt-5 font-serif text-gray-700'>
          Use this code at checkout for 5% off your next order.
          <div className='my-5 space-x-1 font-serif font-semibold'>
            THANKYOU1024
          </div>
        </div>
      </div>

      <div>
        <Link href='/'>
          <PrimaryButton className='h-10' name='Go to home' />
        </Link>
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
  const [alertMessage, setAlertMessage] = React.useState<string>();
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
    const cartItems = items?.map((item) => {
      return {
        productSku: item.sku,
        quantity: 1,
      };
    });

    if (!cartItems || !cartItems.length) {
      return;
    }

    const paypload: SubmitOrderReqDto = {
      paymentMethod,
      paymentOrderId,
      items: cartItems,
    };

    if (promoCode) {
      paypload.promoCode = promoCode;
    }

    postApi('order', paypload).then((data) => {
      if (data.statusCode) {
        setAlertMessage(data.message);
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
        <>
          <div className='mb-10 text-center'>
            <Accent className='text-2xl font-semibold'>Checkout</Accent>
          </div>
          <div className='mb-5 bg-white p-5'>
            <Alert content={alertMessage} hidden={!alertMessage} />
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
              onSuccess={(
                _details: PaypalOrderResponse,
                data: PaypalOrderDataResponse
              ) => {
                return submitForm({
                  paymentMethod: data.paymentSource,
                  paymentOrderId: data.orderID,
                });
              }}
            />
          ) : (
            <FlatButton
              name='Checkout'
              className='w-full'
              onClick={() => {
                submitForm({});
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
