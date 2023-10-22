import axios from 'axios';

import { useFetchToken } from '@/lib/authToken'

export async function usePost(apiPath: string, payload: unknown) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}/${apiPath}`,
      payload,
      {
        headers: {
          'Authorization': 'Bearer ' + useFetchToken()
        },
      }
    );

    return res.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

