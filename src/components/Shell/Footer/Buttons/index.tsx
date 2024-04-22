import cx from 'clsx';
import { BoxProps, Button, ElementProps } from '@mantine/core';
import IconController from '@components/Icons';
import { Href } from '@config';
import classes from './SocialButton.module.css';

interface SocialButtonProps extends BoxProps, ElementProps<'a', 'type'> {
  icon?: React.ReactNode;
}

function SocialButton(props: SocialButtonProps) {
  const { icon, ...rest } = props;
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      leftSection={icon}
      radius="md"
      classNames={{
        root: classes.socialButton,
        section: classes.socialButtonSection,
      }}
      {...rest}
    />
  );
}

function FacebookButton(props: SocialButtonProps) {
  const { className, ...rest } = props;
  return (
    <SocialButton
      className={cx(classes.facebookButton, className)}
      icon={<IconController control="facebook" size={16} />}
      href={Href.Facebook}
      {...rest}
    >
      Follow us on Facebook
    </SocialButton>
  );
}

function GithubButton(props: SocialButtonProps) {
  const { className, ...rest } = props;
  return (
    <SocialButton
      className={cx(classes.githubButton, className)}
      icon={<IconController control="github" size={16} />}
      href={Href.Github.Organization}
      {...rest}
    >
      Follow us on Github
    </SocialButton>
  );
}

export { FacebookButton, GithubButton };
