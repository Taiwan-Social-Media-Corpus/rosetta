import { AppShell, ScrollArea } from '@mantine/core';
import { NAVBAR_LINKS_DATA } from '@config/links';
import classes from './Navbar.module.css';
import NavbarLinksGroup from './LinksGroup';
import Logout from './Logout';

interface NavbarProps {
  onNavbarClose: () => void;
  withLogout?: boolean;
}

function Navbar(props: NavbarProps) {
  const { onNavbarClose, withLogout = false } = props;

  return (
    <AppShell.Navbar>
      <AppShell.Section
        grow
        component={ScrollArea}
        type="never"
        offsetScrollbars={false}
        className={classes.scrollarea}
      >
        <div className={classes.body}>
          <NavbarLinksGroup data={NAVBAR_LINKS_DATA} onNavbarClose={onNavbarClose} />
        </div>
      </AppShell.Section>
      {withLogout && <Logout />}
    </AppShell.Navbar>
  );
}

export default Navbar;
