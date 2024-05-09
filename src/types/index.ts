import type { BoxProps, ElementProps } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';

export interface LinkData {
  type: 'link' | 'next';
  label: string;
  link: string;
}

export interface NavbarData extends LinkData {
  icon: typeof Icon123;
  count?: number;
}

export interface FooterLinksGroups {
  title: string;
  data: LinkData[];
}

export interface IconProps extends BoxProps, ElementProps<'svg', 'display' | 'opacity'> {
  size?: number | string;
}

export type IconControllerProps =
  | ({ control: 'github' } & IconProps)
  | ({ control: 'facebook' } & IconProps)
  | ({ control: 'lope' } & IconProps)
  | ({ control: 'google' } & IconProps)
  | ({ control: 'account-circle' } & IconProps);

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface NextErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export type PickAsOrNull<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
