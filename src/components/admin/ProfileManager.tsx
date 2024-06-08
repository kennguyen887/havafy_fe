/* eslint-disable no-console */
import { Avatar } from '@material-tailwind/react';
import React from 'react';

import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';
import ExperienceForm from '@/components/profile/ExperienceForm';

export default function ProfileManager() {
  return (
    <>
      <div className='my-2'>
        <div className='flex'>
          <Avatar
            src='https://docs.material-tailwind.com/img/face-2.jpg'
            alt='avatar'
            size='xxl'
          />
          <div className='pl-7'>
            <TextAbleEdit
              onChange={(value) => console.log(value)}
              className='text-xl font-semibold'
              value='Your name'
            />
            <div className=''>
              <TextAbleEdit
                onChange={(value) => console.log(value)}
                className='text-base'
                value='Write a headline'
              />
            </div>
            <div className='mt-2'>
              <TextAbleEdit
                onChange={(value) => console.log(value)}
                className='text-sm'
                value='Your location'
              />
            </div>
          </div>
        </div>

        <div className='mt-3 rounded-md bg-gray-100 p-2 px-3'>
          <h3 className='mb-2 ml-2 text-lg font-semibold'>About</h3>
          <TextareaAbleEdit
            onChange={(value) => console.log(value)}
            className='text-sm'
            value='You can write about your years of experience, industry, or skills'
          />
        </div>

        <div className='mt-3 rounded-md bg-gray-100 p-2 px-3'>
          <h3 className='mb-2 ml-2 text-lg font-semibold'>Experiences</h3>
          <ExperienceForm />
        </div>
      </div>
    </>
  );
}
