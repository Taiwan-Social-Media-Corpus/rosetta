'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { createSafeContext } from '@utils/safe-context';
import { User } from 'types';
import { getSession } from '@services/user/session/get';

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const [Provider, useUser] = createSafeContext<UserContext>(
  'UserProvider was not found in the tree'
);

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const [data, error] = await getSession();
      if (!data || error) {
        return setUser(null);
      }
      return setUser(data);
    };

    fetch();
  }, []);

  return <Provider value={{ user, setUser }}>{props.children}</Provider>;
}
