import { Button, Flex } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const BackNavigation = ({ label }: { label: string }) => {
  const router = useRouter();

  return (
    <Flex justify="space-between">
      <Button
        onClick={() => router.back()}
        variant="transparent"
        leftSection={<IconChevronLeft />}
        c="#051438"
        fw={700}
        p={0}
        m={0}
      >
        {label}
      </Button>
    </Flex>
  );
};
