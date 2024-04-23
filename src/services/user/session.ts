import useSWR from 'swr';
import { _request, request } from '@utils/request';
import { User } from 'types';
import { ResponseData } from 'types/request';
import { API } from '@config';

export function getOAuthURL() {
  return _request<{}, ResponseData & { url: string }>({
    url: API.user.authUrl,
    method: 'GET',
  });
}

export function getSession() {
  return request<{}, ResponseData<User>>({
    url: API.user.sessions,
    method: 'GET',
  });
}

export function deleteSession() {
  return request<{}, ResponseData>({
    url: API.user.sessions,
    method: 'DELETE',
  });
}

export function useSession() {
  return useSWR(API.user.sessions, getSession);
}
