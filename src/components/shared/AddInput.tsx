import { Flex, Text } from '@mantine/core';
import React from 'react';
import IconPlusColored from './IconComponents/IconPlusColored';
import { appColors } from '@/theme/colors';


const AddInput = (props: {
  text: string;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const { text, disabled, onClick, ...rest } = props;
  return (
    <Flex
      align={'center'}
      gap={12}
      justify={'flex-end'}
      mt={28}
      sx={{ cursor: 'pointer' }}
      onClick={(event) => {
        if (!disabled) {
          onClick(event);
        }
      }}
      {...rest}
    >
      <IconPlusColored
        size={21}
        fill={disabled ? appColors.grayLight : '#0B0C7D'}
      />
      <Text
        sx={{
          fontWeight: 600,
          lineHeight: '28px',
          color: disabled ? appColors.grayLight : '#0B0C7D',
        }}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default AddInput;
