import clsx from 'clsx';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';

import ButtonPrimary from '@/components/form/ButtonPrimary';
import Editor from '@/components/form/Editor';

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
        <div className='relativ { stepTw modal-box w-11/12 max-w-5xl'>
          <div className='modal-action absolute right-6 z-50 -mt-4'>
            <form method='dialog'>
              {/* if there is a button, it will close the modal */}
              <button className='group btn m-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:text-gray-950'>
                <IoMdClose className='h-8 w-8 text-gray-400 group-hover:text-gray-700' />
              </button>
            </form>
          </div>
          <div
            className={clsx(
              'h-[800px] overflow-y-auto py-4',
              stepTwo ? '' : 'hidden'
            )}
          >
            <h1>Get Started</h1>
            <p className='py-4'>
              It only takes a few minutes to kick off your first project. Then
              we'll introduce you to an e-commerce expert in our network.
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

              <div></div>
            </div>
            <div className='flex justify-end'>
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
              'h-[800px] overflow-y-auto py-4',
              stepTwo ? '' : 'hidden'
            )}
          >
            <h1 className='max-w-sm'>
              Give your new Expert a way to reach you.
            </h1>
            <p className='py-4'>
              You'll be introduced directly via text or email.
            </p>
            ....
            <div className='flex justify-end'>
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
