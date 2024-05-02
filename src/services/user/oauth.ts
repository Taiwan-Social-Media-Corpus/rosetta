'use server';

import { _request } from '@utils/request/base';
import { ResponseData } from 'types/request';
import { serverUrl, API } from '@config';
import { redirect } from 'next/navigation';

export async function getOAuthURL() {
  const [data, error] = await _request<any, ResponseData & { url: string }>({
    url: serverUrl(API.user.authUrl),
    method: 'GET',
  });

  if (!data || error) {
    throw new Error('Failed to get OAuth URL');
  }

  return redirect(data.url);
}
