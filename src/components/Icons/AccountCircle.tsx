import { Box, rem } from '@mantine/core';
import { IconProps } from 'types';

function AccountCircleIcon(props: IconProps) {
  const { size, style, ...rest } = props;

  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={[{ width: rem(size), height: rem(size) }, style]}
      {...rest}
    >
      <path
        fill="currentColor"
        d="M6.196 17.485q1.275-.918 2.706-1.451T12 15.5t3.098.534t2.706 1.45q.99-1.024 1.593-2.42Q20 13.666 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.063t1.593 2.422m5.805-4.985q-1.264 0-2.133-.868T9 9.501t.868-2.133t2.131-.868t2.133.868T15 9.499t-.868 2.133t-2.131.868M12 21q-1.883 0-3.525-.701q-1.642-.7-2.858-1.916q-1.215-1.216-1.916-2.858T3 12t.701-3.525t1.916-2.858t2.858-1.916T12 3t3.525.701t2.858 1.916q1.215 1.216 1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21m0-1q1.383 0 2.721-.484t2.314-1.324q-.975-.782-2.256-1.237T12 16.5t-2.788.445t-2.247 1.247q.975.84 2.314 1.324T12 20m0-8.5q.842 0 1.421-.579T14 9.5t-.579-1.421T12 7.5t-1.421.579T10 9.5t.579 1.421T12 11.5m0 6.75"
      >
      </path>
    </Box>
  );
}

export default AccountCircleIcon;
