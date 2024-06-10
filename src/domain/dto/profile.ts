import { JobType, WorkplaceType } from '.';

export enum ProfileStatus {
  DRAFT = 'draft',
  FOR_REVIEW = 'for_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ProfileType {
  BACKEND_DEVELOPER = 'backend_developer',
  FRONTEND_DEVELOPER = 'fontend_developer',
  FULL_STACK_DEVELOPER = 'full_stack_developer',
  APP_DEVELOPER = 'app_developer',
  QA = 'QA',
  DESIGNER = 'designer',
  MARKETER = 'marketer',
  DEVOPS_ENGINEER = 'devops_engineer',
  DATA_ENGINEER = 'data_engineer',
  AI_DEVELOPER = 'ai_developer',
  AGENCY = 'agency',
  OTHER = 'other',
}

export enum ExpectedRatePer {
  HOUR = 'hour',
  MAN_DAY = 'man_day',
  MONTH = 'month',
}

export class ProfileExperienceItem {
  title!: string;

  employmentType!: JobType;

  description!: string;

  startDate!: string;

  endDate?: string;
}

export class ProfileCertificationItem {
  title!: string;

  description!: string;

  startDate!: Date;

  endDate?: Date;
}

export class ProfileProjectItem {
  title!: string;

  description!: string;

  startDate!: Date;

  endDate?: Date;
}

export class ProfileSkillItem {
  name!: string;

  level?: number;
}

export class ProfileLanguageItem {
  languageCode!: string;

  level!: number;
}

export class ProfileExperience {
  data!: ProfileExperienceItem[];
}

export class ProfileCertifications {
  data!: ProfileCertificationItem[];
}

export class ProfileProjects {
  data!: ProfileProjectItem[];
}

export class ProfileSkills {
  data!: ProfileSkillItem[];
}

export class ProfileLanguages {
  data!: ProfileLanguageItem[];
}

export class ProfileContact {
  email!: string;

  website?: string;

  linkedinUrl?: string;

  bookingUrl?: string;

  phoneNumber?: string;

  githubUrl?: string;
}

export class ProfileAttributes {
  tags?: string[];

  skills?: string[];
}

export class CreateProfileReqDto {
  title?: string;

  about?: string;

  fullname?: string;

  type?: ProfileType;

  workplaceTypes?: WorkplaceType[];

  jobTypes?: JobType[];

  attributies?: ProfileAttributes;

  experienceYear?: number;

  countryCode?: string;

  city?: string;

  expectedRate?: number;

  expectedRatePer?: ExpectedRatePer;

  experience?: ProfileExperience;

  certifications?: ProfileCertifications;

  projects?: ProfileProjects;

  skills?: ProfileSkills;

  languages?: ProfileLanguages;

  contact?: ProfileContact;
}

export class GetProfileDetailDto {
  id!: string;

  userId!: string;

  fullname!: string;

  verified!: boolean;

  title!: Nullable<string>;

  about!: string;

  type!: ProfileType;

  reviewRate!: number;

  workplaceTypes!: WorkplaceType[];

  jobTypes!: JobType[];

  attributies!: ProfileAttributes;

  experienceYear!: number;

  countryCode!: string;

  city!: string;

  expectedRate!: number;

  expectedRatePer!: ExpectedRatePer;

  experience!: ProfileExperience;

  certifications!: ProfileCertifications;

  projects!: ProfileProjects;

  skills!: ProfileSkills;

  languages!: ProfileLanguages;

  contact!: ProfileContact;

  status!: ProfileStatus;

  attributes!: ProfileAttributes;
}
