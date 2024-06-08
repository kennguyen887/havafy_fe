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
            onChange={(value) => console.log(value)}
            className='text-base font-semibold'
            value='Job title'
          />
          <div className='flex'>
            <div className=''>
              <TextAbleEdit
                onChange={(value) => console.log(value)}
                className='w-[90px] text-sm'
                value='20203-01'
              />
            </div>
            <div className=''>
              <TextAbleEdit
                onChange={(value) => console.log(value)}
                className='w-[90px] text-sm'
                value='2024-12'
              />
            </div>
          </div>
        </div>

        <div className='rounded-md p-2 px-0'>
          <h3 className='mb-2 ml-2 text-base font-semibold'>Description</h3>
          <TextareaAbleEdit
            onChange={(value) => console.log(value)}
            className='text-sm'
            value='You can write about your years of experience, industry, or skills'
          />
        </div>
        <div>
          <ButtonPrimary className='py-2' name='Add' />
        </div>
      </div>
    </>
  );
}
