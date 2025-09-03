import { AlertIndicator, AlertType } from '@/components/shared/AlertIndicator';
import dynamic from 'next/dynamic';
import type { FC, PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const SHOW_TIME = 3000;

type AlertProps = {
  title: string;
  message: string;
  autoClose?: boolean;
  isProceeding?: React.ReactNode | null;
};

interface AlertContextProps {
  showSuccess: (props: AlertProps) => void;
  showError: (props: AlertProps) => void;
  showWarning: (props: AlertProps) => void;
  closeAlert: () => void;
}

export const AlertNotification = createContext<AlertContextProps>({
  showSuccess: () => {},
  showError: () => {},
  showWarning: () => {},
  closeAlert: () => {},
});

const LazyAlertIndicator = dynamic(
  () =>
    import('@/components/shared/AlertIndicator').then(
      (mod) => mod.AlertIndicator,
    ),
  { ssr: false },
);

export const AlertNotificationProvider: FC<
  PropsWithChildren<{ error?: string }>
> = ({ error, children }) => {
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType>('error');
  const [show, setShow] = useState(false);
  const [autoClose, setAutoClose] = useState(false);
  const [isProceeding, setIsProceeding] = useState<React.ReactNode>(undefined);

  useEffect(() => {
    if (error) {
      setAlertMessage(error);
      setShow(true);
    }
  }, [error]);

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        setShow(false);
        setAlertMessage('');
        setAlertTitle('');
      }, SHOW_TIME);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose]);

  const showAlert = useCallback(
    (
      title: string,
      message: string,
      type: AlertType,
      autoClose = false,
      isProceeding: React.ReactNode | null = null,
    ) => {
      setAlertTitle(title);
      setAlertMessage(message);
      setAlertType(type);
      setAutoClose(autoClose);
      setShow(true);
      setIsProceeding(isProceeding);
    },
    [],
  );

  const showSuccess = useCallback(
    (props: AlertProps) =>
      showAlert(
        props.title,
        props.message,
        'success',
        props.autoClose,
        props.isProceeding ?? null,
      ),
    [showAlert],
  );

  const showError = useCallback(
    (props: AlertProps) =>
      showAlert(props.title, props.message, 'error', props.autoClose),
    [showAlert],
  );
  const showWarning = useCallback(
    (props: AlertProps) =>
      showAlert(props.title, props.message, 'warning', props.autoClose),
    [showAlert],
  );
  const closeAlert = useCallback(() => setShow(false), []);

  return (
    <AlertNotification.Provider
      value={{ showSuccess, showError, showWarning, closeAlert }}
    >
      <LazyAlertIndicator
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        open={show}
        onClose={closeAlert}
        isProceeding={isProceeding}
      />
      {children}
    </AlertNotification.Provider>
  );
};

export const useAlertNotification = () => useContext(AlertNotification);
