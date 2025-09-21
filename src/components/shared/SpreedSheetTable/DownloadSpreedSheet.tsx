import { Button, Flex, Text } from "@mantine/core";
import CloseIcon from "../IconComponents/IconClose";
import { appColors } from "@/theme/colors";

export const DownloadSpreedSheet = ({
    handleClose,
    showDownload,
    onDownloadClick,
    isLoading,
    title,
    subText,
  }: {
    handleClose: () => void;
    showDownload?: boolean;
    onDownloadClick?: () => void;
    isLoading?: boolean;
    title?: string;
    subText?: string;
  }) => {
    return (
      <Flex align={'center'} justify="space-between">
        <Text sx={{ fontSize: '18px' }} fw={600}>
          {title}
        </Text>
        <Text sx={{ fontSize: '13px' }} c={appColors?.grayLight}fw={600}>
          {subText}
        </Text>
        <Flex align={'center'} columnGap={32}>
          {showDownload && (
            <Button
              disabled={isLoading}
              onClick={onDownloadClick}
              sx={{ maxHeight: '34px' }}
            >
              {isLoading ? 'Downloading...' : 'Download Excel'}
            </Button>
          )}
          <CloseIcon handleClose={() => handleClose?.()} />
        </Flex>
      </Flex>
    );
  };