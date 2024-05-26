import clsx from 'clsx';
import * as React from 'react';

export default function MeetTechStackSection({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div className={clsx(className, 'lg:layout mx-2 my-16')}>
      <div className=' flex items-center justify-between'>
        <h3 className='mb-3 max-w-2xl text-3xl font-semibold lg:text-3xl'>
          {title}
        </h3>
      </div>
      <div className='mx-3 mb-8 mt-2 gap-2 lg:mx-0 lg:grid lg:grid-cols-4'>
        <div className='my-5 lg:my-0'>
          <div className='my-5 font-serif text-xl font-semibold  lg:w-3/4'>
            Full-stack Developers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>ReactJs + NextJs devs</li>
              <li className='my-2'>VueJs devs</li>
              <li className='my-2'>Wordpress + Shopify devs</li>
              <li className='my-2'>Flutter devs</li>
            </ul>
          </div>
        </div>

        <div className='my-7 lg:my-0'>
          <div className='my-5 font-serif text-xl font-semibold  lg:w-3/4'>
            Backend Developers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Nodejs + Typescript devs</li>
              <li className='my-2'>Python devs</li>
              <li className='my-2'>PHP devs</li>
              <li className='my-2'>Java devs</li>
            </ul>
          </div>
        </div>

        <div className='my-7 lg:my-0'>
          <div className='my-5 font-serif text-xl font-semibold  lg:w-3/4'>
            Designers
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>UI/UX designers</li>
              <li className='my-2'>App designers</li>
              <li className='my-2'>E-commerce designers</li>
            </ul>
          </div>
        </div>
        <div className='my-7 lg:my-0'>
          <div className='my-5 font-serif text-xl font-semibold lg:w-3/4'>
            And more
          </div>
          <div className='text-base lg:w-3/4'>
            <ul>
              <li className='my-2'>Automation QA</li>
              <li className='my-2'>Data Analytics</li>
              <li className='my-2'>Machine Learning Engineer</li>
              <li className='my-2'>Cloud DevOps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
