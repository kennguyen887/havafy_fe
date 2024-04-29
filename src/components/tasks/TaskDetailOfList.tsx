import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { TbProgress } from 'react-icons/tb';

import t from '@/lib/translate';

import { GetTaskListItemDto } from '@/domain/dto';

import TaskStatusField from './TaskStatusField';
import Currency from '../common/Currency';

export default function TaskDetailOfList({
  task,
}: {
  task: GetTaskListItemDto | undefined;
}) {
  if (task === undefined) return <></>;

  return (
    <>
      <div className='px-5 py-5'>
        <TbProgress className='mr-1 inline-block' />
        <TaskStatusField status={task.status} />
        <div className='mb-2 flex flex-row'>
          <div className='basis-4/6'>
            <div className='py-5 text-xl font-semibold text-gray-900'>
              {task.title}
            </div>
            <div className='my-3 flex flex-row text-gray-600'>
              <div className='basis-2/4 pb-3 text-sm'>
                <div className='flex flex-row'>
                  <div className='pr-3 pt-1'>
                    <FaRegClock className='mr-1 inline-block h-5 w-5' />
                  </div>
                  <div className=''>
                    <div className='pb-1 text-xs uppercase text-gray-500'>
                      Hoàn thảnh
                    </div>

                    <div className='text-base text-gray-900'>
                      {t(task.doneType)}
                    </div>
                  </div>
                </div>
              </div>
              {task.attributes?.workplaceType ? (
                <div className='basis-2/4 text-sm'>
                  <div className='flex flex-row'>
                    <div className='pr-3 pt-1'>
                      {' '}
                      <LiaFileContractSolid className=' mr-1 inline-block  h-5 w-5' />
                    </div>
                    <div className=''>
                      <div className='pb-1 text-xs uppercase text-gray-500'>
                        Hình thức
                      </div>

                      <div className='text-base text-gray-900'>
                        {' '}
                        {t(task.attributes?.workplaceType)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className='my-3 flex flex-row'>
              <div className='basis-2/4 text-sm text-gray-600'>
                <div className='basis-2/4 text-sm'>
                  <div className='flex flex-row'>
                    <div className='pr-3 pt-1'>
                      <IoLocationOutline className=' mr-1 inline-block  h-5 w-5' />
                    </div>
                    <div className=''>
                      <div className='pb-1 text-xs uppercase text-gray-500'>
                        Nơi làm việc
                      </div>

                      <div className='text-base text-gray-900'>
                        {task.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-2/6  text-xl font-bold '>
            <div className='flex flex-row-reverse'>
              <div className='w-40 rounded-md bg-gray-100 py-7 text-center text-base'>
                <Currency value={task.budget} currency={task.currency} />
              </div>
            </div>
          </div>
        </div>

        <div className='py-3 text-base'>
          <div className='pb-5 text-base font-semibold uppercase text-gray-800'>
            Nội dung
          </div>
          {task.description}
        </div>
      </div>
    </>
  );
}
