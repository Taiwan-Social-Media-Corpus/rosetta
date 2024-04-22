import { NavbarData } from 'types';
import { IconExternalLink } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { rem, UnstyledButton } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';

interface NavbarLinksGroupProps {
  data: NavbarData[];
  onNavbarClose: () => void;
}

function NavbarLinksGroup(props: NavbarLinksGroupProps) {
  const { data, onNavbarClose } = props;
  const pathname = usePathname();

  return (
    <>
      {data.map((link, index) => (
        <UnstyledButton<any>
          key={`${index}-${link.label}`}
          component={link.type === 'link' ? 'a' : Link}
          target={link.type === 'link' ? '_blank' : undefined}
          href={link.link}
          onClick={onNavbarClose}
          className={classes.link}
          mod={{ active: pathname === link.link }}
        >
          <span className={classes.icon}>
            <link.icon style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
          </span>
          <span className={classes.label}>{link.label}</span>
          {link.type === 'link' && (
            <span className={classes.external}>
              <IconExternalLink size={14} />
            </span>
          )}
        </UnstyledButton>
      ))}
    </>
  );
}

export default NavbarLinksGroup;
