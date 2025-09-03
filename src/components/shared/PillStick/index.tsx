import React from 'react';
import { Flex, Text } from '@mantine/core';
import IconPlusPill from '../IconComponents/IconPlusPill';
import IconCloseStick from '../IconComponents/IconCloseStick';


const PillStick = (props: {
  title: string;
  padding?: number;
  buttonElement?: boolean;
  spacing?: number;
  closeIcon?: boolean;
  active?: boolean;
  onclick?: () => void;
  color?: string;
  textcolor?: string;
  handleDelete?: () => void;
}) => {
  const {
    title,
    spacing = 8,
    padding = 6,
    closeIcon,
    buttonElement,
    onclick,
    active,
    handleDelete,
    color,
    textcolor,
  } = props;

  return (
    <Flex
      align="center"
      onClick={onclick}
      px={12}
      py={padding}
      style={{
        backgroundColor: active ? '#3E8BCF' : color ?? '#CDD8F3',
        borderRadius: 36,
        width: 'fit-content',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        lineHeight: '12px',
        color: active ? '#FFFFFF' : textcolor ?? '#051438',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Text mr={spacing} fw={600} fz={14}>{title}</Text>
      {!buttonElement && (
        <>
          {!closeIcon ? (
            <IconPlusPill />
          ) : (
            <IconCloseStick onclick={handleDelete} />
          )}
        </>
      )}
    </Flex>
  );
};

export default PillStick;
