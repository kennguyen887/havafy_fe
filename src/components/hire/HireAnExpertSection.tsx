import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import { IoIosStar, IoIosStarHalf } from 'react-icons/io';

export default function HireAnExpertSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(className, 'layout mx-6 pb-[8vh] pt-[20vh] text-white')}
    >
      <div className='flex flex-col justify-between lg:flex-row'>
        <div>
          <h1 className='max-w-2xl text-7xl font-light'>
            Hire the top freelance developers talent
          </h1>
          <div className='my-8 flex space-x-5'>
            <div className='text-base font-bold '>Fullstack Developers</div>
            <div className='text-base font-bold'>Backend Developers </div>

            <div className='text-base font-bold'>App Developers</div>
            <div className='text-base  font-thin'>and more</div>
          </div>
          <div className='max-w-lg text-xl font-light'>
            Get introduced to elite e-commerce freelancers for projects &
            retainers, big and small.
          </div>
          <div className='flex'>
            <button className='my-10 bg-[#ede3db] px-8 py-5 font-semibold text-gray-800 hover:bg-[#edeae2]'>
              hire an expert
            </button>
            <div className='mx-10 my-10'>
              <div className='mb-1 mt-2 flex  space-x-1'>
                <IoIosStar height={16} />
                <IoIosStar height={16} />
                <IoIosStar height={16} />
                <IoIosStar height={16} />
                <IoIosStarHalf />
              </div>
              <div className='text-gray-400'>4.8 out of 5 (172+ reviews)</div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <div className='block w-[400px] pt-10 '>
            <Image
              className='absolute  z-10  ml-10  shadow-2xl'
              width={370}
              height={370}
              src='/images/clients/s3.png'
              alt='our client'
            />
            <Image
              className='absolute -mt-6 ml-3 shadow-2xl'
              width={370}
              height={370}
              src='/images/clients/s2.png'
              alt='our client'
            />
            <Image
              className='absolute  -ml-6 mt-6 shadow-2xl '
              width={370}
              height={370}
              src='/images/clients/s1.png'
              alt='our client'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
