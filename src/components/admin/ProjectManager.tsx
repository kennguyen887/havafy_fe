import Link from 'next/link';
import React from 'react';

import ButtonCircle from '@/components/form/ButtonCircle';

export default function ProjectManager() {
  return (
    <>
      <div className='my-5'>
        <h3>Kick off a new project</h3>
        <p className=' my-2 text-sm text-gray-600'>
          Work with the same expert or connect with someone new
        </p>
        <Link href='/hire/expert'>
          <ButtonCircle name='New project' />
        </Link>
      </div>
      <div className='my-6'>
        <h3>Active projects</h3>
        <div className='my-3'></div>
      </div>
    </>
  );
}
