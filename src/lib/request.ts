import axios from 'axios';

export async function post(apiPath: string, payload: unknown) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiPath}`,
    payload,
    {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      validateStatus: function (status) {
        return [400, 201, 200].includes(status);
      },
    }
  );
  return res.data;
}
