'use client';

import React, { useState, Suspense } from 'react';
import Dashboard from '@/layouts/Dashboard';
import { Box, Flex, em } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import OutPatientHeader from './components/OutPatientHeader';
import DoctorButton from '@/components/shared/DoctorButton';
import { InputType } from '@/types/index';
import CustomOptionSelect from '@/components/shared/CustomAllInputPanel';
import { useMediaQuery } from '@mantine/hooks';
import Investigations from './components/Investigations';
import Prescription from './components/Prescription';

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

const PatientAllInputsContent = () => {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [selectionOptions, setSelectionOptions] = useState<
    null | string | boolean
  >(null);

  // Mock data for missing variables
  const data = { id: parseInt(patientId || '0') };
  const encounterId = searchParams.get('encounterId') || '1';

  const handleTransferModal = () => {
    console.log('Transfer modal opened');
  };
  const isMobile = useMediaQuery(`(max-width: ${em(1024)})`);
  const handleReviewSave = () => {
    console.log('Review and save clicked');
  };

  return (
    <Dashboard title="Patient All Inputs">
      <Box>
        <OutPatientHeader />

        <Flex gap={15} direction={isMobile ? 'column' : 'row'}>
          <Flex w={isMobile ? '100%' : '50%'} direction="column" gap={15}>
            {/* {inputType === InputType.LABOUR && (
              <CustomOptionSelect
                title="Current pregnancy"
                showSubtitle={false}
                subtitle={'Nursing care plan'}
                strappedText={'Current pregnancy'}
                tabName="Current pregnancy"
                data-cy="labour-current-pregnancy"
              >
                <CurrentPregnancy
                  patientId={data.id ?? 0}
                  encounterId={Number(encounterId)}
                  data={{}}
                />
              </CustomOptionSelect>
            )} */}

            <CustomOptionSelect
              title="Investigations"
              showSubtitle={false}
              strappedText={'Request & record investigations'}
              showTabPanel={false}
              data-testid={'investigations-main'}
              tabName="Request & record investigations"
            >
              <Investigations
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
              />
            </CustomOptionSelect>
            <CustomOptionSelect
              title="Prescription"
              showSubtitle={false}
              strappedText={'Prescribe medication & vaccination'}
              showTabPanel={false}
              tabName="Prescription"
              data-testid={'prescription-main'}
            >
              <Prescription
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
              />
            </CustomOptionSelect>

            {/* {inputType === InputType.LABOUR && (
              <CustomOptionSelect
                title="Birth"
                showSubtitle={false}
                subtitle={'Nursing care plan'}
                strappedText={'Birth'}
                tabName="Record baby(s)"
                data-cy="labour-birth-section"
              >
                <Birth
                  patientId={data.id ?? 0}
                  encounterId={Number(encounterId)}
                  data={{}}
                />
              </CustomOptionSelect>
            )} */}
            {/* <CustomOptionSelect
              title="Add notes"
              showSubtitle={false}
              strappedText={'Add notes'}
              showTabPanel={false}
              tabName="Prescription"
              data-cy={'add-notes-main'}
            >
              <AddNotes
                patientId={data.id ?? 0}
                encounterId={Number(encounterId)}
              />
            </CustomOptionSelect>
            <CustomOptionSelect
              title="Other plan items"
              showSubtitle={false}
              strappedText={'Add other plan items'}
              tabName="Other plan items"
            >
              <OtherPlanItems
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
              />
            </CustomOptionSelect> */}
          </Flex>

          {/* <Flex w={isMobile ? '100%' : '50%'} direction="column" gap={15}>
            <CustomOptionSelect
              title="Physical examination"
              showSubtitle={false}
              strappedText={
                inputType === InputType.LABOUR ||
                inputType === InputType.ANTENATAL ||
                isAntenatal
                  ? 'Obstetric examination'
                  : 'General physical examination'
              }
              showTabPanel={true}
              tabName={
                inputType === InputType.LABOUR ||
                inputType === InputType.ANTENATAL ||
                isAntenatal
                  ? 'Obstetric examination'
                  : 'Physical examination'
              }
            >
              <PhysicalExamination
                isAntenatalOrLabour={
                  inputType === InputType.LABOUR ||
                  inputType === InputType.ANTENATAL ||
                  !!isAntenatal
                }
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
              />
            </CustomOptionSelect>
            <CustomOptionSelect
              title="Vital signs"
              showSubtitle={false}
              subtitle={'Nursing care plan'}
              strappedText={'Take vital signs'}
              tabName="Vital signs"
            >
              <VitalSigns
                patientId={data.id ?? 0}
                encounterId={Number(encounterId)}
                data={{}}
                showRecheck={true}
                showSummary={true}
                inputType={inputType}
              />
            </CustomOptionSelect>
            <CustomOptionSelect
              title="Diagnosis"
              showSubtitle={false}
              subtitle={'Nursing care plan'}
              strappedText={'Enter diagnosis & differentials'}
              tabName="Diagnosis"
              data-testid={'diagnosis-main'}
            >
              <DiagnosisDifferential
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
              />
            </CustomOptionSelect>
            <CustomOptionSelect
              title="Procedures"
              showSubtitle={false}
              strappedText={'Request & record procedures'}
              tabName="Procedures"
            >
              <Procedures
                patientId={data.id ?? 0}
                encounterId={(encounterId as string) || ''}
                inputType={getInputTypeName(inputType)}
              >
                <CustomOptionSelect
                  title=""
                  showSubtitle={false}
                  placeholder={'Add procedure'}
                  strappedText={'Record procedures'}
                  isVitalSign={false}
                  showTabPanel={false}
                  tabName="Medication"
                >
                  <RecordProcedures
                    encounterId={encounterId?.toString() ?? ''}
                    patientId={Number(patientId)}
                    inputType={getInputTypeName(inputType)}
                  />
                </CustomOptionSelect>
              </Procedures>
            </CustomOptionSelect>
          </Flex> */}
        </Flex>
        <Flex mt={32} justify="flex-end">
          <DoctorButton
            patientId={Number(patientId) || 123}
            encounterId={1}
            onchangeFunc={setSelectionOptions}
            handleTransferModal={handleTransferModal}
            handleReviewSave={handleReviewSave}
            inputType={InputType.OUTPATIENT}
          />
        </Flex>
      </Box>
    </Dashboard>
  );
};

const PatientAllInputsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientAllInputsContent />
    </Suspense>
  );
};

export default PatientAllInputsPage;
