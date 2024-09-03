import { DoneType, TaskStatus } from '../domain/dto';

const viVN: Record<string, string> = {
  [TaskStatus.ACTIVE]: 'Đang mở',
  [TaskStatus.OPEN]: 'Đang mở',
  [TaskStatus.COMPLETED]: 'Đã hoàn thành',
  [DoneType.FLEXIABLE]: 'Linh động',
  [DoneType.BEFORE_DATE]: 'Hoàn thành trước',
};

export default function t(value: Nullable<string>) {
  return viVN[value || ''] || value;
}
