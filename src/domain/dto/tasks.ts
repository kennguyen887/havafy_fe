import { JobType, WorkingShedule, WorkplaceType } from './job';

export enum TaskStatus {
  DRAFT = 'draft',
  FOR_REVIEW = 'for_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  OPEN = 'open',
}

export enum DoneType {
  FLEXIABLE = 'flexiable',
  BEFORE_DATE = 'before_date',
  ON_DATE = 'on_date',
}

export enum TaskCurrency {
  USD = 'USD',
  VND = 'VND',
  SGD = 'SGD',
}
export class TaskAttributes {
  workingShedule?: WorkingShedule;

  companyName?: string;

  jobType?: JobType;

  workplaceType?: WorkplaceType;

  tags?: string[];

  skills?: string[];
}

export class GetTaskListItemDto {
  id!: string;

  userId!: string;

  title!: string;

  description!: string;

  budget!: number;

  status!: TaskStatus;

  currency!: string;

  doneAt!: Nullable<Date>;

  doneType!: Nullable<DoneType>;

  location!: Nullable<string>;

  attributes!: TaskAttributes;
}
