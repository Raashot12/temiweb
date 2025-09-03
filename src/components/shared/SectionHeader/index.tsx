import { Divider, Group, Text } from '@mantine/core';
import { appColors } from '@/theme/colors';

export const SectionHeader = ({ title, color= appColors?.lowerText }: { title: string, color?: string }) => (
  <Group align="center" flex={1}>
    <Text fw={600} size="md" c={color}>
      {title}
    </Text>
    <Divider ml={1} flex="1" c={color} />
  </Group>
);
