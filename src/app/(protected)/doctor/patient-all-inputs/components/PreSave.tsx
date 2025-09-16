import { Flex, Text, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';
import IconCloseX from '@/components/shared/IconComponents/IconCloseX';
import AddInput from '@/components/shared/AddInput';
import IconClose from '@/components/shared/IconComponents/IconClose';
import { PatientSuggestedMedicationsResponseDto } from '@/types/index';
import IconPencilBold from '@/components/shared/IconComponents/IconPencilBold';

export type DefaultInputState = {
  mainSearchResult: string;
  note: string;
};

const PreSave = <T extends DefaultInputState>({
  inputFieldName,
  states = [],
  stateSummaries = [],
  isMainInputEnabled = false,
  tempState,
  addButtonLocation = 'left',
  initialState,
  setStateCallback,
  setTempCallback,
  hideNote,
  groupedActivePills,
  setGroupedActivePills,
  updatedGroupedActivePills,
  setUpdatedGroupedActivePills,
}: {
  addButtonLocation?: 'left' | 'right';
  inputFieldName: string;
  states: T[];
  stateSummaries: { mainSearchResult: string; summary: string }[];
  tempState: T;
  initialState: unknown;
  isMainInputEnabled?: boolean;
  setStateCallback: ActionCreator<any>;
  setTempCallback?: ActionCreatorWithPayload<any>;
  hideNote?: boolean;
  groupedActivePills?: PatientSuggestedMedicationsResponseDto[];
  updatedGroupedActivePills?: PatientSuggestedMedicationsResponseDto[];
  setGroupedActivePills?: React.Dispatch<
    React.SetStateAction<PatientSuggestedMedicationsResponseDto[]>
  >;
  setUpdatedGroupedActivePills?: React.Dispatch<
    React.SetStateAction<PatientSuggestedMedicationsResponseDto[]>
  >;
}) => {
  const dispatch = useAppDispatch();

  const [isNoteOpen, setNoteOpen] = useState<boolean>(false);

  return (
    <div data-testid={'pre-save'}>
      <Flex
        align={'center'}
        gap={12}
        justify={'space-between'}
        mt={28}
        wrap={'wrap'}
      >
        {hideNote || isNoteOpen ? null : (
          <AddInput
            data-testid={`add-${inputFieldName}-notes`}
            disabled={
              !isMainInputEnabled || (groupedActivePills?.length ?? 0) > 0
            }
            onClick={() => setNoteOpen(true)}
            text={`Add ${inputFieldName} notes`}
          />
        )}

        {isNoteOpen && (
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
                {`Add ${inputFieldName} notes`}
              </Text>
              <IconClose
                handleClose={() => {
                  setNoteOpen(false);
                }}
              />
            </Flex>

            <Textarea
              data-testid={`note-${inputFieldName}`}
              w={'100%'}
              autosize
              minRows={5}
              placeholder={`Type to Add ${inputFieldName} Notes`}
              onChange={(event) => {}}
              value={tempState?.note}
            ></Textarea>
          </Flex>
        )}
        {addButtonLocation === 'right' && <div></div>}
        <AddInput
          data-testid={`add-${inputFieldName}`}
          disabled={!isMainInputEnabled}
          onClick={() => {
            if ((groupedActivePills?.length ?? 0) > 0) {
              const newStates = [...(updatedGroupedActivePills ?? [])];
              newStates?.push(
                groupedActivePills?.[0] as PatientSuggestedMedicationsResponseDto,
              );
              setUpdatedGroupedActivePills?.(
                newStates as PatientSuggestedMedicationsResponseDto[],
              );
              setGroupedActivePills?.([]);
            } else {
              const newStates = [...states];
              newStates.push(tempState);
              dispatch(setStateCallback(newStates));
              // dispatch(setTempCallback(initialState));
            }
            setNoteOpen(false);
          }}
          text={`Add ${inputFieldName}`}
        />
      </Flex>
      {states?.length > 0 ||
        ((updatedGroupedActivePills?.length ?? 0) > 0 && (
          <Flex align={'center'} gap={12} justify={'flex-end'} mt={20}>
            <Text
              onClick={() => {
                dispatch(setStateCallback([]));
                // dispatch(setTempCallback(initialState));
                setGroupedActivePills?.([]);
                setUpdatedGroupedActivePills?.([]);
              }}
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                lineHeight: '28px',
                color: '#0B0C7D',
                textDecoration: 'underline',
              }}
            >
              Clear all
            </Text>
            <IconCloseX fill={'#0B0C7D'} />
          </Flex>
        ))}
      {updatedGroupedActivePills?.map((summaryVal, index) => (
        <Flex
          data-testid={`draft-${index}`}
          align={'flex-start'}
          justify={'space-between'}
          mt={16}
          columnGap={40}
          key={index}
        >
          <Text span>
            <Text span data-testid={`draft-message-${index}`}>
              {summaryVal?.name ?? ''}
            </Text>
          </Text>

          <Flex align={'center'} columnGap={20}>
            <IconPencilBold
              data-testid={`edit-${inputFieldName}`}
              onClick={() => {
                const indexVal = summaryVal?.id;
                const findActivePill = updatedGroupedActivePills?.find(
                  (ii) => ii.id === indexVal,
                );
                if (findActivePill) {
                  setGroupedActivePills?.([findActivePill]);
                }
                const filterOut = updatedGroupedActivePills?.filter(
                  (ip) => ip.id !== indexVal,
                );
                setUpdatedGroupedActivePills?.(filterOut ?? []);
                setNoteOpen(false);
              }}
            />
            <IconCloseX
              fill={'#0B0C7D'}
              data-testid={`delete-${inputFieldName}`}
              onclick={() => {
                const indexVal = summaryVal?.id;
                const filterOut = updatedGroupedActivePills?.filter(
                  (ip) => ip.id !== indexVal,
                );
                setUpdatedGroupedActivePills?.(filterOut ?? []);
              }}
            />
          </Flex>
        </Flex>
      ))}
      {stateSummaries?.map((summaryResult, index) => (
        <Flex
          data-testid={`draft-${index}`}
          align={'flex-start'}
          justify={'space-between'}
          mt={16}
          columnGap={40}
          key={index}
        >
          <Text span>
            {summaryResult?.mainSearchResult && (
              <Text span sx={{ fontWeight: 700, color: '#051438' }}>
                {summaryResult?.mainSearchResult}&nbsp; - &nbsp;
              </Text>
            )}
            <Text span data-testid={`draft-message-${index}`} fw={500}>
              {summaryResult?.summary}
            </Text>
          </Text>

          <Flex align={'center'} columnGap={20}>
            <IconPencilBold
              data-testid={`edit-${inputFieldName}`}
              onClick={() => {
                const stateToSet = states[index];
                // dispatch(setTempCallback(stateToSet));

                const newStates = states.filter((_, i) => i !== index);
                dispatch(setStateCallback(newStates));

                if (stateToSet.note !== '') {
                  setNoteOpen(true);
                }
              }}
            />
            <IconCloseX
              fill={'#0B0C7D'}
              data-testid={`delete-${inputFieldName}`}
              onclick={() => {
                const newStates = states.filter((_, i) => i !== index);
                dispatch(setStateCallback(newStates));
              }}
            />
          </Flex>
        </Flex>
      ))}
    </div>
  );
};

export default PreSave;
