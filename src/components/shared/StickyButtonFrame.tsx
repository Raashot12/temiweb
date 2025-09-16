import styled from '@emotion/styled';
import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';

const ButtonFrame = styled.div`
  background: #f9f9fa;
  display: flex;
  border-radius: 23px;
  width: fit-content;
  padding: 4px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 2;
`;

interface StickyButtonFrameProps extends BoxProps {
  children: ReactNode;
}

export const StickyButtonFrame = (props: StickyButtonFrameProps) => {
  const { children, ...rest } = props;
  return (
    <Box {...rest}>
      <ButtonFrame>{children}</ButtonFrame>
    </Box>
  );
};
