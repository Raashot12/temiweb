import { Box, Grid, Group, Text } from '@mantine/core';
import React from 'react';
import { appColors } from '@/theme/colors';
import IconWritePencil from '@/components/shared/IconComponents/IconWritePencil';
import IconPharmacyLogo from '@/components/shared/IconComponents/IconPharmacyLogo';

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Box mb={18}>
    <Text c={appColors.text} fz={14} fw={500}>
      {label}
    </Text>
    <Text c={appColors.black} fz={16} fw={600}>
      {value}
    </Text>
  </Box>
);

const Column = ({
  children,
  withRightBorder = false,
}: {
  children: React.ReactNode;
  withRightBorder?: boolean;
}) => (
  <Box
    pr={{ md: 24 }}
    style={{
      borderRight: withRightBorder
        ? `1px dashed ${appColors.alloyOrange}`
        : 'none',
    }}
  >
    {children}
  </Box>
);

const PharmacyGroupReviewDetails = () => {
  return (
    <Box>
      {/* Header strip */}
      <Box bg={appColors.quatreFade} p={6} mb={8} style={{ borderRadius: 3 }}>
        <Group justify="space-between">
          <Text c={appColors.text} fw={600}>
            Pharmacy Group
          </Text>
          <Group gap={8} style={{ cursor: 'pointer' }}>
            <IconWritePencil />
            <Text c={appColors.blue} fw={600}>
              Edit
            </Text>
          </Group>
        </Group>
      </Box>
      <Box bg={appColors.white} px={16} py={8}>
        <IconPharmacyLogo />
        <Grid gutter="xl" mt={10}>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Column>
              <Field label="Pharmacy group type" value="Private" />
              <Field label="Country" value="Nigeria" />
              <Field label="Pharmacy phone number" value="+234 1 234 5678" />
              <Field label="Post code" value="101233" />
            </Column>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Column>
              <Field
                label="Pharmacy group name"
                value="Health Haven Pharmacy"
              />
              <Field label="State/Province" value="Lagos State" />
              <Field
                label="Pharmacy email address"
                value="info@Healthhavenpharmacy.com"
              />
            </Column>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Column>
              <Field
                label="Pharmacy group address"
                value="123 Awolowo Road, Ikoyi, Lagos, Nigeria"
              />
              <Field label="City/Town" value="Lagos State" />
              <Field
                label="Pharmacy website"
                value="www.Healthhavenpharmacy.com"
              />
            </Column>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default PharmacyGroupReviewDetails;
