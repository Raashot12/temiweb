import React, { useState } from 'react';
import { Text, Button, Group, Flex } from '@mantine/core';
import { appColors } from '@/theme/colors';

interface YesNoQuestionProps {
  question: string;
  onAnswer: (answer: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  initialValue?: boolean;
}

export default function YesNoQuestion({
  question,
  onAnswer,
  yesLabel = 'Yes',
  noLabel = 'No',
  initialValue = false,
}: YesNoQuestionProps) {
  const [activeAnswer, setActiveAnswer] = useState<boolean>(initialValue);

  const handleAnswer = (answer: boolean) => {
    setActiveAnswer(answer);
    onAnswer(answer);
  };

  return (
    <Flex gap="md" align="center">
      <Text fw={500} size="md">
        {question}
      </Text>
      <Group
        gap="0"
        bg={appColors.quatreFade}
        style={{ borderRadius: '12px', padding: '6px 6px' }}
      >
        <Button
          variant={'filled'}
          fz="sm"
          px="sm"
          onClick={() => handleAnswer(true)}
          styles={(theme) => ({
            root: {
              borderRadius: '6px',
              backgroundColor:
                activeAnswer === true ? '#0B0C7D' : 'transparent',
              color: activeAnswer === true ? theme.white : theme.colors.gray[6],
              '&:hover': {
                backgroundColor:
                  activeAnswer === true ? '#0B0C7D' : theme.colors.gray[1],
              },
            },
          })}
        >
          {yesLabel}
        </Button>
        <Button
          variant={'filled'}
          fz="sm"
          px="sm"
          onClick={() => handleAnswer(false)}
          styles={(theme) => ({
            root: {
              borderRadius: '6px',
              backgroundColor: !activeAnswer ? '#0B0C7D' : 'transparent',
              color: !activeAnswer ? theme.white : theme.colors.gray[6],
              '&:hover': {
                backgroundColor: !activeAnswer
                  ? '#0B0C7D'
                  : theme.colors.gray[1],
              },
            },
          })}
        >
          {noLabel}
        </Button>
      </Group>
    </Flex>
  );
}
