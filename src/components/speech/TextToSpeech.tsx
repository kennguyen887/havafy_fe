import React from 'react';

import Accent from '@/components/Accent';
import PrimaryButton from '@/components/form/PrimaryButton';

import { SPEECH_COUNTRIES, SPEECH_SPEED, SPEECH_VOICES } from '@/domain/models';

import { SelectDto } from '@/domain/dto';

const speeds: SelectDto = SPEECH_SPEED.map((speed) => {
  const code = speed.toString();
  return {
    code,
    name: code,
  };
});

export default function TextToSpeech() {
  const DEFAULT_SPEECH_COUNTRY = 'vi-VN';
  const DEFAULT_SPEED = 1;
  const [voices, setVoices] = React.useState<SelectDto>();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [speed, setSpeed] = React.useState<string>(DEFAULT_SPEED.toString());

  const changeLanguage = (languageCode: string) => {
    const voices = SPEECH_VOICES.filter((voice) =>
      voice.languageCodes?.includes(languageCode)
    ).map((voice) => {
      const voiceName = voice.name.split('-');
      return {
        code: voice.name,
        name: `${voiceName[2]} ${voiceName[3]} `,
      };
    });
    setVoices(voices);
  };
  React.useEffect(() => {
    changeLanguage(DEFAULT_SPEECH_COUNTRY);
  }, []);
  return (
    <article className='layout max-w-2xl'>
      <h1 className='mt-1 text-2xl md:text-4xl 2xl:text-5xl' data-fade='2'>
        <Accent>
          Text to Speech Voice Over
          <br />
          with Realistic AI Voices
        </Accent>
      </h1>
      <p className='mb-8 mt-5 text-sm text-gray-500' data-fade='3'>
        Murf offers a selection of 100% natural sounding AI voices in 20
        languages to make professional voice over for your videos and
        presentations. Start your free trial.
      </p>
      <form>
        <div className='mb-4 grid grid-cols-3  gap-4'>
          <div>
            <div className='text-xs font-semibold'>Languages</div>
            <div className='mt-2'>
              <select
                onChange={(value) => changeLanguage(value.target.value)}
                defaultValue={DEFAULT_SPEECH_COUNTRY}
                className='block w-full rounded-lg border-gray-200 px-2 py-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600'
              >
                {SPEECH_COUNTRIES.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className='text-xs font-semibold'>Voices</div>
            <div className='mt-2'>
              <select className='block w-full rounded-lg border-gray-200 px-2 py-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600'>
                {voices?.map((voice) => (
                  <option value={voice.code} key={voice.code}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className='text-xs font-semibold'>Speed</div>
            <div className='mt-2'>
              <select
                defaultValue={DEFAULT_SPEED}
                onChange={(value) => setSpeed(value.target.value)}
                className='max-w-12 block rounded-lg border-gray-200 px-2 py-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600'
              >
                {speeds?.map((speed) => (
                  <option value={speed.code} key={speed.code}>
                    {speed.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <textarea
          id='message'
          rows={6}
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Write your thoughts here...'
        ></textarea>
        <div className='mt-3'>
          <PrimaryButton name='Speech now' />
        </div>
      </form>
    </article>
  );
}
