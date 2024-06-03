/* eslint-disable unused-imports/no-unused-vars */
import clsx from 'clsx';
// import { IoMdClose } from 'react-icons/io';
import Router from 'next/router';
import * as React from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { IoMdArrowBack } from 'react-icons/io';

import { postApi } from '@/lib/request';

import TagSelector from '@/components/common/TagSelector';
import ButtonPrimary from '@/components/form/ButtonPrimary';
import Editor from '@/components/form/Editor';

import { useAuthState } from '@/contexts/AuthContext';
import { ItemType } from '@/domain/dto';

const DEFAULT_ABOUT_PROJECT = `
      <h3>About Us:</h3>
      <br />
      <h3>Project Description:</h3>
    <ul>
    <li></li>
    <li></li>
    </ul>
    <h3>Project Goal:</h3><br />
    <h3>Project Budget:</h3><br />`;

export function HireAnExpertForm() {
  const [description, setDescription] = React.useState(DEFAULT_ABOUT_PROJECT);
  const [tags, setTags] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isAuthenticated } = useAuthState();

  const submitForm = React.useCallback(async () => {
    setLoading(true);

    if (!executeRecaptcha || description.length < 5) {
      setLoading(false);
      return;
    }

    const token = await executeRecaptcha();
    const data = await postApi('items', {
      description,
      type: ItemType.HIRE_REQUEST,
      attributies: {
        tags,
      },
      token,
    });
    setLoading(false);
    if (data && data.id) {
      const redirect = `/admin/projects?linking=${data.id}`;

      if (!isAuthenticated) {
        Router.push({
          pathname: '/user/login',
          query: { redirect },
        });
        return;
      }

      Router.push(redirect);
      return;
    }
  }, [executeRecaptcha, description, tags, isAuthenticated]);

  return (
    <div className='max-w-4xl  px-6 py-2'>
      {/* <button
                className={clsx(
                  'group btn m-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:text-gray-950',
                  stepTwo ? 'hidden' : ''
                )}
              >
                <IoMdClose className='h-8 w-8 text-gray-400 group-hover:text-gray-700' />
              </button>
            */}

      <div className={clsx('py-4')}>
        <div className='flex justify-between'>
          <h1>Get Started</h1>
          <button
            className={clsx('group mx-0 my-2')}
            onClick={() => Router.back()}
          >
            <div className='flex items-center'>
              <IoMdArrowBack className='mr-1 h-5 w-5 text-gray-600 group-hover:text-gray-900' />
              <span className='text-sm font-semibold text-gray-600 group-hover:text-gray-900'>
                Back
              </span>
            </div>
          </button>
        </div>
        <p className='max-w-lg py-4 text-sm text-gray-600'>
          It only takes a few minutes to kick off your first project. Then we'll
          introduce you to an developer/design expert in our network.
        </p>

        <div>
          <label className='mb-3 block text-lg font-semibold'>
            Tell Us About Your Project
          </label>
          <div className=''>
            <Editor defaultValue={DEFAULT_ABOUT_PROJECT} />
          </div>
        </div>
        <div className='my-5'>
          <div className='mb-3 block text-lg font-semibold'>
            Who would be best suited for the project?{' '}
            <span className='mx-1 text-base font-light text-gray-400'>
              (optional)
            </span>
          </div>
          <div className=''>
            <TagSelector
              tags={[
                'ReactJs',
                'VueJs',
                'C#/.NET',
                'Java',
                'Ruby',
                'NodeJs/Typescript',
                'PHP/Laravel',
                'Figma',
                'Python',
                'Flutter',
                'AWS/Azure',
                'AI/LLM',
              ]}
              onChange={(tags) => {
                setTags(tags);
              }}
            />
          </div>
          <div></div>
        </div>
        <div className='flex'>
          <ButtonPrimary
            onClick={() => {
              submitForm();
            }}
            name='Next'
          />
        </div>
      </div>
    </div>
  );
}

export default function HireAnExpertFormWrap() {
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
        <HireAnExpertForm />
      </GoogleReCaptchaProvider>
    </div>
  );
}
