import qs from 'qs';
import { Request, ResponseHandler, RequestError, HTTPMethods } from 'types/request';

export async function _request<
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
  const controller = new AbortController();
  let timer: NodeJS.Timeout | null = null;

  const { url, method, payload, headers, query, queryOptions, urlParams, timeout = 30 } = args;
  const { handleErrorResponse = handleResponse, handleSuccessResponse = handleResponse } =
    callbacks || {};

  const body = constructBody(payload, method);
  const requestURL = constructURL({ url, query, method, queryOptions, urlParams });

  try {
    timer = setTimeout(() => {
      controller.abort();
    }, timeout * 1000);

    const response = await fetch(requestURL, {
      method,
      body,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const data = await handleErrorResponse(response);

      throw new RequestError({
        message: `Request failed: ${method} ${requestURL} returned a status code of ${response.status}`,
        statusCode: response.status,
        data,
        url: requestURL,
        method,
        headers: convertHeader(response.headers),
        timestamp: Date.now(),
      });
    }

    clearTimeout(timer);

    const data = await handleSuccessResponse(response);

    return [data as Data, null] as const;
  } catch (e) {
    if (timer) {
      clearTimeout(timer);
    }

    if (e instanceof Error) {
      if (e.name === 'AbortError') {
        // eslint-disable-next-line no-ex-assign
        e = new RequestError({
          message: `Request timeout: ${method} ${requestURL} did not respond within ${timeout} second(s)`,
          data: { timeout: { seconds: timeout } },
          url,
          method,
          timestamp: Date.now(),
        });
      }
    }

    return [null, e as RequestError<ErrorReturn>] as const;
  }
}

export const handleResponse: ResponseHandler = async (response) => {
  let data: any;

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return data;
};

export function constructBody<T extends Record<string, any>>(
  payload: T | undefined,
  method: HTTPMethods
) {
  const p = payload || {};

  if (method === 'GET' || Object.keys(p).length === 0) {
    return undefined;
  }

  return JSON.stringify(p);
}

export function populateParams(url: string, params: { [key: string]: string | number }) {
  const urls = url.split('/');
  for (let i = 0; i < urls.length; i += 1) {
    const path = urls[i];
    if (path.startsWith(':')) {
      const key = path.slice(1);
      const value = params[key] ?? '';
      urls[i] = encodeURIComponent(value);
    }
  }

  return urls.join('/');
}

export function constructURL<T extends Record<string, any>>(args: {
  url: string;
  query?: T | undefined;
  method: HTTPMethods;
  queryOptions?: qs.IStringifyOptions;
  urlParams?: Record<string, any>;
}) {
  const { url, query, method, queryOptions, urlParams } = args;

  let requestURL = url;

  if (urlParams) {
    requestURL = populateParams(requestURL, urlParams);
  }

  if (method === 'GET' && query && Object.keys(query).length > 0) {
    return `${requestURL}?${qs.stringify(query, queryOptions)}`;
  }

  return requestURL;
}

export function convertHeader(headers: Headers): Record<string, string[]> {
  const headerObject: Record<string, string[]> = {};

  headers.forEach((value, key) => {
    headerObject[key] = [value];
  });

  return headerObject;
}
