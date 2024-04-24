'use client';

import dynamic from 'next/dynamic';
import { useUser } from '@contexts/user';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import Navbar from './Navbar';
import classes from './Shell.module.css';

const Footer = dynamic(() => import('./Footer'));

interface ShellProps {
  children: React.ReactNode;
}

function MobileNavbar(props: ShellProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const { user } = useUser();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      transitionDuration={0}
      padding="md"
    >
      <Header navbarOpened={opened} onNavbarToggle={toggle} user={user} />
      <Navbar onNavbarClose={close} withLogout={Boolean(user)} />
      <AppShell.Main className={classes.main} id="shell" style={{ paddingRight: 0 }}>
        {props.children}
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
export default MobileNavbar;
