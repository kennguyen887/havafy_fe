import { Option, Select } from '@material-tailwind/react';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React from 'react';
import xss from 'xss';

import { getApi } from '@/lib/request';
import useLoaded from '@/hooks/useLoaded';

import { GetItemDto } from '@/domain/dto';

export default function ProjectView() {
  const [item, setItem] = React.useState<GetItemDto>();
  const params = useParams<{ id: string }>();
  const isLoaded = useLoaded();

  React.useEffect(() => {
    if (!params?.id) {
      return;
    }

    getApi(`items/${params?.id}`).then(({ data }) => {
      setItem(data);
    });
  }, [params?.id]);

  return (
    <div className=' mx-auto grid max-w-screen-xl grid-cols-12 items-start  gap-4'>
      <div className='col-span-6 lg:col-span-8'>
        <div className='my-5'>
          <h3 className='text-xl text-gray-800'>{item?.title}</h3>
        </div>
        <div className='my-6'>
          <h4 className='text-base text-gray-800'>Project detail</h4>
          <div className='htmlEditViewer my-3 -ml-2 w-[90%] bg-gray-50 px-2 py-1 text-sm hover:bg-gray-100 hover:shadow'>
            <div
              dangerouslySetInnerHTML={{
                __html: xss(item?.description as string),
              }}
            />
            <div className='mx-5'></div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'col-span-6 lg:col-span-4',
          isLoaded && 'fade-in-start'
        )}
      >
        <div className='w-72'>
          <Select label='Project Status'>
            <Option>In progress</Option>
            <Option>Experts Matching</Option>
            <Option>Building</Option>
            <Option>Completed</Option>
            <Option>Stopped</Option>
          </Select>
        </div>
        <div className='mt-5 w-[300px] border border-gray-200 text-xs'>
          <div className='border border-x-0 border-t-0 px-5 py-2 text-xs font-semibold uppercase '>
            Details
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Assignee</div>
            <div className='basis-1/2'>Ken</div>
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Priority</div>
            <div className='basis-1/2'>Highest</div>
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Manday estimate</div>
            <div className='basis-1/2'>3</div>
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Type of Issue</div>
            <div className='basis-1/2'>
              Billing Operations Partner-Fulfilment UXUI
            </div>
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Release Date</div>
            <div className='basis-1/2'>April 3, 2023 at 10:02 AM</div>
          </div>
          <div className='hover:bg-slate-100 flex px-5 py-3' role='button'>
            <div className='basis-1/2'>Created At</div>
            <div className='basis-1/2'>Highest</div>
          </div>
        </div>
      </div>
    </div>
  );
}
