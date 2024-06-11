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
            <div className='my-5 grid grid-cols-12 items-center'>
              <label className='col-span-3 text-sm  text-gray-700'>
                Job title
              </label>
              <div className='col-span-6'>
                <TextAbleEdit
                  placeholder='Job title'
                  onBlur={(value) => setPayload({ ...payload, title: value })}
                  className='w-full'
                  value=''
                />
              </div>
            </div>
            <div className='my-5 grid grid-cols-12 items-center'>
              <label className='col-span-3 text-sm    text-gray-700'>
                Company or product
              </label>
              <div className='col-span-6'>
                <TextAbleEdit
                  placeholder='Product name or Company'
                  onBlur={(value) =>
                    setPayload({ ...payload, productName: value })
                  }
                  className='w-[300px]'
                  value=''
                />
              </div>
            </div>
            <div className='my-5 grid grid-cols-12 items-center'>
              <label className='col-span-3 text-sm    text-gray-700'>
                Employment type
              </label>
              <div className='col-span-4'>
                <SelectInput
                  placeholder='Employment type'
                  onBlur={(value) =>
                    setPayload({ ...payload, employmentType: value as JobType })
                  }
                  values={Object.values(JobType)}
                  className='w-[100px]'
                />
              </div>
            </div>
            <div className='my-5 grid grid-cols-12 items-center'>
              <label className='col-span-3 text-sm    text-gray-700'>
                Start date
              </label>
              <div className='col-span-2'>
                <TextAbleEdit
                  placeholder='YYYY-MM'
                  format={(input: string) => formatDateString(input)}
                  validate={validateDate}
                  onBlur={(value) =>
                    setPayload({ ...payload, startDate: value })
                  }
                  className='w-full text-sm'
                  value=''
                />
              </div>
              <label className='col-span-2 pl-3 text-sm  text-gray-700'>
                End date
              </label>
              <div className='col-span-2'>
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
              <h3 className='mb-2 text-sm  text-gray-700'>Description:</h3>
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
