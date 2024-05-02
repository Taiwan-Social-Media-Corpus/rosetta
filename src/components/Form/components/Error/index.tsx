import { Group, GroupProps, Text, TextProps } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

function ErrorMessage(props: TextProps & { children?: string; groupProps?: GroupProps }) {
  const { children, groupProps, ...rest } = props;
  if (!children?.length) return null;

  return (
    <Group component="span" gap={5} style={{ position: 'absolute', ...groupProps?.style }}>
      <IconAlertCircle size={18} />
      <Text
        component="span"
        fw={500}
        size="sm"
        style={{ wordBreak: 'break-word', display: 'block', position: 'relative' }}
        {...rest}
      >
        {children}
      </Text>
    </Group>
  );
}

export default ErrorMessage;
