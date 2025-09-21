import { momentBrowserTimezone } from '@/utils/utils';
import { Box, Button, Flex, Text } from '@mantine/core';
import React from 'react';
import { useAlertNotification } from '@/hooks/useNotification';
import CloseIcon from '../IconComponents/IconClose';
import NoRecordFound from '@/app/(protected)/laboratory/components/NoRecordFound';
import { downloadClaimsData } from './SpreedSheetData';
import styled from '@emotion/styled';

export const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  thead {
    width: 100%;
    text-align: left;
  }
  thead > th {
    padding: 6px 8px;
    vertical-align: top;
  }

  td {
    padding: 6px 8px;
    vertical-align: top;
    font-weight: 500;
  }
  th {
    font-weight: 600;
  }

  table,
  th,
  td {
    border: 1px solid #051438;
    font-size: 14px;
    white-space: nowrap;
  }
`;
const DownloadClaimsTable = ({
  insuranceProviderName,
}: {
  insuranceProviderName?: string;
}) => {
  return (
    <>
      {(downloadClaimsData || [])?.length === 0 ? (
        <Box mt={30} h="75vh">
          <NoRecordFound
            mainText={`No claims to download`}
            wrapperStyles={{ width: '100%', height: '100%' }}
            subText="There are no claims to download"
          />
        </Box>
      ) : (
        <Box
          mt={20}
          sx={{
            backgroundColor: 'white',
            margin: '0 auto',
            width: '100%',
            height: '78vh',
            overflowX: 'scroll',
          }}
          p={16}
          className="container"
        >
          <Text
            fw={600}
            sx={{ fontSize: 14, textTransform: 'uppercase' }}
            mb={10}
          >
            PREVIEW CLAIMS SUMMARY for patient seen
          </Text>
          <Table cellPadding="5" cellSpacing="4">
            <thead>
              <tr>
                <th>S/N</th>
                <th>DATE</th>
                <th>NAME</th>
                <th>PATIENT NUMBER</th>
                <th>PATIENT TYPE</th>
                <th>PHONE NUMBER</th>
                <th>HMO NUMBER</th>
                <th>HMO INSURANCE NAME</th>
                {/* <th>INSURER COVERAGE</th> */}
                <th>AUTHORIZED ADMNISTRATOR</th>
                <th>AUTHORIZATION CODE</th>
                <th>CLINIC</th>
                <th>DIAGNOSIS</th>
                <th>SERVICE CATEGORY</th>
                <th>SERVICE NAME</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <>
              {downloadClaimsData?.map(
                (
                  {
                    date,
                    patientName,
                    fileNo,
                    patientType,
                    phoneNo,
                    nhisNo,
                    hmoInsuranceName,
                    authorizedAdministrator,
                    authorizationCode,
                    clinic,
                    diagnosis,
                    serviceCategory,
                    serviceName,
                    amount,
                  },
                  i,
                ) => {
                  return (
                    <tr key={fileNo}>
                      <td>{i + 1}</td>
                      <td>
                        {momentBrowserTimezone(date).format('DD MMM YYYY')}
                      </td>
                      <td>{patientName}</td>
                      <td>{fileNo}</td>
                      <td>{patientType}</td>
                      <td>{phoneNo}</td>
                      <td>{nhisNo}</td>
                      <td>{hmoInsuranceName}</td>
                      <td>{authorizedAdministrator}</td>
                      <td>{authorizationCode}</td>
                      <td>{clinic}</td>
                      <td>{diagnosis}</td>
                      <td>{serviceCategory}</td>
                      <td>{serviceName}</td>
                      <td>₦{amount.toLocaleString()}</td>
                    </tr>
                  );
                },
              )}
            </>
          </Table>
        </Box>
      )}
    </>
  );
};

export default DownloadClaimsTable;
