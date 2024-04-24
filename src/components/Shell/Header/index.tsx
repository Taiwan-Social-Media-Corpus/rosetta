import Link from 'next/link';
import { Route } from '@config';
import cx from 'clsx';
import { Box, Burger, Group, Text, RemoveScroll, AppShell } from '@mantine/core';
import IconController from '@components/Icons';
import { User } from 'types';
import classes from './Header.module.css';
import HeaderControls from './Controls';
import { ColorSchemeControl, UserControl } from './Controls/Icons';

interface HeaderProps {
  user: User | null;
  navbarOpened: boolean;
  onNavbarToggle: () => void;
}

function Header(props: HeaderProps) {
  const { user, navbarOpened, onNavbarToggle } = props;

  return (
    <>
      <AppShell.Header
        className={cx(classes.header, RemoveScroll.classNames.fullWidth)}
        data-desktop
      >
        <div className={classes.logoWrapper}>
          <Group>
            <Link href={Route.Home}>
              <IconController control="lope" size={55} className={classes.logo} />
            </Link>
            <Text
              component={Link}
              href={Route.Home}
              ff="Monaco,Courier,monospace"
              size="md"
              fw={600}
            >
              Lopen
            </Text>
          </Group>
        </div>
        <HeaderControls className={classes.controls} user={user} />
      </AppShell.Header>

      <AppShell.Header
        className={cx(classes.header, RemoveScroll.classNames.fullWidth)}
        data-mobile
      >
        <Group justify="space-between" w="100%" wrap="nowrap">
          <Box miw={80}>
            <Burger opened={navbarOpened} onClick={onNavbarToggle} hiddenFrom="sm" size="sm" />
          </Box>

          <Link href={Route.Home}>
            <IconController control="lope" size={55} className={classes.logo} />
          </Link>

          <Group gap="sm">
            <ColorSchemeControl />
            <UserControl user={user} />
          </Group>
        </Group>
      </AppShell.Header>
    </>
  );
}

export default Header;
