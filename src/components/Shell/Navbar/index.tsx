import { Box, ScrollArea } from '@mantine/core';
import { NAVBAR_LINKS_DATA } from '@config/links';
import classes from './Navbar.module.css';
import NavbarLinksGroup from './LinksGroup';

interface NavbarProps {
  navbarOpened: boolean;
  onNavbarClose: () => void;
}

function Navbar(props: NavbarProps) {
  const { navbarOpened, onNavbarClose } = props;

  return (
    <Box component="nav" className={classes.navbar} mod={{ hidden: !navbarOpened }}>
      <ScrollArea className={classes.scrollarea} type="never" offsetScrollbars={false}>
        <div className={classes.body}>
          <NavbarLinksGroup data={NAVBAR_LINKS_DATA} onNavbarClose={onNavbarClose} />
        </div>
      </ScrollArea>
    </Box>
  );
}

export default Navbar;
