import { AppShell, ScrollArea } from '@mantine/core';
import { NAVBAR_LINKS_DATA } from '@config/links';
import classes from './Navbar.module.css';
import NavbarLinksGroup from './LinksGroup';

interface NavbarProps {
  onNavbarClose: () => void;
}

function Navbar(props: NavbarProps) {
  return (
    <AppShell.Navbar>
      <ScrollArea className={classes.scrollarea} type="never" offsetScrollbars={false}>
        <div className={classes.body}>
          <NavbarLinksGroup data={NAVBAR_LINKS_DATA} onNavbarClose={props.onNavbarClose} />
        </div>
      </ScrollArea>
    </AppShell.Navbar>
  );
}

export default Navbar;
