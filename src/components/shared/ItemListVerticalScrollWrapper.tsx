import React from 'react';
import styled from '@emotion/styled';

const ScrollWrappperBox = styled.div<{ height?: number }>`
  max-height: ${(props) => `${props.height ?? 128}px`};
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ItemListVerticalScrollWrapper = ({
  height,
  children,
}: {
  children: React.ReactNode;
  height?: number;
}) => {
  return <ScrollWrappperBox height={height}>{children}</ScrollWrappperBox>;
};

export default ItemListVerticalScrollWrapper;
