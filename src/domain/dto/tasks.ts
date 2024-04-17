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

export enum TaskJobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  OTHER = 'other',
  VOLUNTEER = 'volunteer',
  INTERNSHIP = 'internship',
}

export enum TaskWorkplaceType {
  ON_SITE = 'on-site',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
}

export enum TaskWorkingShedule {
  MON_TO_FRI = 'mon-to-fri',
  MON_TO_SAT = 'mon-to-sat',
  FULL_WEEK = 'full-week',
}

export class TaskAttributes {
  workingShedule?: TaskWorkingShedule;

  companyName?: string;

  jobType?: TaskJobType;

  workplaceType?: TaskWorkplaceType;

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
