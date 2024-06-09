/* eslint-disable no-console */
import React from 'react';

import ButtonPrimary from '@/components/form/ButtonPrimary';
import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';

export default function ProfileManager() {
  return (
    <>
      <div className='my-2'>
        <div className=''>
          <TextAbleEdit
            placeholder='Job title'
            onChange={(value) => console.log(value)}
            className='text-base font-semibold'
            value=''
          />
          <div className='flex'>
            <div className=''>
              <TextAbleEdit
                placeholder='2021-07'
                onChange={(value) => console.log(value)}
                className='w-[90px] text-sm'
                value=''
              />
            </div>
            <div className=''>
              <TextAbleEdit
                placeholder='2023-12'
                onChange={(value) => console.log(value)}
                className='w-[90px] text-sm'
                value=''
              />
            </div>
          </div>
        </div>

        <div className='rounded-md p-2 px-0'>
          <h3 className='mb-2 ml-2 text-base font-semibold'>Description</h3>
          <TextareaAbleEdit
            onChange={(value) => console.log(value)}
            className='text-sm'
            placeholder='Description about your this position.'
            value=''
          />
        </div>
        <div>
          <ButtonPrimary className='py-2' name='Add' />
        </div>
      </div>
    </>
  );
}
