import { appColors } from '@/theme/colors';
import { Badge, BadgeProps, PolymorphicComponentProps, Text } from '@mantine/core';

export const InputsBadge = (
  props: PolymorphicComponentProps<'div', BadgeProps>
) => (
  <>
    <Badge
      component="span"
      {...props}
      sx={{
        maxWidth: '80%',
        minWidth: 'fit-content',
        height: '80%',
        background: appColors.fade,
        color: appColors.black,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        marginBottom: 6,
        border: `1px solid ${appColors.fade}`,
        marginRight: 10,
        textTransform: 'none',
        '& .mantine-Badge-inner:first-letter': {
          textTransform: 'capitalize',
        },
        ...(props.sx as object),
      }}
    >
      <Text
        sx={{
          wordWrap: 'break-word',
          textWrap: 'wrap',
        }}
      >
        {props.children}
      </Text>
    </Badge>
  </>
);
