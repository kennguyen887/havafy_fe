import clsx from 'clsx';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { getApi, postApi } from '@/lib/request';

import Accent from '@/components/Accent';
import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';
import GoNextButton from '@/components/GoNextButton';

import { SPEECH_COUNTRIES, SPEECH_SPEED, SPEECH_VOICES } from '@/domain/models';

import { useAuthState } from '@/contexts/AuthContext';
import { SelectDto } from '@/domain/dto';

const speeds: SelectDto = SPEECH_SPEED.map((speed) => {
  const code = speed.toString();
  return {
    code,
    name: code,
  };
});

export function TextToSpeech() {
  const { isAuthenticated } = useAuthState();
  const DEFAULT_SPEECH_COUNTRY = 'vi-VN';
  const PRODUCT_SKU = 'TTS-100';
  const DEFAULT_SPEED = 1;
  const MAX_TEXT_LENGTH = 6000;
  const [voices, setVoices] = React.useState<SelectDto>();
  const [voice, setVoice] = React.useState<string>();
  const [text, setText] = React.useState<string>('');
  const [productRemain, setProductRemain] = React.useState<number>();
  const [alert, setAlert] = React.useState<string>();
  const [speechFileUrl, setSpeechFileUrl] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [speed, setSpeed] = React.useState<string>(DEFAULT_SPEED.toString());
  const { executeRecaptcha } = useGoogleReCaptcha();

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
    setVoice(voices[0].code);
  };

  const getProductRemain = () => {
    getApi('product-usage', { skuList: PRODUCT_SKU })
      .then(({ data: { data } }) => {
        if (!data.length) {
          return;
        }
        setProductRemain(
          data.find(
            (item: { sku: string; remainAmount: number }) =>
              item.sku === PRODUCT_SKU
          )?.remainAmount || 0
        );
      })
      .catch((_error) => {
        setProductRemain(undefined);
      });
  };

  const isTextToLong = (): boolean => {
    return text?.length > MAX_TEXT_LENGTH;
  };

  React.useEffect(() => {
    changeLanguage(DEFAULT_SPEECH_COUNTRY);
    getProductRemain();
  }, []);

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!isAuthenticated) {
        Router.push('/user/login');
        return;
      }
      setAlert(undefined);
      setSpeechFileUrl(undefined);
      setLoading(true);

      if (!executeRecaptcha) {
        return;
      }

      const token = await executeRecaptcha();

      if (text.length > 5) {
        const data = await postApi('speech', {
          text,
          voice,
          speed: Number(speed),
          token,
        });

        if (data) {
          setLoading(false);
          if (data.statusCode) {
            setAlert(data.message);
            return;
          }

          if (data.speechFileUrl) {
            setSpeechFileUrl(data.speechFileUrl);
            getProductRemain();
          }
        }
      }
    },
    [isAuthenticated, executeRecaptcha, text, voice, speed]
  );

  return (
    <article className='layout max-w-[820px]'>
      <h1 className='mt-1 text-2xl md:text-4xl 2xl:text-5xl' data-fade='1'>
        <Accent>
          Text to Speech Voice Over
          <br />
          with Realistic AI Voices
        </Accent>
      </h1>
      <p className='mb-8 mt-5 text-xs text-gray-500' data-fade='2'>
        Murf offers a selection of 100% natural sounding AI voices in 60
        languages to make professional voice over for your videos and
        presentations.
      </p>
      <form onSubmit={submitForm} noValidate>
        <Alert content={alert} hidden={!alert} />
        <div className='mb-4 grid grid-cols-4 gap-2' data-fade='2'>
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
              <select
                onChange={(value) => setVoice(value.target.value)}
                className='block w-full rounded-lg border-gray-200 px-2 py-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600'
              >
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
          <div
            className={clsx(isAuthenticated && productRemain ? '' : 'hidden')}
          >
            <div className='text-xs font-semibold'>Your Remain</div>
            <div className='mt-4 text-sm'>
              {productRemain?.toLocaleString()} chars
            </div>
          </div>
        </div>
        <div className='relative' data-fade='3'>
          <textarea
            onChange={(data) => setText(data.target.value)}
            id='message'
            rows={6}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Write your thoughts here...'
          ></textarea>
          <div
            className={clsx(
              'absolute right-0 -mt-6 mr-2 text-sm',
              isTextToLong() ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {text?.length}/{MAX_TEXT_LENGTH}
          </div>
        </div>
        <div className='mt-3 flex' data-fade='4'>
          <PrimaryButton
            className='h-12'
            name={isAuthenticated ? `Speech` : 'Login to speech'}
            isLoading={loading}
          />

          <Link
            className='ml-6 pt-4 text-sm font-semibold text-gray-300'
            href={`/checkout?skuList=${PRODUCT_SKU}`}
          >
            <GoNextButton name=' Buy 1 milion characters only USD$9' />
          </Link>
        </div>
        <div className='mt-4'>
          {speechFileUrl ? (
            <span className='h-5'>
              <audio controls autoPlay>
                <source src={speechFileUrl} type='audio/mpeg' />
              </audio>
            </span>
          ) : (
            <></>
          )}
        </div>
      </form>
    </article>
  );
}

export default function TextToSpeechWrap() {
  return (
    <div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY || ''}
        scriptProps={{
          async: false,
          defer: true,
          appendTo: 'body',
          nonce: undefined,
        }}
      >
        <TextToSpeech />
      </GoogleReCaptchaProvider>
    </div>
  );
}
