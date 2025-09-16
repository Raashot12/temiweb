import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Box,
  Divider,
  Stack,
  Select,
  TextInput,
  Textarea,
  Button,
  Switch,
  Grid,
  NumberInput,
  Menu,
} from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import styled from '@emotion/styled';
import { InputsBadge } from '@/components/shared/InputsBadge';

import IconArrowOpened from '@/components/shared/IconComponents/IconArrowOpened';
import IconUpSmall from '@/components/shared/IconComponents/IconUpSmall';
import ItemListVerticalScrollWrapper from '@/components/shared/ItemListVerticalScrollWrapper';
import IconClear from '@/components/shared/IconComponents/IconClear';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  Dose,
  Vaccination as TVaccination,
  VaccinationRecord,
  VaccineState,
  selectVaccineState,
  setVaccineState,
} from '@/state/features/allInput/vaccination';
import TabPanel from '@/components/shared/TabPanel';
import _ from 'lodash';
import { appColors } from '@/theme/colors';
import { momentBrowserTimezone } from '@/utils/utils';
import { customDateInputStlyes } from '@/utils/customDateInputStyles';
import { GridWrapperThreeCol } from '@/components/shared/StyledComponent';
import { FrameOne } from '@/components/shared/TabSwitcher';
import { BoxPill } from './RequestInvestigations';
import { IconThreeDots } from '@/components/shared/IconComponents/IconThreeDots';
import IconDate from '@/components/shared/IconComponents/IconDate';
import { AutoScrollContainer } from '@/components/shared/AutoScrollContainer';
import IconPlus from '@/components/shared/IconComponents/IconPlus';
import { CreateVaccinationDto, VaccinationResponseDto, VaccineScheduleDto } from '@/types/index';
import { StickyButtonFrame } from '@/components/shared/StickyButtonFrame';

const CustomTextArea = styled(Textarea)`
  .mantine-Textarea-input {
    height: 85px;
  }
`;
const CustomTextInput = styled(TextInput)`
  .mantine-TextInput-label {
    color: ${appColors.subText};
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const SelectCustom = styled(Select)`
  max-width: 130px;

  & input {
    font-weight: 600;
    font-size: 14px;
    color: ${appColors.black};
  }
`;

const CustomDatePicker = styled(DateInput)`
  .mantine-InputWrapper-label {
    color: ${appColors.subText};
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
  }
