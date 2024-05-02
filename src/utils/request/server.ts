'use server';

import { Request, RequestError, ResponseHandler } from 'types/request';
import { serverUrl, API } from '@config';
import { Definition } from '@config/definition';
import { cookies } from 'next/headers';
import { cookieOptions } from '@config/cookie';
import { _request } from './base';

let CSRF_TOKEN: string | null = null;

function getCookieValue(header: string | null, cookieName: string) {
  const regex = new RegExp(`${cookieName}=([^;]+)`);
  if (!header) return null;
  const match = header.match(regex);
  return match ? match[1] : null;
}

async function fetchCSRF() {
  return _request<any, { csrfToken: string; csrfCookie: string }>(
    { method: 'GET', url: serverUrl(API.user.csrf) },
    {
      handleSuccessResponse: async (response) => {
        const csrfToken = response.headers.get(Definition.Header.csrfToken);
        const csrfCookie = getCookieValue(
          response.headers.get(Definition.Header.setCookie),
          Definition.Cookies.csrf
        );
        if (!csrfToken || !csrfCookie) {
          return null;
        }
        return { csrfToken, csrfCookie };
      },
    }
  );
}

export async function serverRequest<
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
  const cookieStore = cookies();
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
    cookieStore.set({
      name: Definition.Cookies.csrf,
      value: csrf.csrfCookie,
      ...cookieOptions,
      expires: undefined,
    });
  }

  const headers = new Headers(args.headers);
  if (shouldIncludeCSRF) {
    headers.set(Definition.Header.csrfToken, CSRF_TOKEN!);
  }
  headers.set(Definition.Header.cookie, cookieStore.toString());

  const result = await _request<Payload, Data, ErrorReturn>({ ...args, headers }, callbacks);
  const error = result[1] as RequestError<{ msg?: string }> | null;
  if (error && error.statusCode === 401 && error.data?.msg === 'JWT expired') {
    const [csrf, csrfError] = await fetchCSRF();
    if (!csrf || csrfError) {
      return [null, csrfError as RequestError<ErrorReturn> | null] as
        | readonly [Data, null]
        | readonly [null, RequestError<ErrorReturn>];
    }
    CSRF_TOKEN = csrf.csrfToken;
    cookieStore.set({
      name: Definition.Cookies.csrf,
      value: csrf.csrfCookie,
      ...cookieOptions,
      expires: undefined,
    });
    headers.set(Definition.Header.cookie, cookieStore.toString());
    headers.set(Definition.Header.csrfToken, CSRF_TOKEN);
    const [jwtData, jwtError] = await _request(
      {
        method: 'POST',
        url: serverUrl(API.user.refresh),
        headers,
      },
      {
        handleSuccessResponse: async (jwtResponse) => {
          const authToken = getCookieValue(
            jwtResponse.headers.get(Definition.Header.setCookie),
            Definition.Cookies.authToken
          );
          const sig = getCookieValue(
            jwtResponse.headers.get(Definition.Header.setCookie),
            Definition.Cookies.authTokenSig
          );
          if (!authToken || !sig) {
            return null;
          }
          cookieStore.set({
            name: Definition.Cookies.authToken,
            value: authToken,
            ...cookieOptions,
          });
          cookieStore.set({
            name: Definition.Cookies.authTokenSig,
            value: sig,
            ...cookieOptions,
          });
          return jwtResponse.json();
        },
      }
    );
    if (!jwtData || jwtError) {
      return [result[0], jwtError as RequestError<ErrorReturn> | null] as
        | readonly [Data, null]
        | readonly [null, RequestError<ErrorReturn>];
    }

    headers.set(Definition.Header.cookie, cookieStore.toString());
    headers.set(Definition.Header.csrfToken, CSRF_TOKEN);
    return _request<Payload, Data, ErrorReturn>({ ...args, headers }, callbacks);
  }
  return result;
}
