import { IconBrandDatabricks } from '@tabler/icons-react';
import { FooterLinksGroups, NavbarData } from 'types';
import { Href, Route } from './index';

export const FOOTER_LINKS_DATA: FooterLinksGroups[] = [
  {
    title: 'About',
    data: [
      { type: 'next', label: 'About Corpus', link: Route.Home },
      { type: 'link', label: 'Releases', link: Href.Github.Releases },
    ],
  },

  {
    title: 'Community',
    data: [
      { type: 'link', label: 'Follow on Facebook', link: Href.Facebook },
      { type: 'link', label: 'Follow on Github', link: Href.Github.Organization },
      { type: 'link', label: 'GitHub discussion', link: Href.Github.Discussion },
    ],
  },
  {
    title: 'Project',
    data: [
      { type: 'next', label: 'Documentation', link: Route.Home },
      { type: 'link', label: 'LOPE', link: Href.Github.Lopen },
    ],
  },
] as const;

export const NAVBAR_LINKS_DATA: NavbarData[] = [
  { type: 'next', label: 'Corpus', link: Route.Corpus, icon: IconBrandDatabricks },
];
