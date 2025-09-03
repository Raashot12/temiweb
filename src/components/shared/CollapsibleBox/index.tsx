import { appColors } from '@/theme/colors';

import { ActionIcon, Box, Collapse, Flex, Stack } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useState } from 'react';

type CollapsibleProps = {
  controllerButton?: React.ReactElement;
  title: React.ReactElement;
  children: React.ReactNode;
  isOpened?: boolean;
  rightSideComponent?: React.ReactNode;
  isRight?: boolean;
};
const CollapsibleBox = ({
  controllerButton,
  title,
  isOpened,
  children,
  rightSideComponent,
  isRight,
}: CollapsibleProps) => {
  const classes = {
    action: {
      backgroundColor: appColors?.white,
      borderRadius: '4px',
    },
    actionNobg: {
      borderRadius: '4px',
    },
    expandAction: {
      transition: 'transform 300ms ease',
    },
    collapseAction: {
      transform: 'rotate(180deg)',
    },
    phoneInputRoot: {
      display: 'flex',
    },
    phoneInputInput: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      paddingLeft: '5rem',
    },
    phoneInputLeft: {
      left: '0px',
      width: '4.5rem',
    },
    phoneCodeSelectWrapper: {
      width: '4.3rem',
    },
    phoneCodeSelect: {
      width: '4.3rem',
      height: '2.5rem',
      fontWeight: 500,
      padding: 0,
      paddingLeft: '8px',
      border: 'none',
      outline: 'none',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    },
    phoneCodeSelectIcon: {
      width: '32px',
    },
  };
  const [opened, setOpened] = useState(false);
  return (
    <Stack
      bg={appColors.white}
      w={'100%'}
      style={{
        borderRadius: '10px',
      }}
      p={12}
      mt={16}
    >
      <Flex justify={'space-between'} align={'center'}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            columnGap: 16,
          }}
        >
          {!isRight && (
            <>
              {!controllerButton && (
                <ActionIcon
                  color={appColors.black}
                  style={{
                    ...classes.action,
                    ...classes.expandAction,
                    ...(opened ? classes.collapseAction : {}),
                  }}
                  onClick={() => setOpened(!opened)}
                >
                  <IconChevronDown size={16} color={appColors.arrowGrayColor} />
                </ActionIcon>
              )}
            </>
          )}
          <React.Fragment>{controllerButton}</React.Fragment>
          <Box
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px',
              color: appColors.text,
              margin: 0,
            }}
          >
            {title}
          </Box>
        </Box>
        <Box>{rightSideComponent}</Box>
        {isRight && (
          <>
            {!controllerButton && (
              <ActionIcon
                color={appColors.black}
                style={{
                  ...classes.action,
                  ...classes.expandAction,
                  ...(opened ? classes.collapseAction : {}),
                }}
                onClick={() => setOpened(!opened)}
              >
                <IconChevronDown size={16} color={appColors.arrowGrayColor} />
              </ActionIcon>
            )}
          </>
        )}
      </Flex>
      <Collapse in={!controllerButton ? opened : (isOpened as boolean)}>
        {children}
      </Collapse>
    </Stack>
  );
};

export default CollapsibleBox;
