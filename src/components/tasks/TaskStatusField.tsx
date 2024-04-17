import clsx from 'clsx';
import React from 'react';

import t from '@/lib/translate';

import { TaskStatus } from '@/domain/dto';

export default function TaskStatusField({ status }: { status: TaskStatus }) {
  return (
    <div
      className={clsx(
        status === TaskStatus.ACTIVE ? 'text-blue-800' : '',
        status === TaskStatus.OPEN ? 'text-green-600' : '',
        status === TaskStatus.COMPLETED ? 'text-gray-800' : '',
        'inline-block text-sm font-semibold'
      )}
    >
      {t(status)}
    </div>
  );
}
