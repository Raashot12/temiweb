import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Group,
  Button,
  TextInput,
  Select,
  Avatar,
  NumberInput,
  Alert,
} from '@mantine/core';
import { appColors } from '@/theme/colors';
import { formatCurrency } from '@/utils/constants';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { IconCash, IconCreditCard, IconWallet, IconCheck, IconAlertCircle, IconUser } from '@tabler/icons-react';

interface PatientInfo {
  patientId?: number;
  patientCode: string;
  patientDisplayName: string;
  age: string;
  gender: string;
  walletBalance: number;
}

interface FundWalletModalProps {
  open: boolean;
  onClose: () => void;
  patientInfo: PatientInfo;
  onSuccess?: (amount: number, method: string) => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  open,
  onClose,
  patientInfo,
  onSuccess,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>('Cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentMethods = [
    { value: 'Cash', label: 'Cash' },
    { value: 'POS deposit', label: 'POS deposit' },
    { value: 'Wire transfer', label: 'Wire transfer' },
  ];

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // In a real application, this would be an API call to process the payment
      console.log('Processing wallet funding:', {
        patientId: patientInfo.patientId,
        amount,
        method: paymentMethod,
      });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(amount, paymentMethod);
      }

      // Reset and close modal
      setAmount(0);
      setPaymentMethod('Cash');
      onClose();

      // Show success message
      alert(`Successfully added ${formatCurrency(amount)} to patient's wallet`);
    } catch (err) {
      console.error('Error funding wallet:', err);
      setError('An error occurred while processing the payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalLayoutWrapper
      open={open}
      title={
        <Flex justify="space-between" align="center">
          <Box>
            <Text fw={600}>Fund wallet</Text>
            <Text c="dimmed" size="sm">
              Add funds to patient wallet
            </Text>
          </Box>
          <IconCloseModal handleClose={onClose} />
        </Flex>
      }
      size="50"
      footer={
        <Group justify="flex-end" mt="sm">
          <Button variant="light" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            loading={isProcessing}
            onClick={handleSubmit}
            leftSection={<IconCheck size={16} />}
          >
            Fund wallet
          </Button>
        </Group>
      }
    >
      <Box p="md">
        {/* Patient Information */}
        <Box mb="lg" p="md" bg="gray.0" style={{ borderRadius: '8px' }}>
          <Flex align="center" mb="md">
            <Avatar 
              radius="xl" 
              size="md"
              color="blue"
              mr="md"
            >
              {patientInfo.patientDisplayName?.charAt(0) || ''}
            </Avatar>
            <Box>
              <Text fw={600}>{patientInfo.patientDisplayName}</Text>
              <Flex gap="xs">
                <Text size="sm" c="dimmed">{patientInfo.patientCode}</Text>
                <Text size="sm" c="dimmed">•</Text>
                <Text size="sm" c="dimmed">{patientInfo.age}</Text>
                <Text size="sm" c="dimmed">•</Text>
                <Text size="sm" c="dimmed">{patientInfo.gender}</Text>
              </Flex>
            </Box>
          </Flex>

          <Group>
            <Text size="sm" fw={500}>Current wallet balance →</Text>
            <Text fw={700} size="lg" c={appColors.blue}>
              {formatCurrency(patientInfo.walletBalance || 0)}
            </Text>
          </Group>
        </Box>

        {error && (
          <Alert color="red" mb="md" icon={<IconAlertCircle size={16} />}>
            {error}
          </Alert>
        )}

        <Flex direction="column" gap="md">
          {/* Amount Input */}
          <Box>
            <Text size="sm" mb="xs">
              Enter amount
            </Text>
            <NumberInput
              placeholder="Enter amount"
              value={amount}
              onChange={(val) => setAmount(Number(val) || 0)}
              min={0}
              prefix="₦"
              thousandSeparator=","
              required
              styles={{
                input: {
                  fontSize: '1rem',
                  height: '50px',
                },
              }}
            />
          </Box>

          {/* Payment Method Selection */}
          <Box>
            <Text size="sm" mb="xs">
              Payment method
            </Text>
            <Select
              data={paymentMethods}
              value={paymentMethod}
              onChange={setPaymentMethod}
              placeholder="Select payment method"
              styles={{
                input: {
                  height: '50px',
                },
              }}
            />
          </Box>
          
          <Box>
            <Text fw={500} c="dimmed">Funded by:</Text>
            <Flex mt="xs" align="center" gap="md">
              <IconUser size={20} style={{ color: appColors.blue, border: `1px solid ${appColors.blue}`, borderRadius: '50%' }} />
              <Text fw={500}>CM. Tori</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </ModalLayoutWrapper>
  );
};

export default FundWalletModal;
