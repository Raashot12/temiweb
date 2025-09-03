import { ActionIcon } from '@mantine/core';
import IconArrowBack from './IconArrowBack';
import IconArrowFront from './IconArrowFront';


type ArrowProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  direction: 'left' | 'right';
};

const PaginationArrowIcon = (arrowProps: ArrowProps) => {
  const backgroundColor = arrowProps.disabled ? '#DFE2E9' : '';
  const arrowColor = arrowProps.disabled ? '#696969' : '#051438';

  return (
    <ActionIcon
      disabled={arrowProps.disabled}
      variant="default"
      bg={backgroundColor}
      onClick={arrowProps.onClick}
      data-testid={
        arrowProps.direction === 'left' ? 'previous-button' : 'next-button'
      }
    >
      {arrowProps.direction === 'left' && (
        <IconArrowBack color={arrowColor} height="9.6" width="4.8" />
      )}
      {arrowProps.direction === 'right' && (
        <IconArrowFront color={arrowColor} height="9.6" width="4.8" />
      )}
    </ActionIcon>
  );
};

export default PaginationArrowIcon;
