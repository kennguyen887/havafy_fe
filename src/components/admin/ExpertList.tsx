import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { getApi, putApi } from '@/lib/request';

import { GetItemDto } from '@/domain/dto';

export default function ExpertList() {
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
        <h3>Experts</h3>
      </div>
      <div className='my-6'>
        <div className='my-3'>
          {items?.map((item: GetItemDto) => (
            <Link href={`/admin/projects/${item.id}`} key={item.id}>
              <div className='mb-6 w-[500px] cursor-pointer border border-gray-300 px-5 py-3 shadow-md hover:shadow-xl'>
                <div className='flex justify-between'>
                  <div>{item.title}</div>
                  <div>status</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
