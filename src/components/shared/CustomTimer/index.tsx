import { appColors } from '@/theme/colors';
import { useEffect, useState } from 'react';
import { Text } from '@mantine/core';

export const CustomTimer = ({ delayResend = '60' }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Text fz="1rem" fw={600} ta={'center'} c={appColors.black}>
      {minutes}:{seconds}
    </Text>
  );
};
