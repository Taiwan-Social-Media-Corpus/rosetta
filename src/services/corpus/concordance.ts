'use client';

import useSWR from 'swr';
import { ConcordanceData } from 'types/corpus';
import { ResponseData } from 'types/request';
import { API } from '@config';
import { request } from '@utils/request';

export type ErrorResponse = {
  status: 'failed';
  msg: string | { code: string; message: string };
};

export function getConcordance(page: number, e: string) {
  return useSWR(
    API.corpus.concordance,
    async (url) =>
      request<{}, ResponseData<ConcordanceData>, ErrorResponse>({
        url: `${url}?e=${e}&page=${page}`,
        method: 'GET',
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
