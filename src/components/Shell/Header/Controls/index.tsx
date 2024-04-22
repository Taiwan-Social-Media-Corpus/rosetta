import { BoxProps, Group, Tooltip } from '@mantine/core';
import { Href } from '@config';
import { ColorSchemeControl, FacebookControl, GithubControl } from './Icons';

interface HeaderControlsProps extends BoxProps {
  withGithub?: boolean;
  withFacebook?: boolean;
  withColorScheme?: boolean;
}

function HeaderControls(props: HeaderControlsProps) {
  const { withGithub = true, withFacebook = true, withColorScheme = true, ...rest } = props;
  return (
    <Tooltip.Group openDelay={600} closeDelay={100}>
      <Group gap="xs" {...rest}>
        {withFacebook && <FacebookControl link={Href.Facebook} />}
        {withGithub && <GithubControl link={Href.Github.Organization} />}
        {withColorScheme && <ColorSchemeControl />}
      </Group>
    </Tooltip.Group>
  );
}

export default HeaderControls;
