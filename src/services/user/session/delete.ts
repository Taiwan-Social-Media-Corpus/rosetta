'use server';

import { serverRequest } from '@utils/request';
import { ResponseData } from 'types/request';
import { serverUrl, API } from '@config';

export async function deleteSession() {
  return serverRequest<any, ResponseData>({
    url: serverUrl(API.user.sessions),
    method: 'DELETE',
  });
}
