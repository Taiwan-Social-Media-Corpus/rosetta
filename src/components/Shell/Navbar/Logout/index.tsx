import { AppShell, rem, UnstyledButton } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { deleteSession } from '@services/user/session';
import classes from './Logout.module.css';

function Logout() {
  return (
    <AppShell.Section className={classes.footer}>
      <UnstyledButton<any>
        onClick={async () => {
          await deleteSession();
          window.location.reload();
        }}
        className={classes.link}
      >
        <span className={classes.icon}>
          <IconLogout style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
        </span>
        <span className={classes.label}>Logout</span>
      </UnstyledButton>
    </AppShell.Section>
  );
}

export default Logout;
