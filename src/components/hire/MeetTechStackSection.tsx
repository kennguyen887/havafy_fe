import clsx from 'clsx';
import * as React from 'react';

import ButtonCircle from '@/components/form/ButtonCircle';

export default function MeetTechStackSection({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div className={clsx(className, 'layout my-16')}>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='max-w-2xl  text-xl font-semibold'>{title}</h3>
        <div>
          <ButtonCircle name='hire an expert' />
        </div>
      </div>

      <div className='my-8 gap-2 lg:grid lg:grid-cols-4'>
        <div className='my-5 lg:my-0'>
          <div className='my-6 text-2xl font-semibold italic lg:w-1/2'>
            Developers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Nodejs/Typescript devs</li>
              <li className='my-2'>Python devs</li>
              <li className='my-2'>ReactJs/Vuejs devs</li>
              <li className='my-2'>App devs</li>
            </ul>
          </div>
        </div>
        <div className='my-5 lg:my-0'>
          <div className='my-6 text-2xl font-semibold italic lg:w-1/2'>
            Developers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Full-Stack Shopify devs</li>
              <li className='my-2'>Frontend devs</li>
              <li className='my-2'>Headless devs</li>
              <li className='my-2'>Shopify App devs</li>
            </ul>
          </div>
        </div>

        <div className='my-5 lg:my-0'>
          <div className='my-6 text-2xl font-semibold italic lg:w-1/2'>
            Designers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Full-Stack Shopify devs</li>
              <li className='my-2'>Frontend devs</li>
              <li className='my-2'>Headless devs</li>
              <li className='my-2'>Shopify App devs</li>
            </ul>
          </div>
        </div>

        <div className='my-5 lg:my-0'>
          <div className='my-6 text-2xl font-semibold italic lg:w-1/2'>
            Developers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Full-Stack Shopify devs</li>
              <li className='my-2'>Frontend devs</li>
              <li className='my-2'>Headless devs</li>
              <li className='my-2'>Shopify App devs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
