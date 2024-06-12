import { Avatar } from '@material-tailwind/react';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

import { getApi, postApi, putApi } from '@/lib/request';

import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';
import ExperienceForm from '@/components/profile/ExperienceForm';

import {
  CreateProfileReqDto,
  GetProfileDetailDto,
  ProfileExperienceItem,
} from '@/domain/dto';

export default function ProfileManager() {
  const [profile, setProfile] = React.useState<GetProfileDetailDto>();

  const getProfile = React.useCallback(async () => {
    try {
      const profileRes = await getApi('profiles');
      if (profileRes) {
        setProfile(profileRes.data);
      }
    } catch (e) {
      await postApi('profiles', {});
      const profileRes = await getApi('profiles');
      if (profileRes) {
        setProfile(profileRes.data);
      }
    }
  }, []);

  const onSubmitExperienceForm = async (payload: ProfileExperienceItem) => {
    if (!profile) return;
    await putApi(`profiles/${profile.id}`, {
      experience: {
        data: [...(profile?.experience?.data ?? []), payload],
      },
      id: profile.id,
    });

    await getProfile();

    (document?.getElementById('ExperienceForm') as HTMLDialogElement).close();
  };

  const putProfile = async (payload: CreateProfileReqDto) => {
    if (!profile) return;
    await putApi(`profiles/${profile.id}`, { ...payload, id: profile.id });
  };

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <div className='my-2'>
        <div className='flex'>
          <Avatar
            src='https://docs.material-tailwind.com/img/face-2.jpg'
            alt='avatar'
            size='xxl'
          />
          <div className='mb-3 pl-7'>
            <TextAbleEdit
              placeholder='Set your name'
              onBlur={(value) => putProfile({ fullname: value })}
              className='w-[300px] text-base  font-semibold'
              value={profile?.fullname ?? ''}
            />
            <div className='mt-2'>
              <TextAbleEdit
                onBlur={(value) => putProfile({ title: value })}
                className='w-[300px] text-sm'
                placeholder='Write a headline'
                value={profile?.title ?? ''}
              />
            </div>
            <div className='mt-2'>
              <TextAbleEdit
                onBlur={(value) => putProfile({ city: value })}
                className='w-[100px] text-sm'
                placeholder='Country/City'
                value={profile?.city ?? ''}
              />
            </div>
          </div>
        </div>

        <div className='ml-2 mt-3 rounded-md p-2 px-3 '>
          <h3 className='mb-2 text-lg font-semibold'>About</h3>
          <TextareaAbleEdit
            placeholder='Your years of experience, industry, or skills'
            onBlur={(value) => putProfile({ about: value })}
            className='ml-2 text-sm '
            value={profile?.about ?? ''}
          />
        </div>

        <div className='mt-3 rounded-md  px-3'>
          <div className='flex items-center justify-between'>
            <h3 className='mb-2 ml-2 text-lg font-semibold'>Experiences</h3>
            <button
              onClick={() =>
                (
                  document?.getElementById(
                    'ExperienceForm'
                  ) as HTMLDialogElement
                ).showModal()
              }
              className='-mt-2 mr-4'
            >
              <IoMdAdd className='h-7 w-7' />
            </button>
          </div>

          <ExperienceForm
            onSubmit={(paypload) => onSubmitExperienceForm(paypload)}
          />

          <div className='mt-5 px-3'>
            {profile?.experience?.data?.map((item, key) => (
              <div
                key={key}
                className='border-y border-t-0 border-gray-300 py-3'
              >
                <h4 className='text-base'>{item.title}</h4>
                <div className='my-2 flex space-x-3 text-sm text-gray-600'>
                  <div className=''>{item.productName}</div>
                  <div>-</div>
                  <div className=''>{item.employmentType}</div>
                </div>
                <div className='text-sm text-gray-900'>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
