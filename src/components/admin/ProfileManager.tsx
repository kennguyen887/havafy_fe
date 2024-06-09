/* eslint-disable no-console */
import { Avatar } from '@material-tailwind/react';
import React from 'react';

import { getApi, postApi, putApi } from '@/lib/request';

import TextAbleEdit from '@/components/form/TextAbleEdit';
import TextareaAbleEdit from '@/components/form/TextareaAbleEdit';
import ExperienceForm from '@/components/profile/ExperienceForm';

import { CreateProfileReqDto, GetProfileDetailDto } from '@/domain/dto';

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
          <div className='pl-7'>
            <TextAbleEdit
              placeholder='Set your name'
              onBlur={(value) => putProfile({ fullname: value })}
              className='text-xl font-semibold'
              value={profile?.fullname ?? ''}
            />
            <div className=''>
              <TextAbleEdit
                onBlur={(value) => putProfile({ title: value })}
                className='text-base'
                placeholder='Write a headline'
                value={profile?.title ?? ''}
              />
            </div>
            <div className='mt-2'>
              <TextAbleEdit
                onBlur={(value) => putProfile({ city: value })}
                className='text-sm'
                placeholder='Country/City'
                value={profile?.city ?? ''}
              />
            </div>
          </div>
        </div>

        <div className='mt-3 rounded-md bg-gray-100 p-2 px-3'>
          <h3 className='mb-2 ml-2 text-lg font-semibold'>About</h3>
          <TextareaAbleEdit
            placeholder='Your years of experience, industry, or skills'
            onBlur={(value) => putProfile({ about: value })}
            className='text-sm'
            value={profile?.about ?? ''}
          />
        </div>

        <div className='mt-3 rounded-md bg-gray-100 p-2 px-3'>
          <h3 className='mb-2 ml-2 text-lg font-semibold'>Experiences</h3>
          <ExperienceForm />
        </div>
      </div>
    </>
  );
}
