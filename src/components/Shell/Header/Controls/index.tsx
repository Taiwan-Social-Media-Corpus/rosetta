import { BoxProps, Group, Tooltip } from '@mantine/core';
import { Href } from '@config';
import { User } from 'types';
import { ColorSchemeControl, FacebookControl, GithubControl, UserControl } from './Icons';

interface HeaderControlsProps extends BoxProps {
  user: User | null;
}

function HeaderControls(props: HeaderControlsProps) {
  const { user, ...rest } = props;
  return (
    <Tooltip.Group openDelay={600} closeDelay={100}>
      <Group gap="xs" {...rest}>
        <FacebookControl link={Href.Facebook} />
        <GithubControl link={Href.Github.Organization} />
        <ColorSchemeControl />
        <UserControl user={user} />
      </Group>
    </Tooltip.Group>
  );
}

export default HeaderControls;
