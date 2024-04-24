import { Avatar, Tooltip, Menu, Text, rem } from '@mantine/core';
import { IconSettings, IconSearch } from '@tabler/icons-react';
import { LogoutItem } from './Items';

interface UserMenuProps {
  userPicture: string;
}

function UserMenu(props: UserMenuProps) {
  return (
    <Menu shadow="md" width={200} withArrow offset={1}>
      <Menu.Target>
        <Tooltip label="Account">
          <Avatar
            src={props.userPicture}
            alt="User avatar"
            size={35}
            style={{
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Corpus API Token
        </Menu.Item>

        <Menu.Divider />
        <LogoutItem />
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
