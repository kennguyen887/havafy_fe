import { useParams } from 'next/navigation';
import React from 'react';
import xss from 'xss';

import { getApi } from '@/lib/request';

import { GetItemDto } from '@/domain/dto';

export default function ProjectView() {
  const [item, setItem] = React.useState<GetItemDto>();
  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!params?.id) {
      return;
    }

    getApi(`items/${params?.id}`).then(({ data }) => {
      setItem(data);
    });
  }, [params?.id]);

  return (
    <div className='flex flex-row'>
      <div className='basis-2/3'>
        <div className='my-5'>
          <h3 className='text-xl text-gray-800'>{item?.title}</h3>
        </div>
        <div className='my-6'>
          <h4 className='text-base text-gray-800'>Project detail</h4>
          <div className='htmlEditViewer my-3 w-[500px] px-5 py-1 text-sm hover:bg-gray-100 hover:shadow'>
            <div
              dangerouslySetInnerHTML={{
                __html: xss(item?.description as string),
              }}
            />
            <div className='mx-5'></div>
          </div>
        </div>
      </div>
      <div className='mt-10 basis-1/3 pl-5'>
        <div className='hs-dropdown relative m-1 inline-flex [--trigger:hover]'>
          <button
            id='hs-dropdown-hover-event'
            type='button'
            className='hs-dropdown-toggle inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50'
          >
            Actions2
            <svg
              className='hs-dropdown-open:rotate-180 size-4'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </button>

          <div
            className='hs-dropdown-menu duration hs-dropdown-open:opacity-100 min-w-60 mt-2 hidden rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full'
            aria-labelledby='hs-dropdown-hover-event'
          >
            <a
              className='flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              href='#'
            >
              Newsletter
            </a>
            <a
              className='flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              href='#'
            >
              Purchases
            </a>
            <a
              className='flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              href='#'
            >
              Downloads
            </a>
            <a
              className='flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              href='#'
            >
              Team Account
            </a>
          </div>
        </div>

        <div className='mt-5 w-[300px] border border-gray-200 text-xs'>
          <div className='border border-x-0 border-t-0 px-5 py-2 text-xs font-semibold uppercase '>
            Details
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Assignee</div>
            <div className='basis-1/2'>Ken</div>
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Priority</div>
            <div className='basis-1/2'>Highest</div>
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Manday estimate</div>
            <div className='basis-1/2'>3</div>
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Type of Issue</div>
            <div className='basis-1/2'>
              Billing Operations Partner-Fulfilment UXUI
            </div>
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Release Date</div>
            <div className='basis-1/2'>April 3, 2023 at 10:02 AM</div>
          </div>
          <div className='flex px-5 py-3 hover:bg-slate-100' role='button'>
            <div className='basis-1/2'>Created At</div>
            <div className='basis-1/2'>Highest</div>
          </div>
        </div>
      </div>
    </div>
  );
}
