import { Box, Modal, ModalOverlay, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { ModalWrapper } from './style';

const ModalLayoutWrapper = ({
  children,
  footer,
  title,
  open,
  size = '90',
  height = '90vh',
}: {
  children: React.ReactNode;
  open?: boolean;
  footer?: React.ReactElement;
  title: JSX.Element | null;
  size?: string;
  height?: string;
}) => {
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <ModalWrapper
      opened={Boolean(open)}
      onClose={() => null}
      size={`${size}%`}
      centered
      fullScreen={isMobile}
      closeOnClickOutside={false}
      yOffset="1vh"
      xOffset={0}
    >
      <ModalOverlay opacity={0.5} />
      <Modal.Content
        style={{ padding: `16px 32px` }}
        mih={isMobile ? 'calc(100vh - 150px)' : '85vh'}
        mah={isMobile ? '100vh' : '95vh'}
      >
        <Modal.Title>{title}</Modal.Title>
        <ScrollArea h={height} offsetScrollbars type="hover">
          {children}
        </ScrollArea>
        <Box>{footer}</Box>
      </Modal.Content>
    </ModalWrapper>
  );
};

export default ModalLayoutWrapper;
