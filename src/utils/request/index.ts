import { Request, RequestError, ResponseHandler } from 'types/request';
import { API } from '@config';
import { _request } from './base';

// eslint-disable-next-line import/no-mutable-exports
export let CSRF_TOKEN: string | null = null;

async function fetchCSRF() {
  await _request(
    { method: 'GET', url: API.user.csrf },
    {
      handleSuccessResponse: async (response) => {
        const csrfToken = response.headers.get('x-csrf-token');
        CSRF_TOKEN = csrfToken;
      },
    }
  );
}

export async function request<
  Payload extends Record<string, any>,
  Data = unknown,
  ErrorReturn = unknown,
>(
  args: Request<Payload>,
  callbacks?: {
    handleErrorResponse?: ResponseHandler;
    handleSuccessResponse?: ResponseHandler;
  }
): Promise<readonly [Data, null] | readonly [null, RequestError<ErrorReturn>]> {
  const ignoredMethods = ['GET', 'HEAD', 'OPTIONS'];
  const shouldIncludeCSRF = !ignoredMethods.includes(args.method);
  if (shouldIncludeCSRF && CSRF_TOKEN === null) {
    await fetchCSRF();
  }

  if (shouldIncludeCSRF) {
    args.headers = { ...args.headers, 'x-csrf-token': CSRF_TOKEN! };
  }

  const result = await _request<Payload, Data, ErrorReturn>(args, callbacks);
  const error = result[1] as RequestError<{ msg?: string }> | null;
  if (error && error.statusCode === 401 && error.data?.msg === 'JWT expired') {
    await fetchCSRF();
    const [jwtData, jwtError] = await _request({
      method: 'POST',
      url: API.user.refresh,
      headers: { 'x-csrf-token': CSRF_TOKEN! },
    });
    if (!jwtData || jwtError) {
      return [result[0], jwtError as RequestError<ErrorReturn> | null] as
        | readonly [Data, null]
        | readonly [null, RequestError<ErrorReturn>];
    }

    return _request<Payload, Data, ErrorReturn>(args, callbacks);
  }

  return result;
}

export { _request };
