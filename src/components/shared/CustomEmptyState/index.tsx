import { Box, Center, Group, rem, Stack, Text } from '@mantine/core';
import React from 'react';
import IconEmptyState from '../IconComponents/IconEmptyState';

const CustomEmptyState = ({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) => {
  return (
    <Center h={'100%'}>
      <Box style={{ display: 'table-cell' }}>
        <Stack align={'center'} justify={'center'}>
          <IconEmptyState />
          <Stack gap={4} align={'center'} justify={'center'}>
            <Text fz={rem(16)} fw={600} c="#677597">
              {mainText}
            </Text>
            <Text fz={rem(14)} fw={500}>
              {subText}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default CustomEmptyState;