`;
type ItemType = {
  id: string;
  name: string;
};
type ActionType = ItemType & {
  action: (id: null | number) => void;
  danger?: boolean;
};
export const VaccinationSummary = ({
  procedureId,
  history,
}: {
  procedureId?: number;
  history: VaccinationResponseDto & {
    lastVaccineDuration?: string | null;
  };
}) => (
  <Flex direction={'column'}>
    <Text
      sx={{
        textDecoration: history.isDeleted ? 'line-through' : 'none',
      }}
    >
      {procedureId && history.procedureEntryType
        ? `${history.procedureEntryType} - `
        : null}
      {history.vaccine?.fullName || history.vaccine?.name}{' '}
      {history.dueDate &&
        `due at ${momentBrowserTimezone(history.dueDate || '').format('LL')}`}
      {history.lastVaccineDuration?.trim()
        ? ` administered ${history.lastVaccineDuration} ago`
        : history.dateAdministered
          ? ` administered on ${momentBrowserTimezone(
              history.dateAdministered || '',
            ).format('LL')}`
          : ''}{' '}
      . {history.vaccineBrand ? `Brand: ${history.vaccineBrand}, ` : ''}
      {history.vaccineBatchNo ? `Batch No: ${history.vaccineBatchNo}, ` : ''}
      {history.hasComplication
        ? 'Complications experienced'
        : 'No complications experienced'}
      . {history.note}
    </Text>
    {history.deletedUser && (
      <Text fw={500} color={appColors.text}>
        Deleted by {history.deletedUser}{' '}
        {history.deletionTime === null ? (
          ''
        ) : (
          <>
            |&nbsp;
            {momentBrowserTimezone(history.deletionTime as string).format(
              'hh:mm A',
            )}{' '}
            {momentBrowserTimezone(history.deletionTime as string)
              .startOf('day')
              .isSame(momentBrowserTimezone().startOf('day'))
              ? 'Today'
              : `on ${momentBrowserTimezone(
                  history.deletionTime as string,
                ).format('LL')}`}
          </>
        )}
      </Text>
    )}
  </Flex>
);
const Vaccination = (props: {
  encounterId: number;
  patientId: number;
  procedureId?: number;
  sessionId?: number;
  saveCallback?: () => void;
  data?: { toogleclose: (() => void) | undefined };
}) => {
  // Mock state management for procedure state
  const recordProcedureState = { rightSide: 'Preop' };
  const [activeTab, setActiveTab] = useState('Record vaccinations');
  const [activeFilter, setActiveFilter] = useState('DUE_DATE');
  const [activeSubFilter, setActiveSubFilter] = useState('');
  const [hasHistoryOfVaccination, setHasHistoryOfVaccination] = useState(false);
  const [isVaccineGroupActive, setIsVaccineGroupActive] = useState(false);
  const [activeDoses, setActiveDoses] = useState<Dose[]>([]);
  const [, setSeverity] = useState<{
    isOpen: boolean;
  }>();
  const [, setHighlight] = useState<{
    isOpen: boolean;
  }>();
  const [linkDelete, setLinkDelete] = useState<{
    isOpen: boolean;
  }>();
  const [, setResolved] = useState<{
    isOpen: boolean;
  }>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const tempState = useAppSelector(selectVaccineState);
  
  // Static data to replace API calls
  const apiVaccines = [
    { id: 1, name: 'COVID-19', fullName: 'COVID-19 Vaccine' },
    { id: 2, name: 'Hepatitis B', fullName: 'Hepatitis B Vaccine' },
    { id: 3, name: 'MMR', fullName: 'Measles, Mumps, Rubella Vaccine' },
    { id: 4, name: 'Tetanus', fullName: 'Tetanus Vaccine' },
  ];
  
  const apiVaccineGroups = [
    { id: 1, name: 'Childhood Vaccines', fullName: 'Childhood Vaccination Group' },
    { id: 2, name: 'Adult Vaccines', fullName: 'Adult Vaccination Group' },
  ];
  
  const apiSelectedVaccineGroup = isVaccineGroupActive && tempState.activePills ? {
    id: Number(tempState.activePills),
    name: 'Childhood Vaccines',
    fullName: 'Childhood Vaccination Group',
    vaccines: [
      {
        id: 1,
        name: 'MMR',
        fullName: 'Measles, Mumps, Rubella Vaccine',
        schedules: [
          {
            id: 1,
            dosage: '0.5ml',
            doses: 2,
            routeOfAdministration: 'Intramuscular',
            ageMin: 12,
            ageMinUnit: 'Month' as const,
            ageMax: 15,
            ageMaxUnit: 'Month' as const,
            notes: 'First dose',
          },
        ],
      },
    ],
  } : undefined;
  
  const apiSelectedVaccine = !isVaccineGroupActive && tempState.activePills ? {
    id: Number(tempState.activePills),
    name: apiVaccines.find(v => v.id === Number(tempState.activePills))?.name || 'COVID-19',
    fullName: apiVaccines.find(v => v.id === Number(tempState.activePills))?.fullName || 'COVID-19 Vaccine',
    schedules: [
      {
        id: 1,
        dosage: '0.5ml',
        doses: 2,
        routeOfAdministration: 'Intramuscular',
        ageMin: 18,
        ageMinUnit: 'Year' as const,
        ageMax: null,
        ageMaxUnit: 'Year' as const,
        notes: 'First dose',
      },
    ],
  } : undefined;
  
  const isFetchingSelectedVaccine = false;
  
  // Mock API functions
  const createVaccineRequest = async (data: any) => {
    console.log('Creating vaccination:', data);
    return { success: true };
  };
  
  const recordVaccinationHistoryRequest = async (data: any) => {
    console.log('Recording vaccination history:', data);
    return { success: true };
  };
  
  const apiVaccinationHistory: VaccinationResponseDto[] = [
    {
      id: 1,
      patientId: props.patientId,
      vaccineId: 1,
      vaccine: { id: 1, name: 'COVID-19', fullName: 'COVID-19 Vaccine' },
      vaccineScheduleId: 1,
      isAdministered: true,
      dueDate: new Date().toISOString(),
      dateAdministered: new Date().toISOString(),
      hasComplication: false,
      vaccineBrand: 'Pfizer',
      vaccineBatchNo: 'ABC123',
      note: 'No adverse reactions',
      creationTime: new Date().toISOString(),
      creatorUser: 'Dr. Smith',
      isDeleted: false,
    },
  ];
  
  const apiVaccinationRecords: VaccinationResponseDto[] = [
    {
      id: 2,
      patientId: props.patientId,
      vaccineId: 2,
      vaccine: { id: 2, name: 'Hepatitis B', fullName: 'Hepatitis B Vaccine' },
      vaccineScheduleId: 2,
      isAdministered: false,
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      hasComplication: false,
      note: 'Scheduled for next visit',
      creationTime: new Date().toISOString(),
      creatorUser: 'Dr. Johnson',
      isDeleted: false,
    },
  ];
  
  const refetchVaccinationHistory = () => Promise.resolve();
  const refetchVaccination = () => Promise.resolve();

  function getMergedVaccines() {
    return apiVaccineGroups
      .map((vg) => ({ ...vg, isVaccineGroup: true }))
      .concat(
        apiVaccines.map((vg) => ({ ...vg, isVaccineGroup: false })) || [],
      );
  }

  const availableVaccines = tempState.search
    ? getMergedVaccines().filter((vaccine) =>
        vaccine.name?.toLowerCase().includes(tempState.search.toLowerCase()),
      )
    : getMergedVaccines();

  function getDueDateText(schedule: VaccineScheduleDto) {
    return !schedule.ageMax
      ? schedule.ageMin === 0
        ? 'birth'
        : `${schedule.ageMin} ${_.lowerCase(schedule.ageMinUnit)}${
            schedule.ageMin && schedule.ageMin > 1 ? 's' : ''
          }`
      : `${schedule.ageMax} ${_.lowerCase(schedule.ageMaxUnit)}${
          schedule.ageMax && schedule.ageMax > 1 ? 's' : ''
        }`;
  }

  const selectedVaccine: TVaccination | undefined =
    !isVaccineGroupActive && apiSelectedVaccine
      ? {
          id: apiSelectedVaccine.id?.toString(),
          name: apiSelectedVaccine.name || undefined,
          vaccines: [
            {
              id: apiSelectedVaccine.id?.toString(),
              name: apiSelectedVaccine.name || '',
              acronym: '',
              doses: apiSelectedVaccine.schedules?.map(
                (schedule: VaccineScheduleDto) =>
                  ({
                    id: schedule.id?.toString(),
                    dueDate: getDueDateText(schedule),
                    dueDateValue: schedule.ageMin || schedule.ageMax,
                    dueDateUnit:
                      schedule.ageMaxUnit?.toLowerCase() ||
                      schedule.ageMinUnit?.toLowerCase(),
                  }) as Dose,
              ),
            },
          ],
        }
      : isVaccineGroupActive && apiSelectedVaccineGroup
        ? {
            id: apiSelectedVaccineGroup.id?.toString(),
            name: apiSelectedVaccineGroup?.name || undefined,
            vaccines: apiSelectedVaccineGroup.vaccines?.map((vaccine) => ({
              id: vaccine.id?.toString(),
              name: vaccine.name || undefined,
              doses: vaccine.schedules?.map(
                (schedule: VaccineScheduleDto) =>
                  ({
                    id: schedule.id?.toString(),
                    name: vaccine.name || undefined,
                    dueDate: getDueDateText(schedule),
                    dueDateValue: schedule.ageMin || schedule.ageMax,
                    dueDateUnit:
                      schedule.ageMaxUnit?.toLowerCase() ||
                      schedule.ageMinUnit?.toLowerCase(),
                  }) as Dose,
              ),
            })),
          }
        : undefined;

  const handleRightTablePanel = (value: string) => {
    setActiveTab(value);
  };

  function clearActivePills() {
    dispatch(
      setVaccineState({
        activePills: '',
      }),
    );
  }

  const addItemToActivePills = (item: string) => {
    setActiveSubFilter('');
    if (tempState.activePills === item) {
      // dispatch(
      //   setVaccineState({
      //     activePills: '',
      //     search: '',
      //   })
      // );
    } else {
      dispatch(
        setVaccineState({
          activePills: item,
          search: '',
        }),
      );
    }
  };
  const vaccinationSummaryActions: ActionType[] = [
    {
      id: '1',
      name: 'Mark as resolved',
      action: (id) => {
        setSelectedId(id as number);
        setResolved({ isOpen: true });
      },
    },
    {
      id: '2',
      name: 'Review severity',
      action: (id) => {
        setSelectedId(id as number);
        setSeverity({ isOpen: true });
      },
    },
    {
      id: '3',
      name: 'Highlight for attention',
      action: (id) => {
        setSelectedId(id as number);
        setHighlight({ isOpen: true });
      },
    },

    {
      id: '4',
      name: 'Delete',
      action: (id) => {
        setSelectedId(id as number);
        setLinkDelete({ isOpen: true });
      },
      danger: true,
    },
  ];
  function getVaccinationDoses(vaccination?: TVaccination) {
    let doses: unknown =
      vaccination?.vaccines?.map((vaccine) => {
        return vaccine.doses;
      }) || [];
    doses = _.flatten(doses as Dose[]);
    return doses as Dose[];
  }

  function getActiveVaccineDoses() {
    if (activeSubFilter) {
      if (activeFilter === 'DUE_DATE') {
        return getVaccinationDoses(selectedVaccine).filter((dose) =>
          dose.dueDate?.includes(activeSubFilter),
        );
      }

      return selectedVaccine?.vaccines?.find(
        (vaccine) => vaccine.id === activeSubFilter,
      )?.doses;
    }
    return selectedVaccine?.vaccines?.[0]?.doses;
  }

  function createLocalVaccinationRecord() {
    if (!selectedVaccine) return;
    if (activeTab === 'Record vaccinations') {
      const record: VaccinationRecord[] = [];
      let dueDate = momentBrowserTimezone();
      const vaccines = getVaccinationDoses(selectedVaccine);
      vaccines?.forEach((vaccine, index) => {
        // TODO this has to be calculate from the first administered date of dosage.
        if (index === 0) {
          dueDate = momentBrowserTimezone();
        } else {
          dueDate = dueDate.add(vaccine.dueDateValue, vaccine.dueDateUnit);
        }
        if (vaccine?.id) {
          record.push({
            dueDate: dueDate.toDate().toISOString(),
            patientId: props.patientId,
            encounterId: props.encounterId,
            vaccineId: Number(selectedVaccine.id),
            vaccineScheduleId: Number(vaccine.id),
            isAdministered: false,
            dateAdministered: '',
            hasComplication: false,
            vaccineBrand: '',
            vaccineBatchNo: '',
            note: '',
          });
        }
      });
      dispatch(setVaccineState({ vaccinationRecords: record }));
    } else {
      const record: VaccineState['history'] = [];
      getVaccinationDoses(selectedVaccine)?.forEach((vaccine) => {
        if (vaccine.id) {
          record.push({
            lastVaccineDuration: '',
            lastVaccineDurationUnit: '',
            patientId: props.patientId,
            vaccineId: Number(selectedVaccine.id),
            hasComplication: false,
            note: '',
            encounterId: props.encounterId,
          });
        }
      });
      dispatch(setVaccineState({ history: record }));
    }
  }

  function sortDueDates(intervals: string[]) {
    const isWeek = (interval: string) =>
      interval.toLowerCase().includes('week');

    const getNumericValue = (interval: string) => {
      const num = interval.match(/\d+/)?.[0];
      return parseInt(num || '', 10);
    };

    return intervals.sort((a, b) => {
      if (
        Number.isNaN(getNumericValue(a)) ||
        Number.isNaN(getNumericValue(b))
      ) {
        return 1;
      }
      const aIsWeek = isWeek(a);
      const bIsWeek = isWeek(b);
      if (aIsWeek && bIsWeek) return getNumericValue(a) - getNumericValue(b);
      if (aIsWeek) return -1;
      if (bIsWeek) return 1;
      return getNumericValue(a) - getNumericValue(b);
    });
  }

  function getActiveFilters() {
    if (activeFilter === 'DUE_DATE') {
      const doses = getVaccinationDoses(selectedVaccine);
      const dueDateFilters: string[] = [];
      (doses as Dose[]).forEach((dose) => {
        dueDateFilters.push(dose.dueDate);
      });

      return sortDueDates(Array.from(new Set(dueDateFilters))).map(
        (dueDate) => ({
          id: dueDate,
          name: dueDate,
          isAvailable: true,
        }),
      );
    }

    return selectedVaccine?.vaccines?.map((vaccine) => ({
      id: vaccine.id || '',
      name: vaccine.acronym || vaccine.name || '',
      isAvailable: true,
    }));
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      setVaccineState({
        search: e.target.value,
      }),
    );
  }

  function handleFilterChange(filter: string | null) {
    setActiveSubFilter('');
    setActiveFilter(filter || 'VACCINE');
  }

  useEffect(() => {
    if (
      selectedVaccine &&
      selectedVaccine.vaccines &&
      selectedVaccine.vaccines.length > 1
    ) {
      if (!activeSubFilter && activeFilter) {
        setActiveSubFilter(() => getActiveFilters()?.[0].id || '');
      }
    }

    setActiveDoses(getActiveVaccineDoses() || []);
    createLocalVaccinationRecord();
  }, [
    activeFilter,
    activeSubFilter,
    apiSelectedVaccine,
    apiSelectedVaccineGroup,
    isVaccineGroupActive,
    selectedVaccine,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  function handleDoseInputChange(
    doseIndex: number,
    fieldName: string,
    value: unknown,
  ): void {
    let record: Array<Record<string, unknown>> = tempState.history.slice();
    if (activeTab === 'Record vaccinations') {
      record = tempState.vaccinationRecords.slice();
    }
    record[doseIndex] = {
      ...record[doseIndex],
      [fieldName]: value,
    };
    dispatch(
      setVaccineState({
        ...(activeTab === 'Record vaccinations'
          ? { vaccinationRecords: record }
          : { history: record }),
      }),
    );
  }

  const getValueEnt = () => {
    if (props.procedureId && recordProcedureState.rightSide === 'Preop')
      return 'Preop';
    if (props.procedureId && recordProcedureState.rightSide === 'Intraop')
      return 'Intraop';
    if (props.procedureId && recordProcedureState.rightSide === 'Postop')
      return 'Postop';
    return undefined;
  };

  async function handleSaveVaccination() {
    if (activeTab === 'Record vaccinations') {
      await createVaccineRequest({
        createMultipleVaccinationDto: {
          vaccinations: tempState.vaccinationRecords.filter(
            (p) => p.dateAdministered !== '',
          ) as CreateVaccinationDto[], // Filter out anything that has no administered date
          encounterId: props.encounterId,
          procedureId: props.procedureId,
          procedureEntryType: getValueEnt(),
        },
      });
    } else {
      await recordVaccinationHistoryRequest({
        createMultipleVaccinationHistoryDto: {
          sessionId: props.sessionId,
          encounterId: props.encounterId,
          vaccinationHistory: tempState.history.map((history) => ({
            hasComplication: history.hasComplication,
            lastVaccineDuration: `${history.lastVaccineDuration} ${history.lastVaccineDurationUnit}`,
            note: history.note,
            patientId: history.patientId,
            vaccineId: history.vaccineId,
            encounterId: history.encounterId,
          })),
        },
      });
    }
    props?.saveCallback?.();

    dispatch(
      setVaccineState({
        activePills: '',
        vaccinationRecords: [],
        history: [],
      }),
    );
    await refetchVaccinationHistory();
    await refetchVaccination();
  }

  return (
    <Box mt={16} style={{ borderRadius: 10, background: 'white' }} px={20}>
      <Flex align={'center'} justify="space-between" py={16}>
        <Text style={{ color: appColors.black, fontWeight: 700 }}>
          Vaccination
        </Text>
        <IconArrowOpened onclick={props?.data?.toogleclose} />
      </Flex>
      <Divider orientation="horizontal" size="sm" color={appColors.halfFade} />
      <Box mt={17}>
        <StickyButtonFrame>
          {[
            { name: 'Record vaccinations', key: 1 },
            { name: 'History', key: 2 },
          ].map((value) => {
            return (
              <FrameOne
                key={value.key}
                className={activeTab === value.name ? 'active' : 'not-active'}
                onClick={() => handleRightTablePanel(value.name)}
              >
                {value.name}
              </FrameOne>
            );
          })}
        </StickyButtonFrame>
      </Box>
      <Box>
        {activeTab === 'History' && (
          <Flex align={'center'} gap={'xl'}>
            <Text style={{ fontSize: '14', fontWeight: 700 }} mb={18} mt={18}>
              No History of vaccination
            </Text>
            <Switch
              data-cy="vaccination-main"
              checked={hasHistoryOfVaccination}
              onChange={(event) => {
                setHasHistoryOfVaccination(event.currentTarget.checked);
                dispatch(setVaccineState({ history: [] }));
              }}
            />
          </Flex>
        )}
        {(activeTab === 'Record vaccinations' ||
          (activeTab === 'History' && !hasHistoryOfVaccination)) && (
          <>
            <>
              <Text
                style={{
                  fontSize: '14',
                  fontWeight: 500,
                  color: appColors.lowerText,
                }}
                mb={18}
                mt={10}
              >
                Type of vaccination
              </Text>

              {tempState.activePills && !isFetchingSelectedVaccine ? (
                <Box
                  style={{
                    border: `1px solid ${appColors.halfFade}`,
                    borderRadius: 10,
                    paddingInline: 10,
                    minHeight: '50px',
                    marginTop: 20,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InputsBadge
                    data-testid="selected-vaccine"
                    onClick={clearActivePills}
                    rightSection={
                      <IconClear fill={appColors.text} size={'8'} />
                    }
                  >
                    {selectedVaccine?.name}
                  </InputsBadge>
                </Box>
              ) : (
                <TextInput
                  data-testid="search-vaccinations"
                  style={{
                    marginBottom: 8,
                  }}
                  value={tempState.search}
                  onChange={handleSearchChange}
                  placeholder="Search Vaccinations"
                />
              )}

              <BoxPill height={112} style={{ marginBottom: 16 }}>
                <AutoScrollContainer
                  h={'10em'}
                  style={{ marginTop: 5 }}
                  data-testid="vaccinations-pill-box"
                >
                  <>
                    {availableVaccines && availableVaccines?.length > 0 ? (
                      <>
                        {availableVaccines.map(
                          ({ id, name, isVaccineGroup }, index) => (
                            <Box key={index} px={2}>
                              <InputsBadge
                                onClick={() => {
                                  setIsVaccineGroupActive(isVaccineGroup);
                                  addItemToActivePills(id?.toString() || '');
                                }}
                                data-testid={`vaccine-${name}`}
                                rightSection={<IconPlus />}
                              >
                                {name}
                              </InputsBadge>
                            </Box>
                          ),
                        )}
                      </>
                    ) : (
                      <Text style={{ color: appColors.lowerText }}>
                        No Records Found!
                      </Text>
                    )}
                  </>
                </AutoScrollContainer>
              </BoxPill>

              {tempState.activePills && selectedVaccine && (
                <>
                  <Flex align={'center'} justify={'space-between'} mt={5}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: appColors.black,
                        fontWeight: 700,
                      }}
                    >
                      {selectedVaccine.name}
                    </Text>
                    {selectedVaccine &&
                      selectedVaccine.vaccines &&
                      selectedVaccine.vaccines.length > 1 && (
                        <SelectCustom
                          data={[
                            {
                              label: 'By Due Date',
                              value: 'DUE_DATE',
                            },
                            {
                              label: 'By Vaccine',
                              value: 'VACCINE',
                            },
                          ]}
                          value={activeFilter}
                          onChange={handleFilterChange}
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            input: { fontSize: 16 },
                          }}
                          placeholder="Filter"
                          variant="unstyled"
                          rightSection={<IconUpSmall />}
                        />
                      )}
                  </Flex>
                  {selectedVaccine &&
                    selectedVaccine.vaccines &&
                    selectedVaccine.vaccines.length > 1 && (
                      <>
                        <Divider
                          orientation="horizontal"
                          size="xs"
                          color={appColors.fade}
                        />

                        <TabPanel
                          activeTab={activeSubFilter}
                          tabPanel={getActiveFilters() || []}
                          scrollable={true}
                          spacing={24}
                          handleTabChange={setActiveSubFilter}
                        />
                      </>
                    )}
                  <Divider
                    orientation="horizontal"
                    size="xs"
                    color={appColors.fade}
                    mt={10}
                  />

                  {activeDoses?.map((dose, doseIndex) => (
                    <Box mt={23} key={dose.id}>
                      <Text sx={{ fontSize: '14px', fontWeight: 700 }} mb={16}>
                        {dose.name || `At ${dose.dueDate}`}
                      </Text>
                      {activeTab === 'Record vaccinations' ? (
                        <>
                          <Flex
                            justify={'item'}
                            align={'flex-end'}
                            wrap={{ base: 'wrap', md: 'nowrap' }}
                            rowGap={{ base: 10, md: 0 }}
                            columnGap={40}
                            mb={20}
                            style={{
                              '@media (max-width: 755px)': {
                                justifyContent: 'center',
                              },
                            }}
                          >
                            <CustomDatePicker
                              data-cy="vaccination-visit-date"
                              label={`Visit date`}
                              rightSection={<IconDate />}
                              placeholder="Select Date"
                              value={
                                tempState.vaccinationRecords[doseIndex]?.dueDate
                                  ? new Date(
                                      tempState.vaccinationRecords[
                                        doseIndex
                                      ].dueDate,
                                    )
                                  : undefined
                              }
                              onChange={(value) =>
                                handleDoseInputChange(
                                  doseIndex,
                                  'dueDate',
                                  value?.toISOString(),
                                )
                              }
                              style={{
                                flexGrow: 1,
                                '@media (max-width: 755px)': {
                                  '&.mantine-InputWrapper-root': {
                                    width: '100%',
                                  },
                                },
                              }}
                              styles={(theme) => customDateInputStlyes(theme)}
                            />
                            <Flex
                              justify={'space-between'}
                              align={'center'}
                              direction={'column'}
                            >
                              <Text
                                style={{
                                  color: appColors.subText,
                                  fontWeight: 700,
                                  fontSize: 14,
                                  marginBottom: 11,
                                }}
                              >
                                Administered
                              </Text>
                              <Switch
                                data-cy="vaccination-administered"
                                size="lg"
                                sx={{ marginBottom: 15 }}
                                checked={
                                  tempState.vaccinationRecords[doseIndex]
                                    ?.isAdministered
                                }
                                onChange={(event) =>
                                  handleDoseInputChange(
                                    doseIndex,
                                    'isAdministered',
                                    event.currentTarget.checked,
                                  )
                                }
                              />
                            </Flex>
                            <CustomDatePicker
                              data-cy="vaccination-administered-date"
                              label="Date administered"
                              rightSection={<IconDate />}
                              placeholder="Select Date"
                              style={{
                                flexGrow: 1,
                                '@media (max-width: 755px)': {
                                  '&.mantine-InputWrapper-root': {
                                    width: '100%',
                                  },
                                },
                              }}
                              value={
                                tempState.vaccinationRecords[doseIndex]
                                  ?.dateAdministered
                                  ? new Date(
                                      tempState.vaccinationRecords[
                                        doseIndex
                                      ].dateAdministered,
                                    )
                                  : ('' as unknown as DateValue)
                              }
                              onChange={(value) =>
                                handleDoseInputChange(
                                  doseIndex,
                                  'dateAdministered',
                                  value?.toISOString(),
                                )
                              }
                              styles={(theme) => customDateInputStlyes(theme)}
                            />
                          </Flex>
                          <Box mt={16}>
                            <Flex
                              wrap={{ base: 'wrap', md: 'nowrap' }}
                              rowGap={{ base: 10, md: 0 }}
                              columnGap={24}
                              style={{
                                '@media (max-width: 755px)': {
                                  justifyContent: 'center',
                                },
                              }}
                            >
                              <Flex
                                justify={'space-between'}
                                align={'center'}
                                maw={130}
                                gap={8}
                                direction={'column'}
                              >
                                <Text
                                  style={{
                                    color: appColors.subText,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textAlign: 'center',
                                    lineHeight: '17.33px',
                                  }}
                                >
                                  Complications experienced
                                </Text>
                                <Switch
                                  data-cy="vaccination-complications"
                                  size="lg"
                                  sx={{ marginBottom: 15 }}
                                  checked={
                                    tempState.vaccinationRecords[doseIndex]
                                      ?.hasComplication
                                  }
                                  onChange={(event) =>
                                    handleDoseInputChange(
                                      doseIndex,
                                      'hasComplication',
                                      event.currentTarget.checked,
                                    )
                                  }
                                />
                              </Flex>
                              <CustomTextInput
                                data-cy="vaccination-brand"
                                label="Brand"
                                placeholder="Enter brand"
                                style={{
                                  flexGrow: 1,
                                  '@media (max-width: 755px)': {
                                    '&.mantine-InputWrapper-root': {
                                      width: '100%',
                                    },
                                  },
                                }}
                                value={
                                  tempState.vaccinationRecords[doseIndex]
                                    ?.vaccineBrand
                                }
                                onChange={(event) =>
                                  handleDoseInputChange(
                                    doseIndex,
                                    'vaccineBrand',
                                    event.currentTarget.value,
                                  )
                                }
                              />

                              <CustomTextInput
                                data-cy="vaccination-batch-number"
                                label="Batch number"
                                placeholder="Enter number"
                                sx={{
                                  flexGrow: 1,
                                  '@media (max-width: 755px)': {
                                    '&.mantine-InputWrapper-root': {
                                      width: '100%',
                                    },
                                  },
                                }}
                                value={
                                  tempState.vaccinationRecords[doseIndex]
                                    ?.vaccineBatchNo
                                }
                                onChange={(event) =>
                                  handleDoseInputChange(
                                    doseIndex,
                                    'vaccineBatchNo',
                                    event.currentTarget.value,
                                  )
                                }
                              />
                            </Flex>

                            <CustomTextArea
                              data-cy="vaccination-notes"
                              placeholder="Add notes"
                              mt={16}
                              value={
                                tempState.vaccinationRecords[doseIndex]?.note
                              }
                              onChange={(event) =>
                                handleDoseInputChange(
                                  doseIndex,
                                  'note',
                                  event.currentTarget.value,
                                )
                              }
                            />
                          </Box>
                        </>
                      ) : (
                        <Box pb={20} pt={10}>
                          <Grid gutter={24} columns={2} mb={16} px={10}>
                            <Flex
                              justify={'space-between'}
                              gap={8}
                              style={{ flexGrow: 1 }}
                              direction={'column'}
                            >
                              <Text
                                style={{
                                  color: appColors.subText,
                                  fontWeight: 700,
                                  fontSize: 14,
                                  lineHeight: '17.33px',
                                }}
                              >
                                Period since vaccination
                              </Text>
                              <Flex gap={10}>
                                <NumberInput
                                  type="text"
                                  min={0}
                                  style={{ appearance: 'initial' }}
                                  placeholder="0"
                                  maw={80}
                                  value={Number(
                                    tempState.history[doseIndex]
                                      ?.lastVaccineDuration || '0',
                                  )}
                                  onChange={(event) =>
                                    handleDoseInputChange(
                                      doseIndex,
                                      'lastVaccineDuration',
                                      event,
                                    )
                                  }
                                />
                                <Select
                                  data={[
                                    { label: 'Minutes', value: 'Minutes' },
                                    { label: 'Weeks', value: 'Weeks' },
                                    { label: 'Days', value: 'Days' },
                                    { label: 'Months', value: 'Months' },
                                    { label: 'Years', value: 'Years' },
                                  ]}
                                  placeholder="Interval"
                                  value={
                                    tempState.history[doseIndex]
                                      ?.lastVaccineDurationUnit
                                  }
                                  onChange={(event) =>
                                    handleDoseInputChange(
                                      doseIndex,
                                      'lastVaccineDurationUnit',
                                      event,
                                    )
                                  }
                                />
                              </Flex>
                            </Flex>
                            <Flex
                              justify={'space-between'}
                              align={'center'}
                              gap={8}
                              style={{ flexGrow: 1 }}
                              direction={'column'}
                            >
                              <Text
                                style={{
                                  color: appColors.subText,
                                  fontWeight: 700,
                                  fontSize: 14,
                                  textAlign: 'center',
                                  lineHeight: '17.33px',
                                }}
                              >
                                Complications experienced
                              </Text>
                              <Switch
                                data-cy="vaccination-complications"
                                size="lg"
                                sx={{ marginBottom: 15 }}
                                checked={
                                  tempState.history[doseIndex]?.hasComplication
                                }
                                onChange={(event) =>
                                  handleDoseInputChange(
                                    doseIndex,
                                    'hasComplication',
                                    event.currentTarget.checked,
                                  )
                                }
                              />
                            </Flex>
                          </Grid>
                          <CustomTextArea
                            data-cy="vaccination-notes"
                            placeholder="Add notes"
                            mt={16}
                            value={tempState.history[doseIndex]?.note}
                            onChange={(event) =>
                              handleDoseInputChange(
                                doseIndex,
                                'note',
                                event.currentTarget.value,
                              )
                            }
                          />
                        </Box>
                      )}
                      <Divider
                        orientation="horizontal"
                        size="xs"
                        color={appColors.fade}
                        mt={16}
                        mb={23}
                      />
                    </Box>
                  ))}
                </>
              )}
            </>
          </>
        )}

        <Flex justify={'flex-end'} mt={38}>
          <Button
            data-cy="vaccination-save-button"
            sx={{
              borderRadius: '10px',
              background: appColors.green,
              '&:hover': {
                background: appColors.green,
              },
            }}
            disabled={hasHistoryOfVaccination ? false : !tempState.activePills}
            onClick={handleSaveVaccination}
          >
            Save
          </Button>
        </Flex>
        <Divider
          orientation="horizontal"
          size="sm"
          color={appColors.quatreFade}
          my={16}
        />
        <ItemListVerticalScrollWrapper height={200}>
          <Stack pb={30}>
            {(
              apiVaccinationRecords.concat(
                apiVaccinationHistory || [],
              ) as (VaccinationResponseDto & {
                lastVaccineDuration?: string | null;
              })[]
            ).map((history, index) => (
              <React.Fragment key={index}>
                <GridWrapperThreeCol>
                  <Box
                    sx={{
                      fontSize: 14,
                      color: appColors.subText,
                      lineHeight: '17px',
                    }}
                    className="attribute-container date-col"
                  >
                    <Box>
                      <Box>
                        {momentBrowserTimezone(history.creationTime).format(
                          'hh:mm A',
                        )}
                      </Box>
                      <Box sx={{ whiteSpace: 'pre-wrap' }}>
                        {momentBrowserTimezone(history.creationTime)
                          .startOf('day')
                          .isSame(momentBrowserTimezone().startOf('day'))
                          ? 'Today'
                          : momentBrowserTimezone(history.creationTime).format(
                              'LL',
                            )}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    component="span"
                    fw={500}
                    color={appColors.blue}
                    className="attribute-container main-col"
                  >
                    <VaccinationSummary
                      history={history}
                      procedureId={props.procedureId}
                    />
                  </Box>

                  <Box
                    component="span"
                    className="attribute-container caret-col"
                  >
                    <Menu
                      shadow="lg"
                      position={'bottom-end'}
                      offset={{ mainAxis: -15, crossAxis: -10 }}
                    >
                      <Menu.Target>
                        <Box component="span" mx={20}>
                          <IconThreeDots size={14} />
                        </Box>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {vaccinationSummaryActions.map((action) => (
                          <Menu.Item
                            key={action.id}
                            fw={600}
                            w={'100%'}
                            onClick={() => {
                              action.action(history.id as number);
                            }}
                            c={action.danger
                              ? appColors.red
                              : appColors.black}
                            sx={{
                              fontSize: 14,
                            }}
                          >
                            <span>{action.name}</span>
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Box>
                </GridWrapperThreeCol>
                <Divider
                  orientation="horizontal"
                  size="sm"
                  color={appColors.quatreFade}
                />
              </React.Fragment>
            ))}
          </Stack>
        </ItemListVerticalScrollWrapper>
      </Box>
    </Box>
  );
};

export default Vaccination;
