import { Stack, Text } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons-react';

export const EmptyTable = () => (
  <Stack gap={10} w="100%" c="#A6AFC2" justify="center" align="center" p={100}>
    <IconDatabaseOff />
    <Text fw={600}>No Data</Text>
  </Stack>
);
