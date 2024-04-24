'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { createSafeContext } from '@utils/safe-context';
import { User } from 'types';
import { useSession } from '@services/user/session';

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const [Provider, useUser] = createSafeContext<UserContext>(
  'UserProvider was not found in the tree'
);

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      const [userData, error] = data;
      if (!userData || error) {
        setUser(null);
        return;
      }
      setUser(userData.data);
    }
  }, [data]);

  return <Provider value={{ user, setUser }}>{props.children}</Provider>;
}
