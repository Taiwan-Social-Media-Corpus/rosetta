import { Title, Text, Button, Container, Group } from '@mantine/core';
import PageBase from '@components/PageBase';
import { useRouter } from 'next/navigation';
import classes from './ServerError.module.css';

function ServerError() {
  const router = useRouter();
  return (
    <PageBase className={classes.base}>
      <Container className={classes.container}>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <Group justify="center">
          <Button variant="outline" size="md" onClick={() => router.refresh()}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </PageBase>
  );
}

export default ServerError;
