import Link from 'next/link';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';

import { getApi } from '@/lib/request';
import t from '@/lib/translate';

import { GetTaskListItemDto } from '@/domain/dto';

import TaskDetail from './TaskDetail';
import Currency from '../common/Currency';
import SearchInput from '../search/SearchInput';
import CategoryFilter from '../search/SearchInput';

export default function TaskList() {
  const [tasks, setTasks] = React.useState<GetTaskListItemDto[]>([]);
  const [taskDetail, setTaskDetail] = React.useState<GetTaskListItemDto>();
  const getTaskList = () => {
    getApi('tasks', {}).then(({ data: { data } }) => {
      if (!data.length) {
        return;
      }
      setTasks(data);
    });
  };

  const goTaskDetail = (id: string) => {
    // Router.push(`/tasks/${id}/detail`, undefined, {shallow:true})
    window.history.replaceState(null, '', `/tasks/${id}/detail`);
    setTaskDetail(tasks.find((task) => task.id === id));
  };
  React.useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div className=''>
      <div className='border-0 border-b border-t border-solid border-gray-100 bg-white'>
        <div className='layout py-3'>
          <div className='grid grid-cols-4 gap-2'>
            <SearchInput />
            <CategoryFilter />
          </div>
        </div>
      </div>
      <div className='layout flex flex-row pt-3'>
        <div className='max-w-lg basis-1/2'>
          {tasks.map((task) => (
            <div
              onClick={() => goTaskDetail(task.id)}
              key={task.id}
              className='mb-2 mr-3 rounded-md bg-white px-3 py-3 hover:cursor-pointer hover:bg-gray-100'
            >
              <div className='mb-2 flex flex-row'>
                <div className='basis-5/6 text-base font-semibold text-sky-800'>
                  <Link
                    href={`/tasks/${task.id}/detail`}
                    onClick={(event) => {
                      event.preventDefault();
                      goTaskDetail(task.id);
                      return false;
                    }}
                  >
                    {task.title}
                  </Link>
                </div>
                <div className='basis-1/6 text-right text-sm font-semibold'>
                  <Currency value={task.budget} currency={task.currency} />
                </div>
              </div>
              <div className='my-3 flex flex-row text-gray-600'>
                <div className='basis-2/4 text-sm'>
                  {task.attributes?.workplaceType ? (
                    <div className='basis-2/4 text-sm'>
                      <LiaFileContractSolid className='mr-1 inline-block' />{' '}
                      {t(task.attributes?.workplaceType)}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className='basis-2/4 text-sm text-gray-600'>
                  <IoLocationOutline className='mr-1 inline-block' />
                  {task.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='max-w-2xl'>
          <div className='min-h-full rounded-md bg-white'>
            <TaskDetail task={taskDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
