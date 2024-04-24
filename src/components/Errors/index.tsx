import { Title, Text, Container, Group } from '@mantine/core';
import PageBase from '@components/PageBase';
import classes from './ErrorPage.module.css';

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  button: JSX.Element;
}

function ErrorPage(props: ErrorPageProps) {
  const { code, title, description, button } = props;
  return (
    <PageBase className={classes.base}>
      <Container className={classes.container}>
        <div className={classes.label}>{code}</div>
        <Title className={classes.title}>{title}</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {description}
        </Text>
        <Group justify="center">{button}</Group>
      </Container>
    </PageBase>
  );
}

export default ErrorPage;
