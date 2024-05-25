import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

import ButtonCircle from '@/components/form/ButtonCircle';

export default function FreelancerSlideSection({
  className,
  title,
  images,
}: {
  className?: string;
  title: string;
  images: string[];
}) {
  return (
    <div className={clsx(className, 'layout my-16')}>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='max-w-2xl  text-xl font-semibold'>
          {title}{' '}
          <span className='font-extralight  italic text-gray-500'>like</span>
        </h3>
        <div>
          <ButtonCircle name='hire an expert' />
        </div>
      </div>

      <div className='carousel space-x-4'>
        {images.map((imageUrl) => (
          <div key={imageUrl} className='carousel-item'>
            <Image width={234} height={350} src={imageUrl} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}
