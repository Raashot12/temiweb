import React from "react";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { appColors } from "@/theme/colors";
import styles from "./confirmation-modal.module.css";
import IconConfirmDialog from "../IconComponents/IconConfirmDialog";

export type ConfirmationDialogProps = {
  title?: string | undefined;
  content?: string | undefined;
  open: boolean;
  isloading?: boolean;
  close: () => void;
  handleProceed: () => void;
  question: string;
};

export const ConfirmationAlertDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  open,
  isloading,
  close,
  handleProceed,
  question,
}) => {
  return (
    <Modal
      opened={open}
      onClose={close}
      withCloseButton={false}
      centered
      size="30rem"
      classNames={{
        header: styles.modalHeader,
        title: styles.modalTitle,
        body: styles.modalBody,
        content: styles.modalContent,
        close: styles.modalClose,
      }}
    >
      <Flex align="center" justify="space-between" mb="1rem">
        <Text fw={600}>{title}</Text>
        <IconConfirmDialog />
      </Flex>
      <div className={styles.confirmationContents}>
        <Text c={appColors.black} fw={"500"}>
          {content}
        </Text>

        <Text c={"#677597"} fw={"500"}>
          {question}
        </Text>
      </div>
      <Flex className={styles.confirmationButtonsWrapper}>
        <Button variant="white" h="2rem" onClick={close}>
          Back
        </Button>
        <Button
          size="xs"
          h="2rem"
          onClick={() => handleProceed()}
          loading={isloading}
        >
          Proceed
        </Button>
      </Flex>
    </Modal>
  );
};
