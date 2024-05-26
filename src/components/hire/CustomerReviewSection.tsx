import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import { CgQuote } from 'react-icons/cg';

export default function CustomerReviewSection({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={clsx(className, 'bg-orange-100 px-2 py-16')}>
      <div className='items-center justify-between'>
        <h3 className='mb-6 text-center font-mono text-xl font-semibold uppercase lg:text-3xl'>
          Impressions of our customers
        </h3>
      </div>
      <div className='carousel carousel-center w-full space-x-6 rounded-box'>
        <div className='carousel-item'>
          <div className='relative w-[470px] px-8 py-6'>
            <div>
              <Image
                src='/images/clients/logo/h1.png'
                width={100}
                height={50}
                alt='logo client'
              />
            </div>
            <CgQuote className='absolute -ml-[50px] -mt-[10px] h-[60px] w-[60px] text-gray-500' />
            <div className='h-[120px] py-3 font-mono text-sm'>
              It’s become super powerful for us to have somebody as reliable and
              fast as Ken on call. He’s been taking on the vast majority of our
              internal dev projects and I finally feel like I can take a
              breath."
            </div>

            <div className='flex items-center'>
              <div className='avatar w-[55px]'>
                <div className='w-10 rounded-full'>
                  <Image
                    width={200}
                    height={200}
                    alt='avatar client'
                    src='/images/clients/avatars/c4.jpeg'
                  />
                </div>
              </div>
              <div className='font-sans text-xs uppercase'>
                <div className='pb-1 font-semibold'>PATRICK</div>
                FOUNDER, THINK STORE
              </div>
            </div>
          </div>
        </div>
        <div className='carousel-item'>
          <div className='relative w-[470px] px-8 py-6'>
            <div>
              <Image
                src='/images/clients/logo/h2.png'
                width={100}
                height={50}
                alt='logo client'
              />
            </div>
            <CgQuote className='absolute -ml-[50px] -mt-[10px] h-[60px] w-[60px] text-gray-500' />
            <div className='h-[120px] py-3 font-mono text-sm'>
              We turned our contract from a project to a retainer quickly - and
              you’ve truly taken the guesswork out of looking for a developer
              for us.”
            </div>

            <div className='flex items-center'>
              <div className='avatar w-[55px]'>
                <div className='w-10 rounded-full'>
                  <Image
                    width={200}
                    height={200}
                    alt='avatar client'
                    src='/images/clients/avatars/c1.jpg'
                  />
                </div>
              </div>
              <div className='font-sans text-xs uppercase'>
                <div className='pb-1 font-semibold'>Sarah Brown</div>
                HEAD OF E-COMMERCE, VULPO
              </div>
            </div>
          </div>
        </div>
        <div className='carousel-item'>
          <div className='relative w-[470px] px-8 py-6'>
            <div>
              <Image
                src='/images/clients/logo/h3.png'
                width={100}
                height={50}
                alt='logo client'
              />
            </div>
            <CgQuote className='absolute -ml-[50px] -mt-[10px] h-[60px] w-[60px] text-gray-500' />
            <div className='h-[120px] py-3 font-mono text-sm'>
              The biggest benefit that I felt from Havafy, is engaging with very
              talented and honest people. Our Havafy devs really do feel like an
              extension of our team.”
            </div>

            <div className='flex items-center'>
              <div className='avatar w-[55px]'>
                <div className='w-10 rounded-full'>
                  <Image
                    width={200}
                    height={200}
                    alt='avatar client'
                    src='/images/clients/avatars/c6.jpeg'
                  />
                </div>
              </div>
              <div className='font-sans text-xs uppercase'>
                <div className='pb-1 font-semibold'>Amanda Jones</div>
                CEO, MOCESS
              </div>
            </div>
          </div>
        </div>
        <div className='carousel-item'>
          <div className='relative w-[470px] px-8 py-6'>
            <div>
              <Image
                src='/images/clients/logo/h4.png'
                width={100}
                height={50}
                alt='logo client'
              />
            </div>
            <CgQuote className='absolute -ml-[50px] -mt-[10px] h-[60px] w-[60px] text-gray-500' />
            <div className='h-[120px] py-3 font-mono text-sm'>
              Great communication, and fast development with minimal direction
              needed. I look forward to working with Keith in the future!”
            </div>

            <div className='flex items-center'>
              <div className='avatar w-[55px]'>
                <div className='w-10 rounded-full'>
                  <Image
                    width={200}
                    height={200}
                    alt='avatar client'
                    src='/images/clients/avatars/c5.jpeg'
                  />
                </div>
              </div>
              <div className='font-sans text-xs uppercase'>
                <div className='pb-1 font-semibold'>William Garcia</div>
                FOUNDER, REALM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
