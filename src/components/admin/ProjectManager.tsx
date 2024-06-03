import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { getApi, putApi } from '@/lib/request';

import ButtonCircle from '@/components/form/ButtonCircle';

import { GetItemDto } from '@/domain/dto';

export default function ProjectManager() {
  const [items, setItems] = React.useState<GetItemDto[]>();
  const searchParams = useSearchParams();
  const linking = searchParams.get('linking');

  const getProjectList = React.useCallback(async () => {
    getApi(`items`).then(({ data }) => {
      setItems(data.data);
    });
  }, []);

  React.useEffect(() => {
    if (linking) {
      putApi(`items/${linking}/link`, {}).then(() => {
        getProjectList();
      });
      return;
    }
    getProjectList();
  }, [getProjectList, linking]);

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
        <div className='my-3'>
          {items?.map((item: GetItemDto) => (
            <div
              className='mb-6 w-[500px] cursor-pointer border border-gray-300 px-5 py-3 shadow-md hover:shadow-xl'
              key={item.id}
            >
              <div className='flex justify-between'>
                <div>{item.title}</div>
                <div>status</div>
              </div>
              <div className='text-sm text-gray-600'>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
