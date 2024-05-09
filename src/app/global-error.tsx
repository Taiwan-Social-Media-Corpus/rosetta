'use client';

import { Button } from '@mantine/core';
import ErrorPage from '@components/Errors';
import { NextErrorPageProps } from 'types';

export default function Error(props: NextErrorPageProps) {
  const { reset } = props;
  return (
    <ErrorPage
      code="500"
      title="Something bad just happened..."
      description="Our servers could not handle your request. Don't worry, our development team was already notified. Try refreshing the page."
      button={
        <Button variant="outline" size="md" onClick={() => reset()}>
          Refresh the page
        </Button>
      }
    />
  );
}
