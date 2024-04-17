import clsx from 'clsx';
import React from 'react';

import { TaskStatus } from '@/domain/dto';

export default function TaskStatusField({ status }: { status: TaskStatus }) {
  return (
    <div
      className={clsx(
        status === TaskStatus.ACTIVE ? 'text-green-600' : '',
        'text-base font-semibold'
      )}
    >
      {status}
    </div>
  );
}
