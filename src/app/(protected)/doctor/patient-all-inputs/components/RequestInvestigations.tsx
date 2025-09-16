/* eslint-disable import/no-cycle */
import { notifications } from '@mantine/notifications';
import { Icon } from '@iconify/react';
import React, { forwardRef, HTMLProps, useCallback, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Flex,
  Loader,
  Menu,
  Select,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { momentBrowserTimezone } from '@/utils/utils';
import { AutoScrollContainer } from '@/components/shared/AutoScrollContainer';
import Range from '@/components/shared/Range';
import { appColors } from '@/theme/colors';
import IconPlusColored from '@/components/shared/IconComponents/IconPlusColored';
import { InputsBadge } from '@/components/shared/InputsBadge';
import { ItemType, Pill } from '@/types/index';

// Static type definition to replace API import
type GetInvestigationRequestsResponse = {
  id: number;
  name: string;
  investigationName: string;
  investigationId: number;
  urgent: boolean;
  notes: string;
  status?: string;
  createdDate?: string;
  snomedId?: string;
  specimen?: string;
  views?: string;
  bodyPart?: string;
  specificOrganism?: string;
  withContrast?: boolean;
};
import { InvestigationsContainer, InvestigationsHeader, InvestigationsTabPill } from './Investigations';
import { FrameOne } from '@/components/shared/TabSwitcher';
import styled from '@emotion/styled';
import AddInput from '@/components/shared/AddInput';
import TabPanel from '@/components/shared/TabPanel';
import ItemListVerticalScrollWrapper from '@/components/shared/ItemListVerticalScrollWrapper';
import { AvailableButton, AvatarButton, GridWrapperThreeCol, SavedGroupHeader, SuggestedItems } from '@/components/shared/StyledComponent';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import { StickyButtonFrame } from '@/components/shared/StickyButtonFrame';
import IconClear from '@/components/shared/IconComponents/IconClear';
import IconCloseX from '@/components/shared/IconComponents/IconCloseX';
import IconUpSmall from '@/components/shared/IconComponents/IconUpSmall';
import IconClose from '@/components/shared/IconComponents/IconClose';
import RequestInvestigationSummary from './RequestInvestigationSummary';
import IconArrowOpened from '@/components/shared/IconComponents/IconArrowOpened';
import { RefactoredActivePills, validateSpecificOrganism } from './utils';

// Types
interface InvestigationsPill {
  id: string;
  name: string;
}

// Remove local Pill interface - using the one from @/types/index

interface SpecimenResult {
  snomedId: string | undefined;
  result: string;
  normal: boolean;
  category: null;
}

interface ItemProps {
  id?: number;
  name: string;
  value?: string;
  hasPrice?: boolean;
  snomedId?: string;
  groupReuqestedInvestigations?: any;
}

interface InvestigationComponent {
  id: number;
  name: string;
}

interface Investigation {
  investigationComponents?: InvestigationComponent[];
  specimen?: string[];
}

interface SearchResult {
  id: number;
  name: string;
  hasPrice?: boolean;
}

interface BoxPillProps extends HTMLProps<HTMLDivElement> {
  paddingTop?: string;
}

export const BoxPill = styled.div<BoxPillProps>`
  border: 1px solid #dfe2e9;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: ${(props) => props.paddingTop || '10px'};
  padding-bottom: 10px;
  height: ${(props) => props.height || '128px'};
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;


export type GetAllInvestigationsResponse = {
  id?: number;
  snowmedId: string;
  name: string;
  specimen: string;
  source: string;
  category: string;
  categoryId: number;
  hasPrice: boolean;
};
type SubstanceProps = string;

type ActionType = ItemType & {
  action: (inv: null | GetInvestigationRequestsResponse[]) => void;
  danger?: boolean;
};
type SearchInvestigationResultsType = GetAllInvestigationsResponse & {
  value: string;
};

// Add missing type definitions
interface PatientSuggestedInvestigationResponseDto {
  id: string | number;
  name?: string;
  groupReuqestedInvestigations?: GetInvestigationRequestsResponse[];
}

interface GetInvestigationForPatientResponse {
  id: number;
  name: string;
  specimen?: string;
  urgent?: boolean;
  withContrast?: boolean;
}

interface GetPatientInvestigationRequestResponseDto {
  date: string;
  investigationRequest: GetInvestigationRequestsResponse[];
}

type CombinedType = (ItemProps & PatientSuggestedInvestigationResponseDto)[];
interface ItemPropsInvestigation
  extends Omit<GetAllInvestigationsResponse, 'id'> {
  value?: string;
  label?: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemPropsInvestigation>(
  ({ name, hasPrice, ...others }: ItemPropsInvestigation, ref) => (
    <div ref={ref} {...others}>
      <SuggestedItems align="center" w={'100%'} justify="space-between">
        <Text fw={500}>{name}</Text>

        {hasPrice && <AvailableButton>Priced</AvailableButton>}
      </SuggestedItems>
    </div>
  )
);
AutoCompleteItem.displayName = 'AutoCompleteItem';
const InvestigationsRequest = (props: {
  patientId?: number;
  saveCallback?: () => void;
  encounterId?: string;
  sessionId?: number;
  procedureId?: number;
  toggleClose: (() => void) | undefined;
  tabData: Array<InvestigationsTabPill>;
  isLaboratoryRoute: boolean | undefined;
  saveLaboratoryRequestInvestigation?: (args: Pill[]) => void;
  isLoading?: boolean;
  isSaveInvestigationLoading?: boolean;
  setRequestsAlreadyExists?: ((args: boolean) => void) | undefined;
  setAlreadyRequestedInvestigations?: (
    args: GetInvestigationForPatientResponse[]
  ) => void;
  currentRequestedPills?: Pill[];
  setCurrentRequestedPills?: (args: Pill[]) => void;
  allPatientInvesigationSummaryData?: GetPatientInvestigationRequestResponseDto[];
  proceedToCheckout?: boolean;
  disableAddInvestigation?: boolean;
}) => {
  const [openGroupedMedication, setOpenGroupedMedication] = useState(true);
  const [groupStateSummaries, setGroupStateSummaries] = useState(
    [] as GetInvestigationRequestsResponse[]
  );
  const [removedGroupSummaries, setRemovedGroupSummaries] = useState<
    GetInvestigationRequestsResponse[]
  >([]);
  const [groupedMedicationMode, setGroupedMedicationMode] = useState<
    'undo' | null
  >(null);
  const [groupedActivePills, setGroupedActivePills] = useState<ItemProps[]>([]);
  const disableSpec = false;
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState('Haematology');
  const [selectedSub, setSelectedSub] = useState('test');
  const [activeTab, setActiveTab] = useState('Regular');
  const [secondActiveTab, setSecondActiveTab] = useState<string | null>(
    'Plain'
  );
  const [textNote, setTextNote] = useState<string>('');
  const [activePills, setActivePills] = useState<Pill[]>([]);
  const [isNoteOpen, setNoteOpen] = useState<boolean>(false);
  const [investigationNote, setInvestigationNote] = useState<string>('');
  const [substanceType, setSubstanceType] = useState<SubstanceProps>('');
  const [amountRequested, setAmountRequested] = useState<number>(0);
  const [amountType, setAmountType] = useState<string>('pints');
  const [radiologyCategory, setRadiologyCategory] = useState<string>();
  const [radiologyName, setRadiologyName] = useState<string>();
  const [loader, setLoading] = useState(false);
  const [snowmedLoading, setSnowmedLoading] = useState(false);
  // Mock API function to replace external API call
  const addRequestInvestigations = async (body: any) => {
    // Simulate API call with static response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true, message: 'Investigation request saved successfully' } });
      }, 1000);
    });
  };
  const [linkHighlight, setLinkHightlight] = useState<{
    isOpen: boolean;
  }>();
  const [linkDelete, setLinkDelete] = useState<{
    isOpen: boolean;
  }>();
  const [selectedInvestigations, setSelectedInvestigations] = useState(
    [] as GetInvestigationRequestsResponse[]
  );
  const [groupSummaries, setGroupSummaries] = useState([] as Pill[]);
  const [groupNote, setGroupNote] = useState<string>('');
  const [isCreateGroup, setIsCreateGroup] = useState<{
    isOpen: boolean;
  }>();
  const [loadingButton, setLoadingButton] = useState<
    'continue' | 'finish' | null
  >(null);

  const handleScrollTabSelect = (value: string): string => {
    setSelectedTab(value);
    setTextNote('');
    setSelectedSub('test');
    setActiveTab('Regular');
    return value;
  };

  const subTab = (): Array<{ id: string; name: string }> => {
    let objValue = [] as Array<InvestigationsPill>;
    if (selectedTab === 'Haematology' || selectedTab === 'Chemistry') {
      objValue = [
        {
          id: 'test',
          name: 'Test',
        },
        {
          id: 'specimen',
          name: 'Specimen',
        },
      ];
    } else if (
      selectedTab === 'Microbiology' ||
      selectedTab === 'Serology' ||
      selectedTab === 'Histopathology'
    ) {
      objValue = [
        {
          id: 'test',
          name: 'Test',
        },
        {
          id: 'specimen',
          name: 'Specimen',
        },
        {
          id: 'specific organism',
          name: 'Specific Organism',
        },
      ];
    } else if (selectedTab === 'Radiology + Pulm') {
      objValue = [
        {
          id: 'test',
          name: 'Test',
        },
        {
          id: 'body parts',
          name: 'Body parts',
        },
        {
          id: 'views',
          name: 'Views',
        },
      ];
    } else if (selectedTab === 'Electrophysiology') {
      objValue = [
        {
          id: 'test',
          name: 'Test',
        },
      ];
    }

    return objValue;
  };

  const SubstanceData = [
    {
      value: 'packed cells',
      label: 'Packed Cells',
    },
    {
      value: 'plasma',
      label: 'Plasma',
    },
    {
      value: 'whole blood',
      label: 'Whole Blood',
    },
    {
      value: 'platelets',
      label: 'Platelets',
    },
  ];

  const AmountTypeData = [
    {
      value: 'pints',
      label: 'Pints',
    },
  ];

  const handleRightTablePanel = (value: string) => {
    setActiveTab(value);
  };

  const showError = (title: string, message: string): void => {
    notifications.show({
      title,
      message,
      color: 'red',
    });
  };

  const showSuccess = (message: string): void => {
    notifications.show({
      message,
      color: 'green',
    });
  };

  const showInfo = (message: string): void => {
    notifications.show({
      message,
      color: 'blue',
    });
  };

  const handleLeftTablePanel = (value: string) => {
    setSecondActiveTab(value);
  };

  const checkPlain = (): string | null => {
    if (
      selectedTab === 'Haematology' ||
      selectedTab === 'Chemistry' ||
      selectedTab === 'Microbiology'
    )
      return null;
    return secondActiveTab;
  };

  const VerifyInfo = (
    subName: string,
    tabName: string,
    id: number,
    name?: string,
    sourceName?: string
  ): void => {
    if (tabName === 'Radiology + Pulm') {
      const filteredResult = activePills.filter((i) => i.tab === tabName);
      if (filteredResult.length === 0) {
        setRadiologyName(name);
      } else {
        setRadiologyName('');
        setRadiologyCategory('');
      }
    } else {
      const filteredResult = activePills.filter(
        (i) => i.sub === subName && i.tab === tabName
      );
      if (filteredResult.length === 0 && sourceName === 'Investigation') {
        setSelectedTest(id as number);
      } else {
        setSelectedTest(null);
      }
    }
  };

  const handleSetCurrentRequestedInvestigationPills = (
    newActivePills: Pill[]
  ): void => {
    if (!newActivePills || !Array.isArray(newActivePills)) return;
    props?.setCurrentRequestedPills?.(newActivePills);
  };

  // Remove duplicate Pill interface - using the one defined above

  const addItemToActivePills = (
    item: string,
    specimen?: string | null,
    type = activeTab,
    tab = selectedTab,
    sub = selectedSub,
    contrast = checkPlain(),
    id = 0,
    snowmedId = 0,
    source = 'Investigation'
  ) => {
    if (props.isLaboratoryRoute && props?.patientId === undefined) {
      return showInfo('Kindly select a patient to proceed');
    }
    const existingPillWithSub = activePills.find(
      (p) => p.sub === 'test' && p.tab === tab
    );

    if (sub !== 'test' && !existingPillWithSub) {
      return showError(
        'Request Investigation',
        `Please select a test first before adding ${sub}`
      );
    }
    if (
      !activePills.find((p) => p.value === item) ||
      !activePills.find((p) => p.specimen === specimen)
    ) {
      const newActivePills = [...activePills];
      newActivePills.push({
        value: item,
        name: item,
        specimen,
        type,
        tab,
        sub,
        contrast,
        id,
        snowmedId,
        source,
      });
      VerifyInfo(sub, tab, id, item, source);

      setActivePills(newActivePills);
      if (props?.setCurrentRequestedPills) {
        handleSetCurrentRequestedInvestigationPills(newActivePills);
      }
    }
  };

  // Remove duplicate interfaces - using the ones defined above

  const getSpecimen = useCallback((value?: string[]): SpecimenResult[] => {
    const allSpecimens = new Set<string>();
    const currentSnowmedId = selectedTest?.toString();

    // Static specimen data to replace API call
    const staticSpecimens = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF'];
    staticSpecimens.forEach((specimen: string) => allSpecimens.add(specimen));

    value?.forEach((specimen: string) => allSpecimens.add(specimen));

    return Array.from(allSpecimens).map((specimen) => ({
      snomedId: currentSnowmedId,
      result: specimen,
      normal: false,
      category: null,
    }));
  }, [selectedTest]);

  // Static data to replace API calls
  const staticInvestigations = [
    { id: 1, name: 'Full Blood Count', hasPrice: true, snomedId: '26604007' },
    { id: 2, name: 'Liver Function Test', hasPrice: true, snomedId: '26958001' },
    { id: 3, name: 'Kidney Function Test', hasPrice: false, snomedId: '26958002' },
    { id: 4, name: 'Lipid Profile', hasPrice: true, snomedId: '26958003' },
    { id: 5, name: 'Blood Sugar', hasPrice: false, snomedId: '26958004' },
  ];

  const staticSpecimens = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Serum', 'Plasma'];
  const staticOrganisms = ['E. coli', 'Staphylococcus aureus', 'Streptococcus', 'Candida albicans'];

  const getAllSnowmedData = useCallback((): SearchResult[] => {
    const staticSpecimens = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Serum', 'Plasma'];
    const staticOrganisms = ['E. coli', 'Staphylococcus aureus', 'Streptococcus', 'Candida albicans'];
    const staticInvestigations = [
      { id: 1, name: 'Full Blood Count', hasPrice: true, snomedId: '26604007' },
      { id: 2, name: 'Liver Function Test', hasPrice: true, snomedId: '26958001' },
      { id: 3, name: 'Kidney Function Test', hasPrice: false, snomedId: '26958002' },
      { id: 4, name: 'Lipid Profile', hasPrice: true, snomedId: '26958003' },
      { id: 5, name: 'Blood Sugar', hasPrice: false, snomedId: '26958004' },
    ];

    if (selectedSub === 'specimen') {
      return staticSpecimens.map((specimen, index) => ({
        id: index + 1,
        name: specimen,
        hasPrice: false,
      }));
    } else if (selectedSub === 'specific organism') {
      return staticOrganisms.map((organism, index) => ({
        id: index + 1,
        name: organism,
        hasPrice: false,
      }));
    } else if (selectedSub === 'test') {
      return staticInvestigations.filter(inv => 
        inv.name.toLowerCase().includes(textNote.toLowerCase())
      ).map(inv => ({
        id: inv.id,
        name: inv.name,
        hasPrice: inv.hasPrice,
        snomedId: inv.snomedId,
        source: 'Investigation'
      }));
    }
    
    return [];
  }, [selectedSub, textNote]);

  // Static data functions to replace API calls
  const getSearchedData = useCallback(() => {
    const staticInvestigations = [
      { id: 1, name: 'Full Blood Count', hasPrice: true, snomedId: '26604007' },
      { id: 2, name: 'Liver Function Test', hasPrice: true, snomedId: '26958001' },
      { id: 3, name: 'Kidney Function Test', hasPrice: false, snomedId: '26958002' },
      { id: 4, name: 'Lipid Profile', hasPrice: true, snomedId: '26958003' },
      { id: 5, name: 'Blood Sugar', hasPrice: false, snomedId: '26958004' },
    ];
    return staticInvestigations.filter(inv => 
      inv.name.toLowerCase().includes(textNote.toLowerCase())
    );
  }, [textNote]);

  const getPatientInvestigationsSuggestions = [
    { id: 1, name: 'Full Blood Count', hasPrice: true, snomedId: '26604007' },
    { id: 2, name: 'Liver Function Test', hasPrice: true, snomedId: '26958001' },
    { id: 3, name: 'Kidney Function Test', hasPrice: false, snomedId: '26958002' },
  ];
  
  // Add missing variables
  const testLoading = false;
  const loggedInDetails = { user: { id: 1 } };
  const notesSummaryData: GetPatientInvestigationRequestResponseDto[] = [];
  const investigationsSummaryActions: ActionType[] = [
    {
      id: '1',
      name: 'Edit',
      action: () => {},
      danger: false
    },
    {
      id: '2', 
      name: 'Delete',
      action: () => {},
      danger: true
    }
  ];

  useEffect(() => {
    // No need for async data fetching with static data
  }, [selectedSub, selectedTab, textNote, selectedTest]);

  const EmptyData = (): void => {
    setActivePills([]);
    setGroupedActivePills([]);
    setInvestigationNote('');
    setGroupStateSummaries([]);
    props?.saveCallback?.();
  };

  const onSave = async (type: 'finish' | 'continue'): Promise<void> => {
    const value = activePills;
    if ((value && value.length > 0) || groupStateSummaries?.length > 0) {
      const newValue = RefactoredActivePills(value);
      const validationResults = validateSpecificOrganism(newValue);
      if (
        typeof validationResults === 'object' &&
        validationResults.length > 0
      ) {
        return showError('Request Investigation', validationResults[0]);
      }
      setLoading(true);
      setLoadingButton(type);
      const latestValues = newValue.map((item: Pill) => {
        return {
          sessionId: props.sessionId,
          patientId: props.patientId,
          procedureId: props.procedureId,
          encounterId: Number(props.encounterId),
          notes: investigationNote,
          urgent: item.type !== 'Regular',
          withContrast: item.contrast === 'Contrast',
          investigationId:
            item.source === 'Investigation' && item.id ? item.id : null,
          investigationName: item.value,
          snomedId: item.snowmedId ? item.snowmedId.toString() : null,
          specimen: item.specimen,
          specificOrganism: item.specificOrganism,
          bodyPart: item.bodyPart,
          views: item.views,
          investigationType: item?.tab ?? '',
          onBehalfOfUserId: props.isLaboratoryRoute
            ? null
            : loggedInDetails?.user?.id,
        };
      });
      if (type === 'continue') {
        setGroupNote(investigationNote);
        const revertedValues = groupStateSummaries.map((item) => {
          return {
            value: item.name ?? '',
            name: item.name ?? '',
            specimen: item.specimen,
            type: item.urgent ? 'Urgent' : 'Regular',
            tab: 'Haematology',
            views: item.views ?? '',
            bodyPart: item.bodyPart,
            specificOrganism: item.specificOrganism ?? '',
            sub: 'test',
            contrast: item.withContrast ? 'Contrast' : null,
            id: item.investigationId || null,
            source: 'Investigation',
            snowmedId: item.snomedId ? parseInt(item.snomedId, 10) : null,
          };
        });
        const allStateSummaries = newValue;
        setIsCreateGroup({ isOpen: true });
        const joinedValue = [
          ...(allStateSummaries as Pill[]),
          ...(revertedValues ?? []).map((item) => ({
            ...item,
            bodyPart: item.bodyPart ?? undefined,
          })),
        ];
        setGroupSummaries(joinedValue);
        EmptyData();
        setLoading(false);
        setLoadingButton(null);
      } else {
        try {
          const requestData = {
            body: [
              ...(latestValues ?? []),
              ...(groupStateSummaries.map((item) => {
                const {
                  name,
                  investigationId,
                  snomedId,
                  specimen,
                  urgent,
                  withContrast,
                } = item;
                return {
                  patientId: props.patientId,
                  encounterId: Number(props.encounterId),
                  notes: item?.notes ?? '',
                  urgent,
                  withContrast,
                  investigationId,
                  investigationName: name,
                  snomedId,
                  specimen,
                  onBehalfOfUserId: props.isLaboratoryRoute
                    ? null
                    : loggedInDetails?.user?.id,
                };
              }) ?? []),
            ],
          };
          
          const resp = await addRequestInvestigations(requestData);

          if (resp && 'data' in {}) {
            showSuccess('Request Investigation saved successfully');
            EmptyData();
          } else {
            showError('Request Investigation', 'Failed to save investigation');
          }
        } catch (_) {
          showError(
            'Request Investigation',
            'Error while saving Investigation'
          );
        } finally {
          setLoading(false);
          setLoadingButton(null);
        }
      }
    }
    return void null;
  };

  const changeSub = (item: InvestigationsPill) => {
    const value = item.id;
    setSelectedSub(value);
    if (selectedTab === 'Radiology + Pulm') {
      if (value === 'body parts') {
        setRadiologyCategory('BodyParts');
      } else {
        setRadiologyCategory('Views');
      }
      setRadiologyName(radiologyName);
    }
    setActiveTab('Regular');
    setSecondActiveTab('Plain');
    setTextNote('');
  };

  const getResultPills = () => {
    const value = activePills.filter(
      (item) => item.tab === selectedTab && item.sub === selectedSub
    );
    if (value && value.length > 0) return value;
    return [];
  };

  const checkSubTab = () => {
    const value = activePills.find(
      (item) => item.sub === selectedSub && item.tab === selectedTab
    );
    if (value) return false;
    return true;
  };

  const RemovePill = (name: string, sub: string, tab: string): void => {
    const removePill = activePills.filter(
      (item: Pill) => item.value !== name || item.sub !== sub || item.tab !== tab
    );
    setActivePills(removePill);
    if (props?.setCurrentRequestedPills) {
      handleSetCurrentRequestedInvestigationPills(removePill);
    }
  };

  const FindGroup = () => {
    const matchValues = ['Group & cross match', 'Group X cross match'];
    const result = activePills.some((pill) =>
      matchValues.includes(pill?.value as string)
    );
    return result;
  };

  // Static tab data instead of props
  const staticTabData = [
    { id: 'Haematology', name: 'Haematology', isShown: false, isAvailable: true },
    { id: 'Chemistry', name: 'Chemistry', isShown: false, isAvailable: true },
    { id: 'Microbiology', name: 'Microbiology', isShown: false, isAvailable: true },
    { id: 'Serology', name: 'Serology', isShown: false, isAvailable: true },
    { id: 'Radiology + Pulm', name: 'Radiology + Pulm', isShown: true, isAvailable: true },
    { id: 'Electrophysiology', name: 'Electrophysiology', isShown: false, isAvailable: true },
    { id: 'Histopathology', name: 'Histopathology', isShown: false, isAvailable: true },
  ];
  const filteredTabData = staticTabData.filter((item) => item.id !== 'Others');

  useEffect(() => {
    if (props.currentRequestedPills?.length === 0) {
      setActivePills([]);
    }
  }, [props.currentRequestedPills?.length, props.setCurrentRequestedPills]);

  const filteredTestPills = activePills.filter((item) => item.sub === 'test');

  // Static data instead of props
  const staticPatientInvestigationSummaryData = [
    { 
      id: 1, 
      name: 'Blood Test', 
      status: 'Pending', 
      date: '2024-01-15',
      investigationRequest: [{
        id: 1,
        name: 'Full Blood Count',
        investigationName: 'Full Blood Count',
        investigationId: 1,
        urgent: false,
        notes: 'Routine check',
        snomedId: '26604007',
        specimen: 'Blood',
        views: '',
        bodyPart: '',
        specificOrganism: '',
        withContrast: false
      }]
    },
    { 
      id: 2, 
      name: 'X-Ray', 
      status: 'Completed', 
      date: '2024-01-14',
      investigationRequest: [{
        id: 2,
        name: 'Chest X-Ray',
        investigationName: 'Chest X-Ray',
        investigationId: 2,
        urgent: true,
        notes: 'Check for pneumonia',
        snomedId: '399208008',
        specimen: '',
        views: 'PA',
        bodyPart: 'Chest',
        specificOrganism: '',
        withContrast: false
      }]
    },
  ];
  const showLabRequestSummary = staticPatientInvestigationSummaryData.length > 0;

  const removeGroupedActivePillById = (idToRemove: number) => {
    const updatedGroupedActivePills = groupedActivePills.filter(
      (pill) => pill.id !== idToRemove
    );
    setGroupedActivePills(updatedGroupedActivePills);
  };

  const suggestionsData: CombinedType = [
    ...(getPatientInvestigationsSuggestions || []).map((suggestion) => ({
      id: suggestion.id,
      name: suggestion.name ?? '',
      value: suggestion.name ?? '',
      source: 'patient_suggestion',
      snomedId: suggestion.snomedId,
      hasPrice: suggestion.hasPrice,
      groupReuqestedInvestigations: undefined,
    })),
    ...(getSearchedData() || []).map((item) => ({
      id: item.id,
      name: item.name,
      value: item.name,
      source: 'searched_data',
      snomedId: item.snomedId ?? '',
      hasPrice: item.hasPrice ?? false,
      groupReuqestedInvestigations: undefined,
    })),
  ];

  const resultPills = getResultPills() || [];
  const combinedPills: Pill[] = [
    ...resultPills,
    ...(groupedActivePills || []).map((iip) => ({
      ...iip,
      value: iip.value || iip.name || '',
      id: iip.id || null,
    }))
  ];
  const handlePlusSignClick = () => {
    if (textNote && (selectedSub === 'test' || checkSubTab())) {
      addItemToActivePills(textNote);
      setTextNote('');
    } else {
      showError(
        'Request Investigation',
        `You can only select a single ${selectedSub} for the test(s) selected`
      );
    }
  };
  useEffect(() => {
    if (groupedActivePills?.length > 0) {
      const allGroupedInvestigations = groupedActivePills
        .map((pill) => pill.groupReuqestedInvestigations || [])
        .reduce((acc, curr) => acc?.concat(curr), []);
      setGroupStateSummaries(allGroupedInvestigations ?? []);
    } else {
      setGroupStateSummaries([]);
    }
  }, [groupedActivePills]);

  return (
    <React.Fragment>
      <TabPanel
        activeTab={selectedTab}
        tabPanel={filteredTabData}
        scrollable={true}
        spacing={12}
        handleTabChange={handleScrollTabSelect}
        isLaboratoryRoute={props?.isLaboratoryRoute}
      />

      <InvestigationsContainer style={{ marginTop: '1em' }}>
        <Flex
          align={'center'}
          justify="space-between"
          py={!props?.isLaboratoryRoute ? 16 : 0}
        >
          {!props?.isLaboratoryRoute && (
            <Text style={{ fontWeight: 700 }}>Request Investigations</Text>
          )}
          {!props?.isLaboratoryRoute ? (
            <IconArrowOpened onclick={props.toggleClose} />
          ) : null}
        </Flex>
        {!props?.isLaboratoryRoute && (
          <Divider orientation="horizontal" size="sm" color={'#DFE2E9'} />
        )}
        <Flex justify={'space-between'} align={'center'}>
          <Flex
            py={8}
            my={8}
            columnGap={16}
            justify={'flex-start'}
            align={'center'}
          >
            {subTab().map((item, index) => (
              <InvestigationsHeader key={index}>
                <Text
                  data-testid={`investigations-change-sub-${item.name.replace(
                    /\s/g,
                    '_'
                  )}`}
                  onClick={() => changeSub(item)}
                  style={{
                    color:
                      selectedSub !== item.id
                        ? appColors.lowerText
                        : appColors.blue,
                    cursor: 'pointer',
                  }}
                  fw={600}
                >
                  {item.name}
                </Text>
              </InvestigationsHeader>
            ))}
          </Flex>
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <StickyButtonFrame>
            {[
              { name: 'Regular', key: 1 },
              { name: 'Urgent', key: 2 },
            ].map((value) => {
              return (
                <FrameOne
                  data-testid={`investigations-urgency-${value.name}`}
                  key={value.key}
                  className={activeTab === value.name ? 'active' : 'not-active'}
                  onClick={() => handleRightTablePanel(value.name)}
                >
                  {value.name}
                </FrameOne>
              );
            })}
          </StickyButtonFrame>
          {staticTabData.map((item, index) => (
            <Box key={index}>
              {item.isShown && selectedTab === item.id ? (
                <StickyButtonFrame>
                  {[
                    { name: 'Plain', key: 1 },
                    { name: 'Contrast', key: 2 },
                  ].map((value) => {
                    return (
                      <FrameOne
                        key={value.key}
                        className={
                          secondActiveTab === value.name
                            ? 'active'
                            : 'not-active'
                        }
                        onClick={() => handleLeftTablePanel(value.name)}
                      >
                        {value.name}
                      </FrameOne>
                    );
                  })}
                </StickyButtonFrame>
              ) : null}
            </Box>
          ))}
        </Flex>
        <Box my={8}>
          <BoxPill height={99}>
            {/* <Autocomplete
              dropdownPosition="bottom"
              aria-label={'search-on-request-investigations'}
              data-testid={'search-on-request-investigations'}
              data-cy={'search-on-request-investigations'}
              sx={{
                'input[data-disabled]': { backgroundColor: 'white' },
              }}
              placeholder="click predictive text or type in text box"
              filter={() => true}
              limit={50}
              maxDropdownHeight={300}
              itemComponent={AutoCompleteItem}
              value={textNote}
              onChange={(value) => {
                setTextNote(value);
              }}
              nothingFound={
                textNote.length > 3 &&
                !snowmedLoading && (
                  <Box sx={{ fontWeight: 600, color: '#A6AFC2' }}>
                    Ooop! No result found in database
                  </Box>
                )
              }
              onItemSubmit={(item) => {
                if (
                  selectedSub === 'test' ||
                  selectedSub === 'views' ||
                  (selectedSub !== 'test' && checkSubTab())
                ) {
                  addItemToActivePills(
                    item.value,
                    '',
                    activeTab,
                    selectedTab,
                    selectedSub,
                    checkPlain(),
                    item.id,
                    item.snomedId,
                    item.source
                  );
                  setTextNote('');
                }
              }}
              variant="unstyled"
              data={
                textNote.length > 3
                  ? (getAllSnowmedData() || []).map((p) => ({
                      value: p.name ?? '',
                      id: p.id,
                      snomedId: p.snomedId,
                      name: p.name,
                      source: p.source,
                      hasPrice: p.hasPrice,
                    }))
                  : []
              }
              rightSection={
                <>
                  {testLoading ? (
                    <Loader size={'sm'} />
                  ) : (
                    <Box
                      data-testid={'plus-sign-request-investigations'}
                      onClick={handlePlusSignClick}
                    >
                      <IconPlusColored size={21} fill={appColors.grayLight} />
                    </Box>
                  )}
                </>
              }
            /> */}
            <AutoScrollContainer
              h={'4em'}
              style={{ marginTop: 5 }}
              autoScroll={true}
            >
              {combinedPills?.map(
                (
                  {
                    value,
                    type,
                    sub,
                    tab,
                    contrast,
                    id,
                  },
                  index
                ) => {
                  const isGrouped = false; // Simplified for static data
                  const { groupReuqestedInvestigations, name } = {} as any; // Mock destructured values
                  return (
                    <Box key={value} px={2}>
                      {isGrouped && name ? (
                        <InputsBadge
                          data-testid={`active-pill-value-${index}`}
                          style={{
                            backgroundColor: '#EFDBFF',
                            color: '#360F55',
                          }}
                          onClick={() =>
                            removeGroupedActivePillById(id as number)
                          }
                          rightSection={
                            <IconClear fill={'#677597'} size={'8'} />
                          }
                        >
                          {name}
                        </InputsBadge>
                      ) : (resultPills?.length ?? 0) > 0 &&
                        !isGrouped &&
                        value ? (
                        <InputsBadge
                          data-testid={`active-pill-value-${index}`}
                          style={{
                            background:
                              selectedSub === 'test' && type === 'Urgent'
                                ? appColors.orangeAccent
                                : appColors.fade,
                          }}
                          onClick={() =>
                            RemovePill(
                              value ?? '',
                              sub as string,
                              tab as string
                            )
                          }
                          rightSection={
                            <IconClear fill={'#677597'} size={'8'} />
                          }
                        >
                          {contrast === 'Contrast'
                            ? `${value} with contrast`
                            : value}
                        </InputsBadge>
                      ) : (
                        ''
                      )}
                    </Box>
                  );
                }
              )}
            </AutoScrollContainer>
          </BoxPill>
        </Box>
        <BoxPill height={227} style={{ marginTop: 8 }}>
          <AutoScrollContainer h={'10em'} style={{ marginTop: 5 }}>
            {suggestionsData?.map((investigationItem, index) => {
              const isGrouped =
                (investigationItem?.groupReuqestedInvestigations?.length ?? 0) >
                  0 &&
                selectedSub === 'test' &&
                !props.isLaboratoryRoute;
              const isTestOrView =
                selectedSub === 'test' ||
                selectedSub === 'views' ||
                (selectedSub !== 'test' && checkSubTab());

              return (
                <Box
                  key={`investigation-${investigationItem.id}-${index}`}
                  px={2}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {isTestOrView &&
                  investigationItem?.name &&
                  (investigationItem?.groupReuqestedInvestigations?.length ??
                    0) === 0 ? (
                    <InputsBadge
                      sx={{
                        border: investigationItem?.hasPrice
                          ? `1.5px solid #34985F`
                          : 'none',
                      }}
                      data-testid={`suggested-pill-value-${index}`}
                      onClick={() => {
                        if (
                          investigationItem?.name &&
                          (selectedSub === 'test' ||
                            selectedSub === 'views' ||
                            (selectedSub !== 'test' && checkSubTab()))
                        ) {
                          addItemToActivePills(
                            investigationItem?.name,
                            '',
                            activeTab,
                            selectedTab,
                            selectedSub,
                            checkPlain(),
                            investigationItem?.id
                          );
                        } else {
                          showError(
                            'Request Investigation',
                            `You can only select a single ${selectedSub} for the test(s) selected`
                          );
                        }
                      }}
                      rightSection={
                        <Icon
                          icon="carbon:add"
                          color="black"
                          width="25"
                          height="25"
                          style={{ paddingTop: '0.5em' }}
                        />
                      }
                    >
                      {investigationItem?.name}
                    </InputsBadge>
                  ) : isGrouped &&
                    investigationItem?.name &&
                    (investigationItem?.groupReuqestedInvestigations?.length ??
                      0) > 0 ? (
                    <InputsBadge
                      sx={{
                        border: investigationItem?.hasPrice
                          ? `1.5px solid #34985F`
                          : 'none',
                      }}
                      data-testid={
                        isGrouped
                          ? `grouped-pill-value-${index}`
                          : `suggested-pill-value-${index}`
                      }
                      style={{
                        backgroundColor: isGrouped ? '#EFDBFF' : undefined,
                        color: isGrouped ? '#360F55' : undefined,
                      }}
                      onClick={() => {
                        if (isGrouped) {
                          const isAlreadyGrouped = groupedActivePills.some(
                            (pill) => pill.id === investigationItem.id
                          );
                          if (!isAlreadyGrouped) {
                            setGroupedActivePills((prevPills) => [
                              ...prevPills,
                              {
                                id: investigationItem?.id as number,
                                name: investigationItem?.name ?? '',
                                groupReuqestedInvestigations:
                                  investigationItem?.groupReuqestedInvestigations as GetInvestigationRequestsResponse[],
                              },
                            ]);
                          }
                        } else {
                          showError(
                            'Request Investigation',
                            `You can only select a single ${selectedSub} for the test(s) selected`
                          );
                        }
                      }}
                      rightSection={
                        <Icon
                          icon="carbon:add"
                          color="black"
                          width="25"
                          height="25"
                          style={{ paddingTop: '0.5em' }}
                        />
                      }
                    >
                      {investigationItem?.name}
                    </InputsBadge>
                  ) : !isTestOrView &&
                    (investigationItem?.groupReuqestedInvestigations?.length ??
                      0) === 0 &&
                    investigationItem?.name ? (
                    <InputsBadge
                      data-testid={`suggested-pill-value-${index}`}
                      sx={{
                        border: investigationItem?.hasPrice
                          ? `1.5px solid #34985F`
                          : 'none',
                      }}
                      onClick={() => {
                        if (
                          investigationItem?.name &&
                          (selectedSub === 'test' ||
                            selectedSub === 'views' ||
                            (selectedSub !== 'test' && checkSubTab()))
                        ) {
                          addItemToActivePills(
                            investigationItem?.name,
                            '',
                            activeTab,
                            selectedTab,
                            selectedSub,
                            checkPlain(),
                            investigationItem?.id
                          );
                        } else {
                          showError(
                            'Request Investigation',
                            `You can only select a single ${selectedSub} for the test(s) selected`
                          );
                        }
                      }}
                      rightSection={
                        <Icon
                          icon="carbon:add"
                          color="black"
                          width="25"
                          height="25"
                          style={{ paddingTop: '0.5em' }}
                        />
                      }
                    >
                      {investigationItem?.name}
                    </InputsBadge>
                  ) : null}
                </Box>
              );
            })}
          </AutoScrollContainer>
        </BoxPill>
        {activePills.length > 0 && FindGroup() ? (
          <Box mt={23}>
            <InvestigationsHeader>
              Enter request for {`Group & cross match`}
            </InvestigationsHeader>

            <Flex justify={'space-between'} align={'center'}>
              <Box>
                <Range
                  title={'Amount requested'}
                  spacingbottom={15}
                  subtitle={
                    <>
                      <Select
                        data-testid={'amount-requested-type'}
                        aria-label={'amount-requested-type'}
                        value={amountType}
                        onChange={(value) => {
                          setAmountType(value as string);
                        }}
                        placeholder={'Select'}
                        data={AmountTypeData}
                        sx={{
                          '&.mantine-Select-root': {
                            width: '42%',
                            minWidth: '60px',
                            height: '55px',
                            paddingTop: '0.8em',
                          },
                          '& .mantine-Input-rightSection': {
                            top: `0px`,
                          },
                          '& .mantine-Input-input': {
                            fontWeight: 500,
                            border: 'none',
                          },
                        }}
                      ></Select>
                    </>
                  }
                  value={amountRequested}
                  onChange={(value: number) =>
                    setAmountRequested(value as number)
                  }
                />
              </Box>
              <Flex direction={'column'} mb={8}>
                <Text
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    color: appColors.lowerText,
                    fontFamily: 'Gilroy',
                  }}
                  mb={8}
                >
                  Substance type
                </Text>
                <Select
                  data-testid={'investigation-substance-type'}
                  aria-label={'investigation-substance-type'}
                  value={substanceType}
                  onChange={(value) => {
                    setSubstanceType(value as string);
                  }}
                  placeholder={'Select'}
                  data={SubstanceData}
                  sx={{
                    '&.mantine-Select-root': {
                      paddingTop: '1em',
                    },
                    '& .mantine-Input-rightSection': {
                      top: `0px`,
                    },
                    '& .mantine-Input-input': {
                      fontWeight: 500,
                    },
                  }}
                ></Select>
              </Flex>
            </Flex>
          </Box>
        ) : null}
        {!props.isLaboratoryRoute ? (
          <Flex my={8} justify={'space-between'} align={'center'}>
            <AddInput
              data-testid={`add-investigations-request-notes`}
              disabled={filteredTestPills?.length !== 1}
              onClick={() => setNoteOpen(true)}
              text={`Add investigations request notes`}
            />
          </Flex>
        ) : null}

        {(groupedActivePills.length ?? 0) > 0 && !props.isLaboratoryRoute && (
          <Box mt={10}>
            <Flex align={'center'} justify="space-between" py={16}>
              <Text sx={{ fontWeight: 700 }}>Investigation groups</Text>
              {openGroupedMedication ? (
                <IconArrowOpened
                  onclick={() => setOpenGroupedMedication(false)}
                />
              ) : (
                <IconUpSmall onclick={() => setOpenGroupedMedication(true)} />
              )}
            </Flex>
            {openGroupedMedication && (
              <>
                <Divider orientation="horizontal" size="sm" color={'#DFE2E9'} />
                <Box mt={20}>
                  <Flex direction={'row'} justify={'space-between'}>
                    <SavedGroupHeader>
                      <Text
                        color="#677597"
                        sx={{ fontSize: '17px', whiteSpace: 'pre-wrap' }}
                      >
                        {groupedActivePills?.[0]?.name ?? ''}
                      </Text>
                    </SavedGroupHeader>

                    <Flex justify={'flex-end'} gap={20} mb={15}>
                      <Button
                        sx={{
                          borderRadius: '10px',
                          background: appColors.white,
                          color:
                            groupedMedicationMode === 'undo'
                              ? appColors.blue
                              : appColors.lowerText,
                          borderWidth: 1,
                          borderColor:
                            groupedMedicationMode === 'undo'
                              ? appColors.blue
                              : appColors.lowerText,
                          '&:hover': {
                            background: appColors.blue,
                            color: appColors.white,
                          },
                        }}
                        onClick={() => {
                          setGroupedMedicationMode('undo');
                          if (removedGroupSummaries.length > 0) {
                            const lastRemoved =
                              removedGroupSummaries[
                                removedGroupSummaries.length - 1
                              ];
                            setGroupStateSummaries?.((prev) => [
                              ...(prev ?? []),
                              lastRemoved,
                            ]);
                            setRemovedGroupSummaries((prev) =>
                              prev.slice(0, -1)
                            );
                          }
                        }}
                      >
                        Undo
                      </Button>
                    </Flex>
                  </Flex>

                  <Box
                    sx={{
                      backgroundColor: appColors.white,
                      borderRadius: '10px',
                    }}
                  >
                    <BoxPill height={'7em'}>
                      <AutoScrollContainer h={'7em'} style={{ marginTop: 3 }}>
                        {groupStateSummaries?.map((summary, index) => (
                          <InputsBadge mt={10} mx={10} key={index}>
                            <Flex
                              data-testid={`draft-${index}`}
                              align={'flex-start'}
                              justify={'space-between'}
                              mt={2}
                              key={index}
                              px={10}
                            >
                              <Text span>
                                <Text
                                  span
                                  data-testid={`draft-message-${index}`}
                                >
                                  {summary?.name ?? ''}
                                </Text>
                              </Text>

                              <Flex align={'center'} pt={4} ml={10}>
                                <IconCloseX
                                  fill={'#0B0C7D'}
                                  size={12}
                                  data-testid={`delete-group-medication-${index}`}
                                  onclick={() => {
                                    const removedItem =
                                      groupStateSummaries?.[index];
                                    const newStates =
                                      groupStateSummaries?.filter(
                                        (_, i) => i !== index
                                      );
                                    setGroupedMedicationMode('undo');
                                    setGroupStateSummaries?.(newStates ?? []);
                                    if (removedItem) {
                                      setRemovedGroupSummaries((prev) => [
                                        ...prev,
                                        removedItem,
                                      ]);
                                    }
                                  }}
                                />
                              </Flex>
                            </Flex>
                          </InputsBadge>
                        ))}
                      </AutoScrollContainer>
                    </BoxPill>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}

        {isNoteOpen && !props.isLaboratoryRoute && (
          <Flex
            align={'center'}
            direction={'column'}
            w={'100%'}
            sx={{
              flexBasis: '100%',
            }}
          >
            <Flex
              align={'center'}
              gap={12}
              justify={'space-between'}
              w={'100%'}
              my={10}
            >
              <Text sx={{ fontWeight: 700, color: '#051438' }}>
                {`Add investigations request notes`}
              </Text>
              <IconClose
                handleClose={() => {
                  setNoteOpen(false);
                }}
              />
            </Flex>

            <Textarea
              data-testid={`note-investigations-request`}
              w={'100%'}
              autosize
              minRows={5}
              placeholder={`Type to Add investigations request Notes`}
              onChange={(event) => {
                setInvestigationNote(event.currentTarget.value);
              }}
              value={investigationNote}
            ></Textarea>
          </Flex>
        )}
        <Flex justify={'flex-end'} mt={16} mb={24}>
          {props.isLaboratoryRoute ? (
            <Button
              sx={{
                borderRadius: '10px',
                background: appColors.blue,
                '&:hover': {
                  background: appColors.blue,
                },
                minWidth: '10.5rem',
              }}
              disabled={props.disableAddInvestigation}
              onClick={() =>
                props?.saveLaboratoryRequestInvestigation?.(activePills)
              }
              data-cy={'lab-add-investigation'}
            >
              {props?.isSaveInvestigationLoading ? (
                <Flex align="center">
                  <Loader size="xs" stroke={appColors.white} mr="0.5rem" />
                  Adding...
                </Flex>
              ) : (
                'Add Investigation'
              )}
            </Button>
          ) : (
            <Flex justify={'flex-end'} mt={16} mb={24} gap={20}>
              {!props.isLaboratoryRoute && (
                <Button
                  data-cy="save-and-create-group"
                  sx={{
                    borderRadius: '10px',
                    background: appColors.white,
                    color: appColors.blue,
                    borderWidth: 1,
                    borderColor: appColors.blue,
                    '&:hover': {
                      color: appColors.white,
                    },
                  }}
                  loading={loader && loadingButton === 'continue'}
                  disabled={
                    (activePills.length === 0 &&
                      groupStateSummaries.length === 0) ||
                    (loader && loadingButton === 'continue')
                  }
                  onClick={() => onSave('continue')}
                >
                  Save & create group
                </Button>
              )}

              <Button
                data-testid={'save-requested-investigation-button'}
                loading={loader && loadingButton === 'finish'}
                sx={{
                  borderRadius: '10px',
                  background: appColors.blue,
                  '&:hover': {
                    background: appColors.blue,
                  },
                }}
                disabled={
                  (activePills.length === 0 &&
                    groupStateSummaries.length === 0) ||
                  (loader && loadingButton === 'finish')
                }
                onClick={() => onSave('finish')}
              >
                Save
              </Button>
            </Flex>
          )}
        </Flex>

        {showLabRequestSummary && (
          <Divider
            orientation="horizontal"
            size="sm"
            color={'#EFF1F4'}
            mb={16}
          />
        )}

        {!props.isLaboratoryRoute &&
          notesSummaryData &&
          notesSummaryData.length > 0 && (
            <Divider
              orientation="horizontal"
              size="sm"
              color={'#EFF1F4'}
              mb={16}
            />
          )}

        {showLabRequestSummary && (
          <ItemListVerticalScrollWrapper height={200}>
            {staticPatientInvestigationSummaryData?.map((item, index) => (
              <Stack pr={16} key={index}>
                <GridWrapperThreeCol>
                  <Box
                    sx={{
                      fontSize: 14,
                      color: '#7A90C2',
                      lineHeight: '17px',
                    }}
                    className="attribute-container date-col"
                  >
                    <Box>
                      <Box>
                        {momentBrowserTimezone(item.date).format('hh:mm A')}
                      </Box>
                      <Box sx={{ whiteSpace: 'pre-wrap' }}>
                        {momentBrowserTimezone(item.date)
                          .startOf('day')
                          .isSame(momentBrowserTimezone().startOf('day'))
                          ? 'Today'
                          : momentBrowserTimezone(item.date).format('LL')}
                      </Box>
                    </Box>
                  </Box>

                  <RequestInvestigationSummary
                    investigationRequest={
                      item?.investigationRequest || []
                    }
                  />

                  <Box className="attribute-container caret-col">
                    <Menu shadow="md">
                      <Menu.Target>
                        <AvatarButton>
                          <IconThreeDots size={20} />
                        </AvatarButton>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {investigationsSummaryActions.map((action) => (
                          <Menu.Item
                            key={action.id}
                            fw={600}
                            w={'100%'}
                            onClick={() => {
                              action.action(
                                item?.investigationRequest || []
                              );
                            }}
                            sx={{
                              fontSize: 14,
                              color: action.danger
                                ? appColors.red
                                : appColors.black,
                            }}
                          >
                            <span>{action.name}</span>
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                </GridWrapperThreeCol>
                <Divider orientation="horizontal" size="sm" color={'#EFF1F4'} />
              </Stack>
            ))}
          </ItemListVerticalScrollWrapper>
        )}
        {!props.isLaboratoryRoute && (
          <ItemListVerticalScrollWrapper height={200}>
            {notesSummaryData?.map((item, index) => (
              <Stack pr={16} key={index}>
                <GridWrapperThreeCol>
                  <Box
                    sx={{
                      fontSize: 14,
                      color: '#7A90C2',
                      lineHeight: '17px',
                    }}
                    className="attribute-container date-col"
                  >
                    <Box>
                      <Box>
                        {momentBrowserTimezone(item.date).format('hh:mm A')}
                      </Box>
                      <Box sx={{ whiteSpace: 'pre-wrap' }}>
                        {momentBrowserTimezone(item.date)
                          .startOf('day')
                          .isSame(momentBrowserTimezone().startOf('day'))
                          ? 'Today'
                          : momentBrowserTimezone(item.date).format('LL')}
                      </Box>
                    </Box>
                  </Box>

                  <Box data-testid={`requested-investigation-summary-${index}`}>
                    <RequestInvestigationSummary
                      investigationRequest={
                        item?.investigationRequest || []
                      }
                    />
                  </Box>

                  <Box className="attribute-container caret-col">
                    <Menu shadow="md">
                      <Menu.Target>
                        <AvatarButton
                          data-testid={`request-investigation-menu-${index}`}
                        >
                          <IconThreeDots size={20} />
                        </AvatarButton>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {investigationsSummaryActions.map(
                          (action, actionIndex) => (
                            <Menu.Item
                              data-testid={`request-investigations-menu-item-${actionIndex}`}
                              key={action.id}
                              fw={600}
                              w={'100%'}
                              onClick={() => {
                                action.action(
                                  item?.investigationRequest || []
                                );
                              }}
                              sx={{
                                fontSize: 14,
                                color: action.danger
                                  ? appColors.red
                                  : appColors.black,
                              }}
                            >
                              <span>{action.name}</span>
                            </Menu.Item>
                          )
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                </GridWrapperThreeCol>
                <Divider orientation="horizontal" size="sm" color={'#EFF1F4'} />
              </Stack>
            ))}
          </ItemListVerticalScrollWrapper>
        )}
      </InvestigationsContainer>

      {/* <HighlightForAttention
        isOpen={linkHighlight?.isOpen ?? false}
        setIsOpen={(isOpen) => {
          setLinkHightlight({
            ...linkHighlight,
            ...{ isOpen },
          });
        }}
        patientId={props.patientId}
        encounterId={props.encounterId}
      />
      <CreateInvestigationGroup
        isOpen={isCreateGroup?.isOpen ?? false}
        setIsOpen={(isOpen) => {
          setIsCreateGroup({
            ...isCreateGroup,
            ...{ isOpen },
          });
        }}
        groupSummaries={groupSummaries as Pill[]}
        setGroupSummaries={setGroupSummaries}
        patientId={props.patientId}
        encounterId={props.encounterId}
        investigationNote={groupNote}
        sessionId={props.sessionId}
        procedureId={props.procedureId}
        loggedInDetails={loggedInDetails}
        isLaboratoryRoute={props.isLaboratoryRoute}
      />
      <DeleteInvestigations
        isOpen={linkDelete?.isOpen ?? false}
        setIsOpen={(isOpen) => {
          setLinkDelete({
            ...linkDelete,
            ...{ isOpen },
          });
        }}
        patientId={props.patientId}
        encounterId={props.encounterId}
        notesData={selectedInvestigations as GetInvestigationRequestsResponse[]}
      /> */}
    </React.Fragment>
  );
};

export default InvestigationsRequest;
