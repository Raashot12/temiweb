import { Modal, type ModalProps } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./CustomModal.module.css";

type CustomModalProps = {
  children: ReactNode;
} & ModalProps;

export const CustomModal = ({
  children,
  title,
  onClose,
  ...props
}: CustomModalProps) => {
  return (
    <Modal
      title={title}
      classNames={{
        root: styles.root,
        header: styles.header,
        content: styles.body,
        title: styles.title,
      }}
      onClose={onClose}
      {...props}
    >
      {children}
    </Modal>
  );
};
