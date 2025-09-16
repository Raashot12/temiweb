import { Flex, Text, Table } from '@mantine/core';
import React from 'react';
import styled from '@emotion/styled';

const styles = {
  infoText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#051438',
  },
  textKey: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#677597',
  },
  textValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#051438',
  },
};

const PointerDiv = styled.div`
  cursor: pointer;
`;

type PatientData = {
  bloodGroup: string | null;
  bloodGenotype: string | null;
  lastSeenByDoctorName: string | null;
  lastSeenByDoctor: string | null;
};

const OutPatientHeader = () => {
  // Static patient data
  const patient: PatientData = {
    bloodGroup: 'O+',
    bloodGenotype: 'AA',
    lastSeenByDoctorName: 'Dr. Amina Ibrahim',
    lastSeenByDoctor: '2024-01-15T14:30:00Z',
  };
  return (
    <Flex
      style={{ background: '#E6E8EB', borderRadius: 10 }}
      py={16}
      mt={{ base: 180, sm: 18 }}
      mb={24}
      px={{ base: 15, sm: 15 }}
      align="center"
      justify={'space-between'}
      columnGap={10}
      wrap="wrap"
    >
      <Table
        style={{
          td: {
            textAlign: 'center',
          },
          'td:first-child': {
            textAlign: 'left',
          },
          'td:last-child': {
            textAlign: 'right',
          },
        }}
      >
        <tbody>
          <tr>
            <td>
              <PointerDiv>
                <Text span style={styles.textKey}>
                  Blood group:
                </Text>{' '}
                <Text span style={styles.textValue}>
                  {!patient.bloodGroup ? '----' : patient.bloodGroup}
                </Text>
              </PointerDiv>
            </td>
            <td>
              <PointerDiv>
                <Text span style={styles.textKey}>
                  Genotype:
                </Text>{' '}
                <Text span style={styles.textValue}>
                  {!patient.bloodGenotype ? '----' : patient.bloodGenotype}
                </Text>
              </PointerDiv>
            </td>
            <td>
              <PointerDiv>
                <Text span style={styles.textKey}>
                  Last seen by Doctor:
                </Text>{' '}
                <Text span style={styles.textValue}>
                  {!patient.lastSeenByDoctorName ? (
                    '----'
                  ) : (
                    <>
                      {patient.lastSeenByDoctorName} |{' '}
                      {patient.lastSeenByDoctor
                        ? new Date(patient.lastSeenByDoctor).toLocaleDateString(
                            'en-US',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            },
                          )
                        : ''}
                    </>
                  )}
                </Text>
              </PointerDiv>
            </td>
          </tr>
        </tbody>
      </Table>
    </Flex>
  );
};

export default OutPatientHeader;
