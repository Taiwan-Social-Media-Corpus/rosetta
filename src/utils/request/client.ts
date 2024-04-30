import { Request, RequestError, ResponseHandler } from 'types/request';
import { API } from '@config';
import { Definition } from '@config/definition';
import { _request } from './base';

let CSRF_TOKEN: string | null = null;

async function fetchCSRF() {
  return _request<any, { csrfToken: string }>(
    { method: 'GET', url: API.user.csrf },
    {
      handleSuccessResponse: async (response) => {
        const csrfToken = response.headers.get(Definition.Header.csrfToken);
        if (!csrfToken) {
          return null;
        }
        return { csrfToken };
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
    const [csrf, csrfError] = await fetchCSRF();
    if (!csrf || csrfError) {
      return [null, csrfError] as
        | readonly [Data, null]
        | readonly [null, RequestError<ErrorReturn>];
    }

    CSRF_TOKEN = csrf.csrfToken;
  }

  const headers = new Headers(args.headers);
  if (shouldIncludeCSRF) {
    headers.set(Definition.Header.csrfToken, CSRF_TOKEN!);
  }

  const result = await _request<Payload, Data, ErrorReturn>({ ...args, headers }, callbacks);
  const error = result[1] as RequestError<{ msg?: string }> | null;
  if (error && error.statusCode === 401 && error.data?.msg === 'JWT expired') {
    const [csrf, csrfError] = await fetchCSRF();
    if (!csrf || csrfError) {
      return [null, csrfError] as
        | readonly [Data, null]
        | readonly [null, RequestError<ErrorReturn>];
    }

    CSRF_TOKEN = csrf.csrfToken;
    const [jwtData, jwtError] = await _request({
      method: 'POST',
      url: API.user.refresh,
      headers: { [`${Definition.Header.csrfToken}`]: CSRF_TOKEN },
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
