import { appColors } from '@/theme/colors';
import styled from '@emotion/styled';
import { Modal, Flex, Button, TextInput, Text, BoxProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ChangeEventHandler, ReactNode } from 'react';
import IconSearch from './IconComponents/IconSearch';
import IconTick from './IconComponents/IconTick';

type BaseSelectionModalWrapperProps = {
  size?: string;
  openModal: boolean;
  handleModalClose: () => void;
  handleSelect?: () => void;
  mah?: string;
  mih?: string;
  header: JSX.Element;
  children: React.ReactNode;
  footer?: JSX.Element;
  px?: string;
  py?: string;
  bg?: string;
};

const ModalWrapper = styled(Modal.Root)`
  .mantine-Modal-content {
    background: ${appColors.page};
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

const ClinicTileWrapper = styled.div`
  display: flex;
  height: 32px;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 8px;
  padding: 1.25rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: ${appColors.fade};
    padding: 1.25rem 0.5rem;
  }
`;

export const BaseTile = ({
  label,
  selected,
  onClick,
  dailyLimitExceeded,
}: {
  label: string;
  selected: boolean;
  onClick: VoidFunction;
  dailyLimitExceeded?: boolean;
}) => {
  return (
    <ClinicTileWrapper
      style={{ cursor: `${dailyLimitExceeded ? 'not-allowed' : 'pointer'}`, backgroundColor: `${selected ? appColors.fade : undefined}` }}
      onClick={onClick}
    >
      <Text fw={500} color={appColors.black}>
        {label}
      </Text>
      {dailyLimitExceeded && (
        <Text
          style={{
            borderRadius: '0.625rem',
          }}
          p="0.3125rem 0.625rem"
          fz="0.875rem"
          fw={600}
          color={appColors.text}
          bg={appColors.blackAccent}
        >
          Limit reached
        </Text>
      )}
      {selected && <IconTick />}
    </ClinicTileWrapper>
  );
};

export const BaseSelectionModalHeader = ({
  title,
  subtitle,
  onChange,
  mb = '13px',
  px,
  showSearchBar = true,
  fontSize,
  children,
}: {
  children?: ReactNode;
  fontSize?: string;
  showSearchBar?: boolean;
  mb?: string;
  px?: string;
  title: string;
  subtitle?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Flex
      mb={'1rem'}
      direction={'column'}
      w={'100%'}
      bg={appColors.page}
      justify={'center'}
      px={px}
    >
      <Flex mb={mb} justify={'center'} align={'center'}>
        <Text fw={700} style={{ fontSize }}>
          {title}
        </Text>
        <Modal.CloseButton />
      </Flex>
      {subtitle && (
        <Text style={{ marginBottom: '16px' }} color={appColors.text} fw={500}>
          {subtitle}
        </Text>
      )}
      {showSearchBar && (
        <TextInput
          type={'search'}
          mb={'13px'}
          rightSection={<IconSearch />}
          placeholder="Search"
          onChange={onChange}
        />
      )}
      {children}
    </Flex>
  );
};

export const BaseSelectionModalWrapper = ({
  size = '45vw',
  openModal,
  handleModalClose,
  handleSelect,
  children,
  header,
  footer,
  mih = '516px',
  mah = '70vh',
  py = '2rem',
  px = '2rem',
  bg,
}: BaseSelectionModalWrapperProps) => {
  const isMobile = useMediaQuery('(max-width: 50em)');

  const onClickSelect = () => {
    if (handleSelect !== undefined) {
      handleSelect();
      return;
    }

    handleModalClose();
  };
  return (
    <ModalWrapper
      opened={openModal}
      onClose={handleModalClose}
      size={size}
      centered
      closeOnClickOutside={false}
      fullScreen={isMobile}
      yOffset="1vh"
      xOffset={0}
    >
      <Modal.Overlay opacity={0.1} />
      <Modal.Content
        bg={bg}
        style={{ padding: `${py} ${px}` }}
        mih={isMobile ? 'calc(100vh - 150px)' : mih}
        mah={isMobile ? '100vh' : mah}
      >
        {header}
        <Flex
          style={{
            minHeight: '52%',
            width: '100%',
            flexDirection: 'column',
            overflowY: 'auto',
            flexGrow: 1,
          }}
        >
          {children}
        </Flex>
        {footer ?? (
          <Flex
            style={{
              width: '100%',
              paddingTop: '25px',
              justifyContent: 'flex-end',
              backgroundColor: `${appColors.page}`,
            }}
          >
            <Button onClick={onClickSelect}>Select</Button>
          </Flex>
        )}
      </Modal.Content>
    </ModalWrapper>
  );
};
