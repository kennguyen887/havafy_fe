/* eslint-disable unused-imports/no-unused-vars */
import clsx from 'clsx';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

import { formatDateString, validateDate } from '@/lib/string';

import ButtonPrimary from '@/components/form/ButtonPrimary';
import SelectInput from '@/components/form/SelectInput';
import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';

import { JobType, ProfileExperienceItem } from '@/domain/dto';

export default function ExperienceForm({
  onSubmit,
}: {
  onSubmit?: (payload: ProfileExperienceItem) => unknown;
}) {
  const [index, setIndex] = React.useState();
  const [payload, setPayload] = React.useState<ProfileExperienceItem>(
    new ProfileExperienceItem()
  );
  return (
    <>
      <dialog id='ExperienceForm' className='modal'>
        <div className='modal-box relative w-9/12 max-w-2xl'>
          <div className='absolute right-4 top-1'>
            <h3 className='text-lg font-bold'></h3>
            <form method='dialog'>
              <button
                className={clsx(
                  'hover:text-gray-950 group btn m-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent'
                )}
              >
                <IoMdClose className='h-8 w-8 text-gray-400 group-hover:text-gray-700' />
              </button>
            </form>
          </div>

          <div className=''>
            <div className='my-5 flex items-center'>
              <label className='w-[140px] text-sm   font-semibold text-gray-700'>
                Job title:
              </label>
              <TextAbleEdit
                placeholder='Job title'
                onBlur={(value) => setPayload({ ...payload, title: value })}
                className='w-[300px]'
                value=''
              />
            </div>
            <div className='my-5 flex items-center'>
              <label className='w-[140px] text-sm   font-semibold text-gray-700'>
                Employment type:
              </label>
              <SelectInput
                placeholder='Employment type'
                onBlur={(value) =>
                  setPayload({ ...payload, employmentType: value as JobType })
                }
                values={Object.values(JobType)}
              />
            </div>
            <div className='my-5 flex items-center'>
              <label className='w-[140px] text-sm   font-semibold text-gray-700'>
                Start date:
              </label>
              <div className=''>
                <TextAbleEdit
                  placeholder='YYYY-MM'
                  format={(input: string) => formatDateString(input)}
                  validate={validateDate}
                  onBlur={(value) =>
                    setPayload({ ...payload, startDate: value })
                  }
                  className='w-[105px] text-sm'
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
                  className='w-[105px] text-sm'
                  value=''
                />
              </div>
            </div>

            <div className='rounded-md p-2 px-0 '>
              <h3 className='mb-2 text-sm font-semibold text-gray-700'>
                Description:
              </h3>
              <TextareaAbleEdit
                onBlur={(value) =>
                  setPayload({ ...payload, description: value })
                }
                className='h-28 text-sm'
                placeholder='Description about your this position.'
                value=''
              />
            </div>
            <div className='mt-4'>
              <ButtonPrimary
                onClick={() => onSubmit && onSubmit(payload)}
                className='py-2'
                name='Add'
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
