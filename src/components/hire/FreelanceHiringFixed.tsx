import clsx from 'clsx';
import * as React from 'react';

export default function FreelanceHiringFixed({
  className,
}: {
  className?: string;
}) {
  return (
    <div>
      <div
        className={clsx(
          className,
          'border-b-1  border  border-l-0  border-r-0 border-t-0 border-gray-200 text-gray-900'
        )}
      >
        <div className='mx-6  px-20 pb-[50px] pt-[20px]'>
          <h3 className='my-10 text-4xl'>
            Freelance hiring - <span className='font-extralight'>fixed</span>
          </h3>
          <div className='my-8 gap-2 lg:grid lg:grid-cols-3'>
            <div className='my-5 lg:my-0'>
              <div className='text-5xl font-extrabold text-gray-400'>1.</div>
              <div className='my-3 font-bold lg:w-1/2'>
                TELL US WHAT YOU NEED DONE
              </div>
              <div className='font-light lg:w-3/4'>
                Projects and retainers big and small. Kick off your first
                project in under 3 min.
              </div>
            </div>
            <div className='my-5 lg:my-0'>
              <div className='text-5xl font-extrabold text-gray-400'>2.</div>
              <div className='my-3 font-bold lg:w-1/2'>
                WE INTRODUCE YOU TO THE RIGHT PERSON
              </div>
              <div className='font-light lg:w-3/4'>
                Often within a few hours, we'll introduce you to freelancers who
                will be a great fit.
              </div>
            </div>
            <div className='my-5 lg:my-0'>
              <div className='text-5xl font-extrabold text-gray-400'>3.</div>
              <div className='lg:w-3/2 my-3 h-12 font-bold'>
                HIRE, PAY, COLLABORATE, <br /> CONTINUE
              </div>
              <div className='font-light lg:w-3/4'>
                Access an entire network of freelance talent and a seamless
                process end to end.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='layout my-20 gap-6 lg:grid lg:grid-cols-12'>
        <div className='col-span-8'>
          <div className='max-w-lg text-4xl font-semibold text-gray-800 lg:ml-8'>
            The most experienced network of freelance web application talent
          </div>
        </div>
        <div className='col-span-4 '>
          <div className='text-lg font-light lg:w-3/4'>
            We've reviewed over 500 developers, designers, and QA and hand
            selected the top 20%.
          </div>
        </div>
      </div>
    </div>
  );
}
