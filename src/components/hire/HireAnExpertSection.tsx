import clsx from 'clsx';
import * as React from 'react';
import { IoIosStar, IoIosStarHalf } from 'react-icons/io';

export default function HireAnExpertSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx(className, 'layout mx-6 pt-[20vh] text-white')}>
      <h1 className='max-w-2xl text-7xl font-light'>
        Hire the top freelance developers talent
      </h1>
      <div className='my-8 flex space-x-5'>
        <div className='text-base font-bold '>Fullstack Developers</div>
        <div className='text-base font-bold'>Frontend Developers </div>

        <div className='text-base font-bold'>App Developers</div>
        <div className='text-base  font-thin'>and more</div>
      </div>
      <div className='max-w-lg text-xl font-light'>
        Get introduced to elite e-commerce freelancers for projects & retainers,
        big and small.
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
  );
}
