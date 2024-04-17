import clsx from 'clsx';
import Router from 'next/router';
import React from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { postApi } from '@/lib/request';

import Accent from '@/components/Accent';
import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';

import { useAuthState } from '@/contexts/AuthContext';

export function CreateTask() {
  const { isAuthenticated } = useAuthState();
  const MAX_TEXT_LENGTH = 6000;
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [doneType] = React.useState<string>('flexiable');
  const [location, setLocation] = React.useState<string>('');
  const [budget, setBudget] = React.useState<string>('');
  const [alert, setAlert] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const isTextToLong = (): boolean => {
    return description?.length > MAX_TEXT_LENGTH;
  };

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!isAuthenticated) {
        Router.push('/user/login');
        return;
      }
      setAlert(undefined);
      setLoading(true);

      if (!executeRecaptcha || description.length < 5) {
        setLoading(false);
        return;
      }

      const token = await executeRecaptcha();

      const data = await postApi('tasks', {
        description,
        title,
        token,
        doneType,
        budget: Number(budget),
        location,
      });
      setLoading(false);
      if (data && data.statusCode) {
        setAlert(data.message);
        return;
      }
    },
    [
      isAuthenticated,
      executeRecaptcha,
      description,
      title,
      doneType,
      budget,
      location,
    ]
  );

  return (
    <article className='layout w-[620px]'>
      <h1 className='mt-1 text-2xl md:text-4xl 2xl:text-5xl' data-fade='1'>
        <Accent>Gởi Công việc</Accent>
      </h1>
      <form onSubmit={submitForm} noValidate>
        <Alert content={alert} hidden={!alert} />
        <div className='my-5' data-fade='2'>
          <div className='mb-3 font-semibold'>Tiêu đề công việc</div>
          <input
            onChange={(data) => setTitle(data.target.value)}
            id='message'
            className='block w-full border border-gray-300 bg-white p-2.5 text-sm text-gray-900 ring-0 focus:border focus:border-gray-300 focus:ring-0 '
            placeholder='Tóm tắt kết quả bạn đang cần'
          />
        </div>
        <div className='relative' data-fade='2'>
          <div className='mb-3 font-semibold'>Yêu cầu cho công việc</div>
          <textarea
            onChange={(data) => setDescription(data.target.value)}
            id='message'
            rows={8}
            className='block w-full border border-gray-300 bg-white p-2.5 text-sm text-gray-900 ring-0 focus:border focus:border-gray-300 focus:ring-0 '
            placeholder='Mô tả chi tiết yêu cầu công việc...'
          ></textarea>
          <div
            className={clsx(
              'absolute right-0 -mt-6 mr-2 text-sm',
              isTextToLong() ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {description?.length}/{MAX_TEXT_LENGTH}
          </div>
        </div>
        <div className='my-5' data-fade='3'>
          <div className='mb-3 font-semibold'>Ngân sách</div>
          <input
            onChange={(data) => setBudget(data.target.value)}
            id='budget'
            className='block w-full border border-gray-300 bg-white p-2.5 text-sm text-gray-900 ring-0 focus:border focus:border-gray-300 focus:ring-0 '
            placeholder='Bạn có thể thương lượng giá cuối.'
          />
        </div>
        <div className='my-5' data-fade='4'>
          <div className='mb-3 font-semibold'>Địa điểm công việc</div>
          <input
            onChange={(data) => setLocation(data.target.value)}
            id='location'
            className='block w-full border border-gray-300 bg-white p-2.5 text-sm text-gray-900 ring-0 focus:border focus:border-gray-300 focus:ring-0 '
            placeholder='Địa điểm làm việc hay làm việc qua online'
          />
        </div>
        <div className='mt-3 flex' data-fade='4'>
          <PrimaryButton className='h-12' name='Gởi đi' isLoading={loading} />
        </div>
      </form>
    </article>
  );
}

export default function CreateTaskWrap() {
  return (
    <div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY || ''}
        scriptProps={{
          async: false,
          defer: true,
          appendTo: 'body',
          nonce: undefined,
        }}
      >
        <CreateTask />
      </GoogleReCaptchaProvider>
    </div>
  );
}
