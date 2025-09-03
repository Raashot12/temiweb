import styles from './AlertIndicator.module.css';
import { Button, Flex, Modal, Text } from '@mantine/core';
import { appColors } from '@/theme/colors';
import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_BREAKPOINT } from '@/utils/constants';
import IconAlertSuccess from '../IconComponents/IconAlertSucess';
import IconAlertError from '../IconComponents/IconAlertError';
import IconAlertWarning from '../IconComponents/IconAlertWarning';

export type AlertType = 'success' | 'error' | 'warning';

const getAlertColor = (type: AlertType) => {
  switch (type) {
    case 'success':
      return appColors.green;
    case 'error':
      return appColors.red;
    case 'warning':
      return appColors.yellow;
    default:
      return appColors.red;
  }
};

export const AlertIndicator = ({
  title,
  message,
  onClose,
  type,
  open,
  isProceeding,
}: {
  title: string;
  message: string;
  onClose: () => void;
  type: AlertType;
  open: boolean;
  isProceeding?: React.ReactNode | null;
}) => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT})`);
  return (
    <Modal
      opened={open}
      onClose={() => null}
      centered
      size={isMobile ? '100%' : '25%'}
      title=""
      zIndex={20000}
      classNames={{ header: styles.modalHeader, body: styles.modalBody }}
    >
      <div className={styles.wrapper}>
        <Flex direction="column" align="center">
          <Text size="lg" fw={600}>
            {title}
          </Text>
          <Text size="sm" fw={500} ta="center" c="#58627A">
            {message}
          </Text>
        </Flex>
        <div
          className={styles.alertDisplay}
          style={
            { '--alert-color': getAlertColor(type) } as React.CSSProperties
          }
        >
          {type === 'success' && <IconAlertSuccess />}
          {type === 'error' && <IconAlertError />}
          {type === 'warning' && <IconAlertWarning />}
        </div>
        {isProceeding ? (
          <>{isProceeding}</>
        ) : (
          <Button onClick={onClose} w="100%" h="32px">
            Close
          </Button>
        )}
      </div>
    </Modal>
  );
};
