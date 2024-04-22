import Link from 'next/link';
import { Route } from '@config';
import cx from 'clsx';
import { Box, Burger, Group, Text, RemoveScroll } from '@mantine/core';
import IconController from '@components/Icons';
import classes from './Header.module.css';
import HeaderControls from './Controls';
import { ColorSchemeControl } from './Controls/Icons';

interface HeaderProps {
  navbarOpened: boolean;
  onNavbarToggle: () => void;
}

function Header(props: HeaderProps) {
  const { navbarOpened, onNavbarToggle } = props;

  return (
    <>
      <header className={cx(classes.header, RemoveScroll.classNames.fullWidth)} data-desktop>
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

        <HeaderControls className={classes.controls} />
      </header>

      <header className={cx(classes.header, RemoveScroll.classNames.fullWidth)} data-mobile>
        <Group justify="space-between" w="100%" wrap="nowrap">
          <Box>
            <Burger
              opened={navbarOpened}
              onClick={onNavbarToggle}
              size="sm"
              aria-label="Toggle navbar"
            />
          </Box>

          <Link href={Route.Home}>
            <IconController control="lope" size={55} className={classes.logo} />
          </Link>

          <Group gap="sm">
            <ColorSchemeControl />
          </Group>
        </Group>
      </header>
    </>
  );
}

export default Header;
