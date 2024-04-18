import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaFileContractSolid } from 'react-icons/lia';
import { TbProgress } from 'react-icons/tb';

import { getApi } from '@/lib/request';
import t from '@/lib/translate';

import { GetTaskListItemDto } from '@/domain/dto';

import TaskDetail from './TaskDetail';
import TaskStatusField from './TaskStatusField';
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
      <div className='layout grid grid-cols-12 pt-3'>
        <div className='col-start-1 col-end-5'>
          {tasks.map((task) => (
            <div
              onClick={() => goTaskDetail(task.id)}
              key={task.id}
              className='mb-2 mr-3 rounded-md bg-white px-3 py-3 hover:cursor-pointer hover:bg-gray-100'
            >
              <div className='mb-2 flex flex-row'>
                <div className='basis-5/6 text-base text-gray-900'>
                  {task.title}
                </div>
                <div className='basis-1/6 text-right font-semibold'>
                  <Currency value={task.budget} currency={task.currency} />
                </div>
              </div>
              <div className='my-3 flex flex-row text-gray-600'>
                <div className='basis-2/4 text-sm'>
                  <FaRegClock className='mr-1 inline-block' />{' '}
                  {t(task.doneType)}
                </div>
                {task.attributes?.workplaceType ? (
                  <div className='basis-2/4 text-sm'>
                    <LiaFileContractSolid className='mr-1 inline-block' />{' '}
                    {t(task.attributes?.workplaceType)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className='my-3 flex flex-row'>
                <div className='basis-2/4 text-sm'>
                  <TbProgress className='mr-1 inline-block' />{' '}
                  <TaskStatusField status={task.status} />
                </div>
                <div className='basis-2/4 text-sm text-gray-600'>
                  <IoLocationOutline className='mr-1 inline-block' />
                  {task.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='col-start-5 col-end-12'>
          <div className='min-h-full rounded-md bg-white'>
            <TaskDetail task={taskDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
