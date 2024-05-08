'use server';

import { serverUrl, API } from '@config';
import { serverRequest } from '@utils/request/server';
import { ResponseData } from 'types/request';
import { PickAsOrNull } from 'types';
import { ConcordanceFormValue } from '@views/Corpus/Home/Form/schema';

type Payload = PickAsOrNull<ConcordanceFormValue, 'media' | 'boards' | 'postType'> & {
  page: number;
};

export async function getConcordance(payload: Payload) {
  const [data, error] = await serverRequest<Payload, ResponseData<any>>({
    url: serverUrl(API.corpus.concordance),
    method: 'POST',
    payload,
    headers: { 'Content-Type': 'application/json' },
  });
  if (!data || error) {
    return [null, error.data];
  }
  return [data.data, null];
}
