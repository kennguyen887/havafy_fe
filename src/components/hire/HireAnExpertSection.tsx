import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { IoIosStar, IoIosStarHalf } from 'react-icons/io';

export default function HireAnExpertSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        'layout mx-0 pb-2 pt-[16vh] text-white lg:mx-6 lg:pb-[2vh] lg:pt-[20vh]'
      )}
    >
      <div className='flex flex-col justify-between lg:flex-row'>
        <div>
          <h1 className='max-w-3xl text-5xl font-light lg:text-7xl'>
            Hire the top freelance developers talent
          </h1>
          <div className='my-8 flex space-x-3 lg:space-x-5'>
            <div className='text-sm font-bold lg:text-base '>
              Fullstack Developers
            </div>
            <div className='text-sm font-bold lg:text-base'>
              Backend Developers{' '}
            </div>
            <div className='text-sm font-bold lg:text-base'>App Developers</div>
            <div className='font-serif text-sm font-thin lg:text-base'>
              and more
            </div>
          </div>
          <div className='max-w-lg text-xl font-light'>
            Get introduced to elite e-commerce freelancers for projects &
            retainers, big and small.
          </div>
          <div className='flex'>
            <Link href='/admin/project-form'>
              <button className='my-10 bg-[#ede3db] px-2 py-2 font-semibold text-gray-800 hover:bg-[#edeae2] lg:px-8 lg:py-5'>
                hire an expert
              </button>
            </Link>

            <div className='my-10 ml-5 lg:ml-10'>
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
