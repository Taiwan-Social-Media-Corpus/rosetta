import { Boards } from 'types/corpus';
import type { ComboboxData } from '@mantine/core';

export const mediaOptions: ComboboxData = [
  { label: 'All', value: 'all' },
  { label: 'PTT', value: 'ptt' },
  { label: 'Dcard', value: 'dcard' },
];

const mediaPostTypes: { [key: string]: ComboboxData } = {
  ptt: [
    { label: 'commentPos', value: 'commentPos' },
    { label: 'commentNeg', value: 'commentNeg' },
    { label: 'commentNeu', value: 'commentNeu' },
  ],
  dcard: [
    { label: 'commentPos', value: 'commentPos' },
    { label: 'commentMale', value: 'commentMale' },
    { label: 'commentFemale', value: 'commentFemale' },
  ],
};

export const defaultPostTypeOptions: ComboboxData = [
  { label: 'All', value: 'all' },
  { label: 'Title', value: 'title' },
  { label: 'Body', value: 'body' },
  { label: 'Comment', value: 'comment' },
];

export function createPostTypeOptions(media: string) {
  if (media === 'all') return defaultPostTypeOptions;
  const additionalOptions = mediaPostTypes[media as keyof typeof mediaPostTypes];
  return defaultPostTypeOptions.concat(additionalOptions);
}

export function createBoardsOptions(boards: Boards, media: string) {
  if (media === 'all') return [];
  return boards[media].map((value) => ({
    label: value,
    value,
  }));
}
