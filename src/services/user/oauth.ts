'use server';

import urlJoin from 'url-join';
import { _request } from '@utils/request';
import { ResponseData } from 'types/request';
import { API } from '@config';

export async function getOAuthURL() {
  const url = urlJoin('http://nginx', API.user.authUrl);
  const [data, error] = await _request<{}, ResponseData & { url: string }>({
    url,
    method: 'GET',
  });

  if (!data || error) {
    return null;
  }
  return data.url;
}
