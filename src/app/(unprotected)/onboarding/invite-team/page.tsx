'use client';
import PageLabel from '@/components/shared/PageLabel';
import OnboardingShell from '@/layouts/Onbarding/OnboardingShell';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Box, Button, Divider, Flex, Grid, Text } from '@mantine/core';
import {
  createFacilityDetailsDefaultValues,
  CreateFacilityDetailsSchema,
  createFacilityDetailsSchema,
} from '../components/formUtils/validationSchema';
import { useForm } from 'react-hook-form';
import CollapsibleBox from '@/components/shared/CollapsibleBox';
import { appColors } from '@/theme/colors';
import { CustomFormSelect } from '@/components/shared/CustomSelect';
import IconArrowInput from '@/components/shared/IconComponents/IconArrowInput';
import { CustomFormInput } from '@/components/shared/CustomTextInput';
import {
  TableGrid,
  TableGridColumn,
} from '@/components/shared/GridTableLayout';
import { IconPencil, IconPower } from '@tabler/icons-react';

const InviteMembersPage = () => {
  const { control } = useForm<CreateFacilityDetailsSchema>({
    defaultValues: {
      ...createFacilityDetailsDefaultValues,
      category: '',
    },
    resolver: zodResolver(createFacilityDetailsSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  type Member = {
    id: string;
    role: string;
    outletType: string;
    status: 'Invited' | 'Active' | 'Disabled';
  };

  const members: Member[] = [
    {
      id: '1',
      role: 'Cashier',
      outletType: 'testmail@plural.health',
      status: 'Invited',
    },
    {
      id: '2',
      role: 'Pharmacist',
      outletType: 'testmail@plural.health',
      status: 'Invited',
    },
    {
      id: '3',
      role: 'Pharmacy technician',
      outletType: 'testmail@plural.health',
      status: 'Invited',
    },
  ];

  const columns: TableGridColumn<Member>[] = [
    {
      label: 'Role',
      span: 3,
      justify: 'center',
      align: 'flex-start',
      render: (row) => (
        <Text c={appColors.black} fz={14} fw={500}>
          {row.role}
        </Text>
      ),
    },
    {
      label: 'Outlet type',
      justify: 'center',
      align: 'flex-start',
      span: 4,
      render: (row) => (
        <Text c={appColors.black} fz={14} fw={500}>
          {row.outletType}
        </Text>
      ),
    },
    {
      label: 'Status',
      justify: 'center',
      align: 'flex-start',
      span: 3,
      render: (row) => (
        <Box
          bg={appColors.yellowAccent}
          c={appColors.yellowDeep}
          px="sm"
          py={4}
          style={{ borderRadius: 16, display: 'inline-flex' }}
        >
          <Text fz={12} fw={600}>
            {row.status}
          </Text>
        </Box>
      ),
    },
    {
      label: 'Actions',
      span: 2,
      thJustify: 'flex-end',
      render: () => (
        <Flex align="center" justify="flex-end" gap="md" w="100%">
          <Box
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: `1px solid ${appColors.blueAccent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Edit"
          >
            <IconPencil size={16} color={appColors.primary200} />
          </Box>
          <Box
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: `1px solid ${appColors.fadeRedAccent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Disable"
          >
            <IconPower size={16} color={appColors.buttonRed} />
          </Box>
        </Flex>
      ),
      align: 'flex-end',
    },
  ];

  return (
    <OnboardingShell
      title="Insurer Details"
      handleContinue={() => {}}
      btnText={'Continue'}
      first={true}
      isLoading={false}
      isRequired={false}
      updateOnboardingStatus={[]}
    >
      <PageLabel
        title="Invite team menbers"
        description="Pick a role and send an invite to that team member."
      />
      <CollapsibleBox
        title={
          <Text fz={16} fw={500} c={appColors.text}>
            Pharmacy group
          </Text>
        }
      >
        <Divider color={appColors.halfFade}></Divider>
        <Text style={{ color: appColors.text }} fw={600} mt={5}>
          Team members in this section are not bound to a specific outlet
        </Text>
        <Flex align="flex-end" justify="center" gap="xl">
          <Grid gutter={'xl'} style={{ flex: 1 }}>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <CustomFormSelect
                control={control}
                name="level"
                label="Role"
                placeholder="Select role"
                searchable
                data={['Primary', 'Secondary', 'Tertiary']}
                rightSection={<IconArrowInput fill={appColors.lowerText} />}
                width="100%"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
              <CustomFormInput
                control={control}
                name="name"
                label="Email address"
                type="email"
                placeholder="Enter email address"
                width="100%"
              />
            </Grid.Col>
          </Grid>
          <Button
            mah={32}
            style={{
              backgroundColor: appColors.white,
              color: appColors.burple,
              border: `1px solid ${appColors.burple}`,
            }}
          >
            Add
          </Button>
        </Flex>
        <Box mt="md">
          <TableGrid<Member> columns={columns} data={members} rowKey="id" />
        </Box>
      </CollapsibleBox>
    </OnboardingShell>
  );
};

export default InviteMembersPage;
