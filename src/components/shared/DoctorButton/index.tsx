import styled from '@emotion/styled';
import { Button, Flex, Select } from '@mantine/core';
import React, { Dispatch, SetStateAction } from 'react';
import { InputType } from '@/types/index';
import IconInputClose from '../IconComponents/IconInputClose';
export const SHOW_A_AND_E_DIALOG = 'showAandEWard';

export const CustomSelect = styled(Select)<{ bgcolor?: string }>`
  & input {
    width: 13rem;
    font-weight: 600;
    background: ${(props) =>
      props.bgcolor ? `${props.bgcolor}` : 'rgb(11, 12, 125)'};
    color: white;
    &:hover {
      border: none;
    }
    &:disabled {
      background: rgb(11, 12, 125, 0.25);
      color: linen;
      opacity: 1;
    }
    &::placeholder {
      color: white;
    }
  }
`;
const DoctorButton = ({
  patientId,
  encounterId,
  onchangeFunc,
  handleTransferModal,
  handleReviewSave,
  inputType,
}: {
  patientId: number;
  encounterId: number;
  onchangeFunc?: Dispatch<SetStateAction<null | string | boolean>>;
  handleTransferModal?: () => void;
  handleReviewSave?: () => void;
  inputType: InputType;
}) => {
  // Static patient data
  const patientDetails = {
    encounterStatus: 'Active',
    dateAdmitted: null,
  };
  const patientDetailsLoading = false;

  const dischargeMap = new Map<InputType, string[]>([
    [
      InputType.AE,
      ['Discharge', 'Discharge against medical advice', 'Mark as deceased'],
    ],
    [
      InputType.OUTPATIENT,
      ['Discharge', 'Discharge against medical advice', 'Mark as deceased'],
    ],
    [
      InputType.ANTENATAL,
      ['Discharge', 'Discharge against medical advice', 'Mark as deceased'],
    ],
    [
      InputType.LABOUR,
      ['Discharge', 'Discharge against medical advice', 'Mark as deceased'],
    ],
    [
      InputType.INPATIENT,
      [
        'Discharge',
        'Discharge against medical advice',
        'Suspend admission',
        'Mark as deceased',
        'Transfer',
      ],
    ],
  ]);

  return (
    <Flex columnGap={32} wrap="wrap" rowGap="md">
      <CustomSelect
        data-cy="refer-or-consult"
        disabled={patientDetails?.encounterStatus === 'Deceased'}
        data={['Refer', 'Consult']}
        onChange={onchangeFunc}
        fw={600}
        placeholder="Refer or consult"
        rightSection={<IconInputClose fill="white" />}
        bgcolor="#FF9D33"
      />
      {inputType !== InputType.INPATIENT && (
        <Button
          data-cy="next-appointment"
          disabled={patientDetails?.encounterStatus === 'Deceased'}
          onClick={handleTransferModal}
          sx={{
            backgroundColor: '#ffff',
            color: '#051438',
            '&:hover': {
              background: '#ffff',
            },
            '&:disabled': {
              backgroundColor: '#A6AFC2',
              color: '#fff',
              cursor: 'not-allowed',
            },
          }}
        >
          Next appointment
        </Button>
      )}

      {!patientDetailsLoading &&
      !patientDetailsLoading &&
      ![
        'Discharge pending',
        'Discharged',
        'Transfer out pending',
        'Transferred',
      ].includes(patientDetails?.encounterStatus ?? '') ? ( // Doctors should not see it if pending
        <CustomSelect
          data-cy="discharge"
          disabled={patientDetails?.encounterStatus === 'Deceased'}
          data={dischargeMap.get(inputType) || []}
          sx={{
            display:
              patientDetails?.encounterStatus === 'Deceased' ? 'none' : 'block',
          }}
          onChange={onchangeFunc}
          fw={600}
          defaultValue="Discharge"
          rightSection={<IconInputClose fill="white" />}
        />
      ) : (
        <Button
          disabled
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            backgroundColor: '#0B0C7D',
            '&:disabled': {
              backgroundColor: '#A6AFC2',
              color: '#fff',
              cursor: 'not-allowed',
            },
          }}
        >
          {patientDetails?.encounterStatus === 'Discharged'
            ? 'Discharged'
            : patientDetails?.encounterStatus === "Awaiting Nurses' transfer"
              ? 'Transfer initiated'
              : patientDetails?.encounterStatus === 'Transferred'
                ? 'Transferred'
                : 'Discharge initiated'}
        </Button>
      )}

      {patientDetails?.encounterStatus === 'Deceased' ? (
        <Button
          disabled
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            backgroundColor: '#0B0C7D',
            '&:disabled': {
              backgroundColor: '#A6AFC2',
              color: '#fff',
              cursor: 'not-allowed',
            },
          }}
        >
          Marked as deceased
        </Button>
      ) : null}
      <Button
        data-cy={'review-and-save-button'}
        sx={{
          backgroundColor: '#27AE60',
          '&:hover': {
            background: '#27AE60',
          },
        }}
        onClick={handleReviewSave}
      >
        Review and save
      </Button>
    </Flex>
  );
};

export default DoctorButton;
