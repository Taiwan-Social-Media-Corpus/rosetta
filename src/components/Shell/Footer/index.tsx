import cx from 'clsx';
import Link from 'next/link';
import { Avatar, Box, Container, Group, RemoveScroll, Text } from '@mantine/core';
import { Href, Route } from '@config';
import { FOOTER_LINKS_DATA } from '@config/links';
import { GithubButton, FacebookButton } from './Buttons';
import classes from './Footer.module.css';
import FooterLinksGroup from './LinksGroup';

function Footer() {
  const linksGroup = FOOTER_LINKS_DATA.map((group) => (
    <FooterLinksGroup data={group.data} title={group.title} key={group.title} />
  ));

  return (
    <div className={classes.root}>
      <div className={classes.spacer} />
      <Box className={cx(classes.wrapper, RemoveScroll.classNames.fullWidth)}>
        <Container size={1100}>
          <div className={classes.inner}>
            <div className={classes.logoSection}>
              <Group>
                <Link href={Route.Home}>
                  <Avatar
                    src={Href.Avatar}
                    radius={100}
                    size={70}
                    className={classes.avatar}
                    variant="outline"
                  />
                </Link>
                <Text
                  component={Link}
                  href={Route.Home}
                  ff="Monaco,Courier,monospace"
                  size="md"
                  fw={600}
                  className={classes.logo}
                >
                  LOPEN
                </Text>
              </Group>
              <Text className={classes.description} fz="sm">
                Build fully functional accessible corpus faster than ever
              </Text>
            </div>

            <div className={classes.groups}>{linksGroup}</div>
          </div>

          <div className={classes.afterFooter}>
            <Group justify="space-between" wrap="wrap">
              <Text fz="xs" className={classes.afterFooterNote}>
                Built by <a href="https://github.com/Retr0327">Lixing Yang</a> and{' '}
                <a href="https://github.com/loperntu">Shu-Kai Hsieh</a>
              </Text>
              <div className={classes.social}>
                <FacebookButton className={classes.socialButton} />
                <GithubButton className={classes.socialButton} />
              </div>
            </Group>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
