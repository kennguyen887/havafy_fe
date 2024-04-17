import {
  DoneType,
  TaskJobType,
  TaskStatus,
  TaskWorkplaceType,
} from '../domain/dto';

const viVN: Record<string, string> = {
  [TaskStatus.ACTIVE]: 'Đang mở',
  [TaskStatus.OPEN]: 'Đang mở',
  [TaskStatus.COMPLETED]: 'Đã hoàn thành',
  [TaskJobType.FULL_TIME]: 'Toàn thời gian',
  [TaskWorkplaceType.REMOTE]: 'Làm online',
  [TaskWorkplaceType.ON_SITE]: 'Tại văn phòng',
  [DoneType.FLEXIABLE]: 'Linh động',
  [DoneType.BEFORE_DATE]: 'Hoàn thành trước',
};

export default function t(value: Nullable<string>) {
  return viVN[value || ''] || value;
}
