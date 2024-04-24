import { rem, Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { deleteSession } from '@services/user/session';

function LogoutItem() {
  return (
    <Menu.Item
      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
      onClick={async () => {
        await deleteSession();
        window.location.reload();
      }}
    >
      Logout
    </Menu.Item>
  );
}

export default LogoutItem;
