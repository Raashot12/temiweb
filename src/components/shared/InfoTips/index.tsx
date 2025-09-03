import { Box, Tooltip } from '@mantine/core';
import { TooltipBaseProps } from '@mantine/core/lib/components/Tooltip/Tooltip.types';
import IconInfoTip from '../IconComponents/IconInfoTip';
import IconHint from '../IconComponents/IconHint';

const InfoTip = (props: Omit<TooltipBaseProps, 'children'>) => {
  return (
    <Tooltip {...props} multiline withArrow color="brand" label={props.label}>
      <Box ml={10}>
        <IconHint />
      </Box>
    </Tooltip>
  );
};

export default InfoTip;
