import clsx from 'clsx';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoMdArrowBack } from 'react-icons/io';

import TagSelector from '@/components/common/TagSelector';
import ButtonPrimary from '@/components/form/ButtonPrimary';
import Editor from '@/components/form/Editor';
import TextInput from '@/components/form/TextInput';

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

export default function HireAnExpertModal() {
  const [stepTwo, setStepTwo] = React.useState(false);
  return (
    <>
      <dialog id='HireAnExpertModal' className='modal'>
        <div className='modal-box relative h-[800px]  w-11/12 max-w-5xl overflow-y-auto'>
          <div className='modal-action absolute right-6 z-50 -mt-4'>
            <form method='dialog'>
              {/* if there is a button, it will close the modal */}
              <button
                className={clsx(
                  'group btn m-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:text-gray-950',
                  stepTwo ? 'hidden' : ''
                )}
              >
                <IoMdClose className='h-8 w-8 text-gray-400 group-hover:text-gray-700' />
              </button>
            </form>
            <button
              className={clsx('group mx-10 my-3', stepTwo ? '' : 'hidden')}
              onClick={() => {
                setStepTwo(false);
              }}
            >
              <div className='flex items-center'>
                <IoMdArrowBack className='h-8 w-8 text-gray-600 group-hover:text-gray-900' />
                <span className='text-base font-semibold text-gray-600 group-hover:text-gray-900'>
                  Back
                </span>
              </div>
            </button>
          </div>
          <div className={clsx('py-4', stepTwo ? 'hidden' : '')}>
            <h1>Get Started</h1>
            <p className='max-w-lg py-4 text-sm text-gray-600'>
              It only takes a few minutes to kick off your first project. Then
              we'll introduce you to an developer/design expert in our network.
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
                  // eslint-disable-next-line no-console
                  onChange={(tags) => {
                    console.log('------', tags);
                  }}
                />
              </div>
              <div></div>
            </div>
            <div className='flex'>
              <ButtonPrimary
                onClick={() => {
                  setStepTwo(true);
                }}
                name='Next'
              />
            </div>
          </div>

          <div
            className={clsx(
              'h-[500px] max-w-md overflow-y-auto py-4',
              stepTwo ? '' : 'hidden'
            )}
          >
            <h1 className='max-w-sm'>
              Give your new Expert a way to reach you.
            </h1>
            <p className='py-4 text-sm'>
              You'll be introduced directly via text or email.
            </p>
            <div className='my-6'>
              <div className='my-1 font-semibold'>Full Name</div>

              <TextInput
                name='Fullname'
                id='fullname'
                type='fullname'
                currentValue={(value) => value}
                valueValidate={[
                  (value) => value.length === 0,
                  'Full name is requried',
                ]}
                className='mb-3'
              />
            </div>

            <div className='my-6'>
              <div className='my-1 font-semibold'>Email Address</div>

              <TextInput
                name='Email Address'
                id='email_address'
                type='email_address'
                currentValue={(value) => value}
                valueValidate={[
                  (value) => value.length === 0,
                  'Email is requried',
                ]}
                className='mb-3'
              />
            </div>

            <div className='flex'>
              <ButtonPrimary
                onClick={() => {
                  setStepTwo(true);
                }}
                name='Submit'
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
