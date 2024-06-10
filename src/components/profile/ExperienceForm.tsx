/* eslint-disable no-console */
import React from 'react';

import { formatDateString, validateDate } from '@/lib/string';

import ButtonPrimary from '@/components/form/ButtonPrimary';
import SelectInput from '@/components/form/SelectInput';
import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';

import { JobType, ProfileExperienceItem } from '@/domain/dto';

export default function ProfileManager({
  onSubmit,
}: {
  onSubmit?: (payload: ProfileExperienceItem) => unknown;
}) {
  const [payload, setPayload] = React.useState<ProfileExperienceItem>(
    new ProfileExperienceItem()
  );
  return (
    <>
      <div className='my-2 px-2'>
        <div className='my-3 flex items-center'>
          <label className='w-[140px] text-sm   font-semibold text-gray-700'>
            Job title:
          </label>
          <TextAbleEdit
            placeholder='Job title'
            onBlur={(value) => setPayload({ ...payload, title: value })}
            className='text-base font-semibold'
            value=''
          />
        </div>
        <div className='my-3 flex items-center'>
          <label className='w-[140px] text-sm   font-semibold text-gray-700'>
            Employment type:
          </label>
          <SelectInput
            className='pl-1'
            placeholder='Employment type'
            onBlur={(value) =>
              setPayload({ ...payload, employmentType: value as JobType })
            }
            values={Object.values(JobType)}
          />
        </div>
        <div className='my-3 flex items-center'>
          <label className='w-[140px] text-sm   font-semibold text-gray-700'>
            Start date:
          </label>
          <div className=''>
            <TextAbleEdit
              placeholder='YYYY-MM'
              format={(input: string) => formatDateString(input)}
              validate={validateDate}
              onBlur={(value) => setPayload({ ...payload, startDate: value })}
              className='w-[100px] text-sm'
              value=''
            />
          </div>
          <label className='w-[90px] pl-3 text-sm font-semibold text-gray-700'>
            End date:
          </label>
          <div className=''>
            <TextAbleEdit
              placeholder='YYYY-MM'
              format={(input: string) => formatDateString(input)}
              validate={validateDate}
              onBlur={(value) => setPayload({ ...payload, endDate: value })}
              className='w-[100px] text-sm'
              value=''
            />
          </div>
        </div>

        <div className='rounded-md p-2 px-0 '>
          <h3 className='mb-2 text-sm font-semibold text-gray-700'>
            Description:{' '}
          </h3>
          <TextareaAbleEdit
            onBlur={(value) => setPayload({ ...payload, description: value })}
            className='text-sm'
            placeholder='Description about your this position.'
            value=''
          />
        </div>
        <div>
          <ButtonPrimary
            onClick={() => onSubmit && onSubmit(payload)}
            className='py-2'
            name='Add'
          />
        </div>
      </div>
    </>
  );
}
