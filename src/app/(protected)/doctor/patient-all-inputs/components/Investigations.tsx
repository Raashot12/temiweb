/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Box, Flex, Text } from '@mantine/core';  
import { usePathname } from 'next/navigation';
// Static type definition to replace API import
type GetInvestigationForPatientResponse = {
  id: number;
  name: string;
  code?: string;
  status?: string;
  requestedDate?: string;
  completedDate?: string;
  result?: string;
};
import { Pill } from '@/types/index';
import styled from '@emotion/styled';
import { appColors } from '@/theme/colors';
import InvestigationsRequest from './RequestInvestigations';
import RecentResults from './RecentResults';

export const AddBedTypeBtn = styled.section`
  font-family: 'General Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  padding-left: 30px;
  color: #0b0c7d;
  cursor: pointer;
  margin-block-start: auto;
  top: -30px;
  position: relative;
  margin-left: 5px;
  &:before {
    content: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9ZM8.4 13.2V9.6H4.8V8.4H8.4V4.8H9.6V8.4H13.2V9.6H9.6V13.2H8.4Z' fill='%230B0C7D'/%3E%3C/svg%3E%0A");
    position: absolute;
    left: -1px;
    top: -18px;
  }
`;

export const RecordInvestigationsContainer = styled.div`
  background-color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1.3em;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const RecordInvestigationsText = styled.div`
  color: var(--lower-text, #a6afc2);
  font-family: Gilroy;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const InvestigationsContainer = styled.div`
  background-color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
`;

export const InvestigationsHeader = styled.div`
  font-family: Gilroy;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
type InvestigationsProps = {
  isNurse?: boolean;
  patientId: number;
  saveCallback?: () => void;
  encounterId: string;
  procedureId?: number;
  data?: {
    toogleclose: (() => void) | undefined;
  };
  isLaboratoryRoute?: boolean | undefined;
  saveLaboratoryRequestInvestigation?: (args: Pill[]) => void;
  isLoading?: boolean;
  isSaveInvestigationLoading?: boolean;
  setRequestsAlreadyExists?: ((args: boolean) => void) | undefined;
  setAlreadyRequestedInvestigations?: (
    args: GetInvestigationForPatientResponse[]
  ) => void;
  currentRequestedPills?: Pill[];
  setCurrentRequestedPills?: (args: Pill[]) => void;
  sessionId?: number;
};

export const functionsData = [
  {
    id: 'Haematology',
    name: 'Haematology',
    isShown: false,
  },
  {
    id: 'Chemistry',
    name: 'Chemistry',
    isShown: false,
  },
  {
    id: 'Microbiology',
    name: 'Microbiology',
    isShown: false,
  },
  {
    id: 'Serology',
    name: 'Serology',
    isShown: false,
  },
  {
    id: 'Radiology + Pulm',
    name: 'Radiology + Pulm',
    isShown: true,
  },
  {
    id: 'Electrophysiology',
    name: 'Electrophysiology',
    isShown: false,
  },
  {
    id: 'Histopathology',
    name: 'Histopathology',
    isShown: false,
  },
  {
    id: 'Others',
    name: 'Others',
    isShown: false,
  },
];

export type InvestigationsPill = {
  id: string;
  name: string;
};

export interface InvestigationsTabPill extends InvestigationsPill {
  isShown: boolean;
}

const renderComponent = (
  page: string,
  props: InvestigationsProps,
  data: Array<InvestigationsTabPill>,
  isLaboratoryPage: boolean | undefined
) => {
  switch (page) {
    case 'request':
      return (
        <InvestigationsRequest
          patientId={props.patientId}
          saveCallback={props.saveCallback}
          encounterId={props.encounterId}
          sessionId={props.sessionId}
          procedureId={props.procedureId}
          toggleClose={props.data?.toogleclose}
          tabData={data}
          isLaboratoryRoute={isLaboratoryPage}
          saveLaboratoryRequestInvestigation={
            props.saveLaboratoryRequestInvestigation
          }
          isLoading={props.isLoading}
          isSaveInvestigationLoading={props.isSaveInvestigationLoading}
          setRequestsAlreadyExists={props.setRequestsAlreadyExists}
          setAlreadyRequestedInvestigations={
            props.setAlreadyRequestedInvestigations
          }
          currentRequestedPills={props.currentRequestedPills}
          setCurrentRequestedPills={props.setCurrentRequestedPills}
        />
      );
    // case 'record':
    //   return (
    //     <RecordInvestigationsContainer
    //       saveCallback={props.saveCallback}
    //       sessionId={props.sessionId}
    //       patientId={props.patientId}
    //       encounterId={props.encounterId}
    //       procedureId={props.procedureId}
    //       toggleClose={props.data?.toogleclose}
    //       tabData={data}
    //     />
    //   );
    case 'recent':
      return (
        <RecentResults
          patientId={props.patientId}
          encounterId={props.encounterId}
          procedureId={props.procedureId}
          toggleClose={props.data?.toogleclose}
        />
      );
    default:
      return <div></div>;
  }
};

const Investigations = (props: InvestigationsProps) => {
  const pathname = usePathname();

  const isLaboratoryPage = pathname?.includes('laboratory');
  const headerData = [
    {
      id: 'recent',
      name: 'Recent results',
    },
    {
      id: 'record',
      name: 'Record results',
    },
  ];

  if (!props.isNurse) {
    headerData.splice(1, 0, {
      id: 'request',
      name: 'Request Investigations',
    });
  }
  const [selectedTab, setSelectedTab] = useState(
    props.isNurse ? 'recent' : 'request'
  );
  return (
    <React.Fragment>
      <InvestigationsContainer>
        <Flex
          direction={'row'}
          justify={'flex-start'}
          align={'center'}
          sx={{ width: '100%' }}
        >
          {headerData.map((item, index) => (
            <InvestigationsHeader key={index}>
              <Text
                data-testid={`investigations-header-${item.id}`}
                onClick={() => setSelectedTab(item.id)}
                style={{
                  color:
                    selectedTab !== item.id
                      ? appColors.lowerText
                      : appColors.blue,
                  padding: '1em',
                  cursor: 'pointer',
                }}
                fw={600}
              >
                {item.name}
              </Text>
            </InvestigationsHeader>
          ))}
        </Flex>
      </InvestigationsContainer>
      <Box>
        {renderComponent(selectedTab, props, functionsData, isLaboratoryPage)}
      </Box>
    </React.Fragment>
  );
};

export default Investigations;
