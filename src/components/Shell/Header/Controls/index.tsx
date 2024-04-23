import { BoxProps, Group, Tooltip } from '@mantine/core';
import { Href } from '@config';
import { ColorSchemeControl, FacebookControl, GithubControl, UserControl } from './Icons';

function HeaderControls(props: BoxProps) {
  return (
    <Tooltip.Group openDelay={600} closeDelay={100}>
      <Group gap="xs" {...props}>
        <FacebookControl link={Href.Facebook} />
        <GithubControl link={Href.Github.Organization} />
        <ColorSchemeControl />
        <UserControl />
      </Group>
    </Tooltip.Group>
  );
}

export default HeaderControls;
