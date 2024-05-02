'use server';

import { serverUrl, API } from '@config';
import { serverRequest } from '@utils/request/server';
import { ResponseData } from 'types/request';

export async function getBoards(): Promise<
  readonly [{ [key: string]: string[] }, null] | readonly [null, any]
> {
  const [data, error] = await serverRequest<any, ResponseData<{ [key: string]: string[] }>>({
    url: serverUrl(API.corpus.boards),
    method: 'GET',
  });

  if (!data || error) {
    return [null, error.data];
  }

  return [data.data, null];
}
