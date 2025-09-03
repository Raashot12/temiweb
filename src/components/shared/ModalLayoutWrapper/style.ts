import { appColors } from '@/theme/colors';
import { Modal } from '@mantine/core';
import styled from '@emotion/styled';


export const ModalWrapper = styled(Modal.Root)`
  .mantine-Modal-content {
    background: ${appColors.pageBackground};
    display: flex;
    flex-direction: column;
  }
  .mantine-Modal-close {
    border-radius: 50%;
    min-width: 32px;
    min-height: 32px;
    background: ${appColors.halfFade};
    color: ${appColors.blue};
  }
`;

export const ModalOverlay = styled(Modal.Overlay)`
  background: rgba(0, 0, 0, 0.5);
`;
