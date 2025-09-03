'use client';
import { Button, Stack, Text } from '@mantine/core';
import Script from 'next/script';
import React, { useEffect } from 'react';

interface MonnifyIncomeSplitConfig {
  subAccountCode: string;
  feePercentage: number;
  splitAmount: number;
  feeBearer: boolean;
}

type TransactionResponse = {
  amount: number;
  amountPaid: number;
  completed: boolean;
  completedOn: string;
  createdOn: string;
  currencyCode: string;
  customerEmail: string;
  customerName: string;
  fee: number;
  metaData: {
    deviceType: string;
    ipAddress: string;
  };
  payableAmount: number;
  paymentMethod: string;
  paymentReference: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | 'CANCELLED';
  transactionReference: string;
};

interface MonnifyInitializeOptions {
  amount: string;
  currency: string;
  reference: string;
  customerFullName: string;
  customerEmail: string;
  apiKey: string;
  contractCode: string;
  paymentDescription: string;
  metadata: Record<string, unknown>;
  incomeSplitConfig?: MonnifyIncomeSplitConfig[];
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onComplete: (response: TransactionResponse) => void;
  onClose?: (data: unknown) => void;
}

interface MonnifyPaymentProps {
  options: MonnifyInitializeOptions;
  loading: boolean;
}

const MonnifyPayment: React.FC<MonnifyPaymentProps> = ({
  options,
  loading,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.MonnifySDK) {
      console.log(' Monnify SDK Loaded ');
    }
  }, []);

  const handlePayment = () => {
    if (typeof window !== 'undefined' && window.MonnifySDK) {
      window.MonnifySDK.initialize(options);
    } else {
      console.error(' Monnify SDK is not loaded yet ');
    }
  };

  return (
    <Stack h="100vh" align="center" justify="center">
      <Script
        strategy="lazyOnload"
        src="https://sdk.monnify.com/plugin/monnify.js"
      ></Script>
      <Text fw={600} fz={18}>
        Continue with Payment?
      </Text>
      <Button loading={loading} size="xl" onClick={handlePayment}>
        Pay with Monnify
      </Button>
      ;
    </Stack>
  );
};

export default MonnifyPayment;
