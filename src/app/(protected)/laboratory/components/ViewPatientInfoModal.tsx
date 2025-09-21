import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Group,
  Avatar,
  Divider,
  Badge,
  Grid,
  Stack,
} from '@mantine/core';
import {
  IconUser,
  IconPhone,
  IconMail,
  IconCalendar,
  IconMapPin,
  IconGenderMale,
  IconGenderFemale,
  IconId,
  IconHeart,
} from '@tabler/icons-react';
import ModalLayoutWrapper from '@/components/shared/ModalLayoutWrapper';
import IconCloseModal from '@/components/shared/IconComponents/IconCloseModal';
import { formatCurrency } from '@/utils/constants';

interface ViewPatientInfoModalProps {
  opened: boolean;
  onClose: () => void;
  patientDetail: any;
  investigationDetails?: any;
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const calculateAge = (birthDate: string) => {
  if (!birthDate) return 'N/A';
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return `${age} years`;
};

const ViewPatientInfoModal: React.FC<ViewPatientInfoModalProps> = ({
  opened,
  onClose,
  patientDetail,
  investigationDetails,
}) => {
  if (!patientDetail) return null;

  const getGenderIcon = (gender: string) => {
    const genderLower = gender?.toLowerCase();
    if (genderLower === 'male' || genderLower === 'm') {
      return <IconGenderMale size={16} color="#2196F3" />;
    } else if (genderLower === 'female' || genderLower === 'f') {
      return <IconGenderFemale size={16} color="#E91E63" />;
    }
    return <IconUser size={16} />;
  };

  const getBloodTypeColor = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'A+': '#FF5722',
      'A-': '#FF8A65',
      'B+': '#2196F3',
      'B-': '#64B5F6',
      'AB+': '#9C27B0',
      'AB-': '#BA68C8',
      'O+': '#4CAF50',
      'O-': '#81C784',
    };
    return colors[bloodType] || '#666';
  };

  return (
    <ModalLayoutWrapper
      open={opened}
      title={
        <Flex justify="space-between" align="center">
          <Box>
            <Text fw={600}>Patient Information</Text>
            <Text c="dimmed" size="sm">
              Complete patient profile and medical details
            </Text>
          </Box>
          <IconCloseModal handleClose={onClose} />
        </Flex>
      }
      size="60"
      footer={
        <Group justify="flex-end" mt="sm">
          <Button variant="light" onClick={onClose}>
            Close
          </Button>
        </Group>
      }
    >
      <Box p="md">
        {/* Patient Header */}
        <Flex align="center" mb="xl">
          <Avatar
            size={80}
            radius="xl"
            src={patientDetail.profilePicture}
            style={{
              border: '3px solid #E3F2FD',
              background: '#F5F5F5',
            }}
          >
            <IconUser size={40} />
          </Avatar>
          <Box ml="md" flex={1}>
            <Text size="xl" fw={700} c="#1976D2">
              {patientDetail.patientDisplayName || 'N/A'}
            </Text>
            <Flex align="center" gap="xs" mt="xs">
              {getGenderIcon(patientDetail.gender)}
              <Text size="sm" c="dimmed">
                {patientDetail.gender || 'N/A'} • {calculateAge(patientDetail.dateOfBirth)}
              </Text>
              {patientDetail.bloodType && (
                <>
                  <Text c="dimmed">•</Text>
                  <Badge
                    variant="light"
                    color={getBloodTypeColor(patientDetail.bloodType)}
                    size="sm"
                    leftSection={<IconHeart size={12} />}
                  >
                    {patientDetail.bloodType}
                  </Badge>
                </>
              )}
            </Flex>
          </Box>
        </Flex>

        <Divider mb="md" />

        <Grid>
          <Grid.Col span={6}>
            <Stack gap="md">
              {/* Personal Information */}
              <Box>
                <Text fw={600} mb="sm" c="#1976D2">
                  Personal Information
                </Text>
                <Stack gap="xs">
                  <Flex align="center" gap="xs">
                    <IconId size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Patient ID:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.patientId || 'N/A'}
                    </Text>
                  </Flex>
                  
                  <Flex align="center" gap="xs">
                    <IconCalendar size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Date of Birth:
                    </Text>
                    <Text size="sm" fw={500}>
                      {formatDate(patientDetail.dateOfBirth)}
                    </Text>
                  </Flex>

                  <Flex align="center" gap="xs">
                    <IconUser size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Age:
                    </Text>
                    <Text size="sm" fw={500}>
                      {calculateAge(patientDetail.dateOfBirth)}
                    </Text>
                  </Flex>

                  <Flex align="center" gap="xs">
                    <IconHeart size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Blood Type:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.bloodType || 'N/A'}
                    </Text>
                  </Flex>

                  <Flex align="center" gap="xs">
                    <IconUser size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Marital Status:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.maritalStatus || 'N/A'}
                    </Text>
                  </Flex>
                </Stack>
              </Box>

              {/* Emergency Contact */}
              {patientDetail.emergencyContact && (
                <Box>
                  <Text fw={600} mb="sm" c="#1976D2">
                    Emergency Contact
                  </Text>
                  <Stack gap="xs">
                    <Flex align="center" gap="xs">
                      <IconUser size={16} color="#666" />
                      <Text size="sm" c="dimmed" w={120}>
                        Name:
                      </Text>
                      <Text size="sm" fw={500}>
                        {patientDetail.emergencyContact.name || 'N/A'}
                      </Text>
                    </Flex>
                    
                    <Flex align="center" gap="xs">
                      <IconPhone size={16} color="#666" />
                      <Text size="sm" c="dimmed" w={120}>
                        Phone:
                      </Text>
                      <Text size="sm" fw={500}>
                        {patientDetail.emergencyContact.phone || 'N/A'}
                      </Text>
                    </Flex>

                    <Flex align="center" gap="xs">
                      <IconUser size={16} color="#666" />
                      <Text size="sm" c="dimmed" w={120}>
                        Relationship:
                      </Text>
                      <Text size="sm" fw={500}>
                        {patientDetail.emergencyContact.relationship || 'N/A'}
                      </Text>
                    </Flex>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack gap="md">
              {/* Contact Information */}
              <Box>
                <Text fw={600} mb="sm" c="#1976D2">
                  Contact Information
                </Text>
                <Stack gap="xs">
                  <Flex align="center" gap="xs">
                    <IconPhone size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Phone:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.phoneNumber || 'N/A'}
                    </Text>
                  </Flex>
                  
                  <Flex align="center" gap="xs">
                    <IconMail size={16} color="#666" />
                    <Text size="sm" c="dimmed" w={120}>
                      Email:
                    </Text>
                    <Text size="sm" fw={500} style={{ wordBreak: 'break-word' }}>
                      {patientDetail.email || 'N/A'}
                    </Text>
                  </Flex>

                  <Flex align="flex-start" gap="xs">
                    <IconMapPin size={16} color="#666" style={{ marginTop: '2px' }} />
                    <Text size="sm" c="dimmed" w={120}>
                      Address:
                    </Text>
                    <Text size="sm" fw={500} style={{ lineHeight: 1.4 }}>
                      {patientDetail.address || 'N/A'}
                    </Text>
                  </Flex>
                </Stack>
              </Box>

              {/* Medical Information */}
              <Box>
                <Text fw={600} mb="sm" c="#1976D2">
                  Medical Information
                </Text>
                <Stack gap="xs">
                  <Box>
                    <Text size="sm" c="dimmed" mb="xs">
                      Allergies:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.allergies || 'No known allergies'}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text size="sm" c="dimmed" mb="xs">
                      Medical History:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.medicalHistory || 'No significant medical history'}
                    </Text>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed" mb="xs">
                      Current Medications:
                    </Text>
                    <Text size="sm" fw={500}>
                      {patientDetail.currentMedications || 'No current medications'}
                    </Text>
                  </Box>
                </Stack>
              </Box>

              {/* Insurance Information */}
              {patientDetail.insurance && (
                <Box>
                  <Text fw={600} mb="sm" c="#1976D2">
                    Insurance Information
                  </Text>
                  <Stack gap="xs">
                    <Flex align="center" gap="xs">
                      <Text size="sm" c="dimmed" w={120}>
                        Provider:
                      </Text>
                      <Text size="sm" fw={500}>
                        {patientDetail.insurance.provider || 'N/A'}
                      </Text>
                    </Flex>
                    
                    <Flex align="center" gap="xs">
                      <Text size="sm" c="dimmed" w={120}>
                        Policy Number:
                      </Text>
                      <Text size="sm" fw={500}>
                        {patientDetail.insurance.policyNumber || 'N/A'}
                      </Text>
                    </Flex>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Investigation Details */}
        {investigationDetails && (
          <>
            <Divider my="md" />
            <Box>
              <Text fw={600} mb="sm" c="#1976D2">
                Current Investigation
              </Text>
              <Box
                style={{
                  background: '#F8F9FA',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <Flex justify="space-between" align="center" mb="xs">
                  <Text size="sm" fw={500}>
                    {investigationDetails.investigationName}
                  </Text>
                  <Badge
                    variant="light"
                    color={
                      investigationDetails.paymentStatus === 'Paid'
                        ? 'green'
                        : investigationDetails.paymentStatus === 'Partially Paid'
                          ? 'orange'
                          : 'red'
                    }
                  >
                    {investigationDetails.paymentStatus}
                  </Badge>
                </Flex>
                
                <Flex justify="space-between" align="center">
                  <Text size="sm" c="dimmed">
                    Amount:
                  </Text>
                  <Text size="sm" fw={600}>
                    {investigationDetails.amount
                      ? formatCurrency(investigationDetails.amount.amount)
                      : 'N/A'}
                  </Text>
                </Flex>

                {investigationDetails.partialAmount && (
                  <Flex justify="space-between" align="center" mt="xs">
                    <Text size="sm" c="green">
                      Paid Amount:
                    </Text>
                    <Text size="sm" fw={600} c="green">
                      {formatCurrency(investigationDetails.partialAmount)}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ModalLayoutWrapper>
  );
};

export default ViewPatientInfoModal;
