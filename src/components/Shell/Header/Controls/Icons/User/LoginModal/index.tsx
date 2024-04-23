import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Group, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import IconController from '@components/Icons';
import { getOAuthURL } from '@services/user/oauth';

function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <>
      <Modal
        yOffset="12vh"
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        title={
          <section>
            <Title order={2} my="md">
              Welcome back!
            </Title>
          </section>
        }
      >
        <Group grow mb={30} mt="md">
          <Button
            variant="default"
            radius="xl"
            justify="space-between"
            leftSection={<IconController control="google" size={20} />}
            rightSection={<></>}
            onClick={() =>
              start(async () => {
                const url = await getOAuthURL();
                if (url === null) {
                  router.refresh();
                } else {
                  router.push(url!);
                }
                close();
              })
            }
            loading={pending}
            loaderProps={{ type: 'dots' }}
          >
            Sign in with Google
          </Button>
        </Group>
      </Modal>
      <IconController control="account-circle" size={28} onClick={open} />
    </>
  );
}

export default LoginModal;
