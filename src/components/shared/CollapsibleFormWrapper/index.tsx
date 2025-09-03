'use client';
import {
  ActionIcon,
  Button,
  Collapse,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { appColors } from '@/theme/colors';
import IconArrowUp from '../IconComponents/IconArrowUp';
import IconArrowDown from '../IconComponents/IconArrowDown';

type CollapsibleFormWrapperProps = {
  title: string;
  children: React.ReactNode;
  isDependant: boolean;
  isOpened: boolean;
  buttonText: string;
  handleButtonClicked: () => void;
};

const CollapsibleFormWrapper = (props: CollapsibleFormWrapperProps) => {
  const {
    title,
    children,
    isDependant,
    isOpened,
    buttonText,
    handleButtonClicked,
    ...rest
  } = props;
  const [opened, setOpened] = useState<boolean>(isOpened);

  return (
    <Stack bg="white" p={12} gap={0} style={{ borderRadius: '10px', border: '1px solid #DFE2E9' }}>
      <Group align="center" flex={1}>
        <Text fw={600} size="md" c={appColors.text}>
          {title}
        </Text>
        <Divider ml={1} flex="1" c={appColors.halfFade} />
        {isDependant ? (
          <Button variant={'outline'} onClick={handleButtonClicked}>
            {buttonText}
          </Button>
        ) : null}
        {opened ? (
          <ActionIcon
            bg={'transparent'}
            onClick={() => setOpened((open) => !open)}
          >
            <IconArrowUp />
          </ActionIcon>
        ) : (
          <ActionIcon
            bg={'transparent'}
            onClick={() => setOpened((open) => !open)}
          >
            <IconArrowDown />
          </ActionIcon>
        )}
      </Group>
      <Collapse in={opened} px={0}>
        {children}
      </Collapse>
    </Stack>
  );
};
export default CollapsibleFormWrapper;
