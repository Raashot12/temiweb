import React, { useRef, useState, DragEvent, useEffect } from 'react';
import {
  Box,
  Button,
  FileInput,
  Flex,
  Loader,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import classes from './uploader.module.css';
import { appColors } from '@/theme/colors';
import { useAlertNotification } from '@/hooks/useNotification';
import { useApiServicesAppEnroleeCreatenewenroleefromcsvPostMutation } from '@/state/services/enroleeApi';
import IconCloseModal from '../IconComponents/IconCloseModal';
import { IconFile } from '../IconComponents/IconFile';

export const Uploader = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const fileUploadRef = useRef<HTMLButtonElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { showSuccess, showError } = useAlertNotification();

  const handleOpenFileUploadDialog = () => {
    fileUploadRef?.current?.click();
  };

  const [uploadCSV, { isLoading: isUploadingCSV, isError, isSuccess }] =
    useApiServicesAppEnroleeCreatenewenroleefromcsvPostMutation();

  const handleUploadCSV = async () => {
    try {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('EnroleeCsvFile', file);

      await uploadCSV({
        body: formData as unknown as {
          EnroleeCsvFile?: Blob | undefined;
        },
      });
    } catch (err) {
      showError({
        title: 'Upload CSV',
        message: `There was error uploading the CSV file`,
      });
    }
  };

  useEffect(() => {
    if (isError) {
      showError({
        title: 'Upload CSV',
        message: `There was error uploading the CSV file`,
      });
    }
    if (isSuccess) {
      showSuccess({
        title: 'Upload CSV',
        message: `Upload enrollee successfully created!`,
      });
      onClose();
    }
  }, [showError, showSuccess, onClose, isError, isSuccess]);

  const handleFiles = (uploadFile: File | null) => {
    if (uploadFile) {
      const maxSizeInBytes = 3 * 1024 * 1024;

      if (uploadFile.size > maxSizeInBytes) {
        return;
      }

      if (!uploadFile.name.endsWith('.csv')) {
        return;
      }

      setFile(uploadFile);
    }
  };

  const handleFileInputChange = (fileData: File | null) => {
    if (!fileData) return;

    handleFiles(fileData);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const fileData = e.dataTransfer.files?.[0];
    handleFiles(fileData);
  };

  return (
    <Modal
      size="75%"
      centered
      closeOnClickOutside={false}
      opened={open}
      onClose={onClose}
      withCloseButton={false}
      classNames={{
        root: classes.root,
        header: classes.body,
        content: classes.body,
      }}
    >
      <Modal.Title>
        <Flex align={'center'} justify={'space-between'} w={'100%'}>
          <Text fw={600} fz={18}>
            Upload enrollees
          </Text>
          <IconCloseModal handleClose={onClose} />
        </Flex>
      </Modal.Title>
      <Stack className={classes.contentContainer} py={60} mt={15}>
        <Flex align={'center'} justify={'center'} h={'100%'}>
          <Stack align="center">
            <IconFile size={100} />
            <Text c={appColors.black} fw={600} fz={'1.5rem'}>
              Drag & drop your files here
            </Text>
            <Text c={appColors.subText} fw={600} fz={'1rem'}>
              OR
            </Text>
            <Box
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FileInput
                accept=".csv"
                display={'none'}
                ref={fileUploadRef}
                onChange={handleFileInputChange}
              />
              <Text
                c={appColors.blue}
                fw={600}
                fz={'1rem'}
                td="underline"
                style={{ cursor: 'pointer' }}
                onClick={handleOpenFileUploadDialog}
              >
                Click here to select files from your computer
              </Text>
            </Box>
            <Text fw={500} fz={'1rem'}>
              (Files allowed: CSV)
            </Text>
            <Text fw={500} fz={'1rem'}>
              Maximum file upload size: 3MB
            </Text>
            <Button
              variant="default"
              h={40}
              style={{ border: `1px solid ${appColors.blue}`, color: appColors.blue }}
            >
              Download sample CSV
            </Button>
          </Stack>
        </Flex>
      </Stack>
      <Flex justify="flex-end" mt={10}>
        <Button
          h={40}
          style={{ borderRadius: 10 }}
          onClick={handleUploadCSV}
          disabled={!file}
        >
          {isUploadingCSV ? 'Saving...' : 'Save'}
          {isUploadingCSV && <Loader size={24} color={appColors.blue} />}
        </Button>
      </Flex>
    </Modal>
  );
};
