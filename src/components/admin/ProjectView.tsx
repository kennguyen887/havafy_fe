import { Option, Select } from '@material-tailwind/react';
import { Card, Typography } from '@material-tailwind/react';
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

  const TABLE_HEAD = ['Name', 'Job', 'Employed', ''];

  const TABLE_ROWS = [
    {
      name: 'John Michael',
      job: 'Manager',
      date: '23/04/18',
    },
    {
      name: 'Alexa Liras',
      job: 'Developer',
      date: '23/04/18',
    },
    {
      name: 'Laurent Perrier',
      job: 'Executive',
      date: '19/09/17',
    },
    {
      name: 'Michael Levi',
      job: 'Developer',
      date: '24/12/08',
    },
    {
      name: 'Richard Gran',
      job: 'Manager',
      date: '04/10/21',
    },
  ];

  return (
    <div className=' mx-auto grid max-w-screen-xl grid-cols-12 items-start  gap-4'>
      <div className='col-span-6 lg:col-span-8'>
        <div className='my-5'>
          <h3 className='text-xl text-gray-800'>{item?.title}</h3>
        </div>
        <div className='my-6'>
          <h4 className='text-base text-gray-800'>Project detail</h4>
          <div className='htmlEditViewer my-3 -ml-2 w-[90%] px-2 py-1 text-sm hover:bg-gray-100 hover:shadow'>
            <div
              dangerouslySetInnerHTML={{
                __html: xss(item?.description as string),
              }}
            />
            <div className='mx-5'></div>

            <Card className='h-full w-full overflow-scroll'>
              <table className='w-full min-w-max table-auto text-left'>
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className='border-blue-gray-100 bg-blue-gray-50 border-b p-4'
                      >
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal leading-none opacity-70'
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ name, job, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {job}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            as='a'
                            href='#'
                            variant='small'
                            color='blue-gray'
                            className='font-medium'
                          >
                            Edit
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
      <div className='col-span-6 lg:col-span-4'>
        <div className='w-72'>
          <Select label='Select Version'>
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
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
