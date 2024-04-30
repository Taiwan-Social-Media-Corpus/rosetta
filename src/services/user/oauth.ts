'use server';

import urlJoin from 'url-join';
import { _request } from '@utils/request/base';
import { ResponseData } from 'types/request';
import { API } from '@config';
import { redirect } from 'next/navigation';

export async function getOAuthURL() {
  const url = urlJoin('http://nginx', API.user.authUrl);
  const [data, error] = await _request<{}, ResponseData & { url: string }>({
    url,
    method: 'GET',
  });

  if (!data || error) {
    throw new Error('Failed to get OAuth URL');
  }

  return redirect(data.url);
}
