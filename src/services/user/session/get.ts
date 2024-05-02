'use server';

import { serverRequest } from '@utils/request';
import { User } from 'types';
import { ResponseData } from 'types/request';
import { serverUrl, API } from '@config';
import { Definition } from '@config/definition';
import { cookies } from 'next/headers';

export async function getSession(): Promise<readonly [User, null] | readonly [null, any]> {
  const cookieStore = cookies();
  const [data, error] = await serverRequest<{}, ResponseData<User>>({
    url: serverUrl(API.user.sessions),
    method: 'GET',
  });

  if (!data || error) {
    const fields = [Definition.Cookies.authToken, Definition.Cookies.authTokenSig];
    for (const field of fields) {
      cookieStore.delete(field);
    }
    return [null, error.data];
  }

  return [data.data, null];
}
