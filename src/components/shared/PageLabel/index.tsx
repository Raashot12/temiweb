import { appColors } from '@/theme/colors';
import { Box } from '@mantine/core';
import React from 'react';

const PageLabel = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Box>
      <Box fw={600} fz={18}>
        {title}
      </Box>
      <Box fz={16} fw={500} c={appColors.text}>
        {description}
      </Box>
    </Box>
  );
};

export default PageLabel;
