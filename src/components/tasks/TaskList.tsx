import React from 'react';

import { getApi } from '@/lib/request';

import { GetTaskListItemDto } from '@/domain/dto';

import TaskStatusField from './TaskStatusField';
import Currency from '../common/Currency';
import SearchInput from '../search/SearchInput';
import CategoryFilter from '../search/SearchInput';

export default function TaskList() {
  const [tasks, setTasks] = React.useState<GetTaskListItemDto[]>([]);
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
        <div className='basis-2/4'>
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
                <div className='basis-1/6 font-semibold'>
                  <Currency value={task.budget} currency={task.currency} />
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='basis-1/4  text-sm'>{task.doneType}</div>
                <div className='basis-1/4  text-sm'>{task.location}</div>
              </div>
              <TaskStatusField status={task.status} />
            </div>
          ))}
        </div>
        <div className='basis-2/4'>
          <div className='min-h-full rounded-md bg-white'></div>
        </div>
      </div>
    </div>
  );
}
