'use client';

import dynamic from 'next/dynamic';
import { useUncontrolled } from '@mantine/hooks';
import Navbar from './Navbar';
import Header from './Header';
import classes from './Shell.module.css';

const Footer = dynamic(() => import('./Footer'));

interface ShellProps {
  children: React.ReactNode;
}

function Shell(props: ShellProps) {
  const [opened, setNavbarOpened] = useUncontrolled({
    defaultValue: false,
    finalValue: false,
  });

  const toggleNavbar = () => setNavbarOpened(!opened);
  const closeNavbar = () => setNavbarOpened(false);

  return (
    <>
      <Header navbarOpened={opened} onNavbarToggle={toggleNavbar} />
      <Navbar navbarOpened={opened} onNavbarClose={closeNavbar} />
      <main className={classes.main} id="shell">
        {props.children}
        <Footer />
      </main>
    </>
  );
}

export default Shell;
