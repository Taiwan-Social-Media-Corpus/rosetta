import { Container, Title, Paper, Skeleton } from '@mantine/core';
import PageBase from '@components/PageBase';
import classes from '@views/Corpus/Home/Corpus.module.css';

function Loading() {
  return (
    <PageBase className={classes.base}>
      <Container size={700} my={40}>
        <Title className={classes.title} ta="center">
          Taiwan Social Media Corpus
        </Title>
        <Skeleton visible radius="md" mt="xl" p={30} height={500}>
          <Paper withBorder shadow="md" p={45} radius="lg" mt="xl" />
        </Skeleton>
      </Container>
    </PageBase>
  );
}

export default Loading;
