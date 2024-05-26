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
        <div className='mx-2 px-6 pb-[20px] pt-[10px] lg:mx-6 lg:px-20 lg:pb-[50px] lg:pt-[20px]'>
          <h3 className='my-10 text-3xl lg:text-4xl'>
            Freelance hiring -{' '}
            <span className='font-serif font-extralight text-gray-400'>
              fixed
            </span>
          </h3>
          <div className='my-8 gap-2 lg:grid lg:grid-cols-3'>
            <div className='my-5 lg:my-0'>
              <div className='text-3xl font-extrabold text-gray-400 lg:text-5xl'>
                1.
              </div>
              <div className='my-3 font-bold lg:w-1/2'>
                TELL US WHAT YOU NEED DONE
              </div>
              <div className='font-light lg:w-3/4'>
                Projects and retainers big and small. Kick off your first
                project in under 3 min.
              </div>
            </div>
            <div className='my-5 lg:my-0'>
              <div className='text-3xl font-extrabold text-gray-400 lg:text-5xl'>
                2.
              </div>
              <div className='my-3 font-bold lg:w-1/2'>
                WE INTRODUCE YOU TO THE RIGHT PERSON
              </div>
              <div className='font-light lg:w-3/4'>
                Often within a few hours, we'll introduce you to freelancers who
                will be a great fit.
              </div>
            </div>
            <div className='my-5 lg:my-0'>
              <div className='text-3xl font-extrabold text-gray-400 lg:text-5xl'>
                3.
              </div>
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

      <div className='layout my-10 gap-6 lg:my-20 lg:grid lg:grid-cols-12'>
        <div className='col-span-8 mb-5 lg:mb-0'>
          <div className='max-w-lg font-mono text-2xl font-semibold text-gray-800 lg:ml-8 lg:text-4xl'>
            The most experienced network of freelance web application talent
          </div>
        </div>
        <div className='col-span-4 '>
          <div className='font-serif text-xl font-light lg:w-3/4'>
            We've reviewed over 500 developers, designers, and QA and hand
            selected the top 20%.
          </div>
        </div>
      </div>
    </div>
  );
}
