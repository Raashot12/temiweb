import React from 'react';
import { Box, Text, Center } from '@mantine/core';
import { IconFileX } from '@tabler/icons-react';
import { appColors } from '@/theme/colors';

interface NoRecordFoundProps {
  mainText: string;
  subText: string;
  wrapperStyles?: React.CSSProperties;
}

const NoRecordFound: React.FC<NoRecordFoundProps> = ({
  mainText,
  subText,
  wrapperStyles = {},
}) => {
  return (
    <Center style={{ minHeight: '300px', ...wrapperStyles }}>
      <Box style={{ textAlign: 'center' }}>
        <IconFileX size={64} color={appColors.subText} style={{ marginBottom: '16px' }} />
        <Text
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: appColors.black,
            marginBottom: '8px',
          }}
        >
          {mainText}
        </Text>
        <Text
          style={{
            fontSize: '14px',
            color: appColors.subText,
            maxWidth: '400px',
          }}
        >
          {subText}
        </Text>
      </Box>
    </Center>
  );
};

export default NoRecordFound;
