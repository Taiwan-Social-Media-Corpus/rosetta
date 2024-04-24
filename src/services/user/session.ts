import useSWR from 'swr';
import { request } from '@utils/request';
import { User } from 'types';
import { ResponseData } from 'types/request';
import { API } from '@config';

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
