import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DefaultInputState } from '@/state/features/allInput/genericTypes';
import type { RootState } from '../../store';

type AddOns = {
  name?: string;
  activePills?: Pill[];
};

export type SavedFile = {
  id: string;
  name: string;
};

export type ImageProps = {
  id?: string | number;
  imageSrc?: string;
  file?: File | Blob | SavedFile;
  blob?: string | Blob;
};

export type PhysicalExaminationStates = DefaultInputState & {
  mainSearchedHeader: string;
  mainSearchResult: string;
  selectedHead: string;
  note: string;
  activePills: Array<Pill>;
  site: AddOns;
  plane: AddOns;
  qualifiers: AddOns;
  images: ImageProps[];
};

export type Pill = {
  value: string;
  header?: string;
  type?: string;
  snowmedId?: string;
};
export const initialState = {
  tempPhysicalExaminationState: {
    note: '',
    mainSearchedHeader: 'General',
    mainSearchResult: '',
    selectedHead: 'Inspection',
    activePills: [],
    site: {
      name: '',
      activePills: [],
    },
    plane: {
      name: '',
      activePills: [],
    },
    qualifiers: {
      name: '',
      activePills: [],
    },
    images: [],
  },
  states: [],
} as {
  states: PhysicalExaminationStates[];
  tempPhysicalExaminationState: PhysicalExaminationStates;
};

const physicalExaminationSlice = createSlice({
  name: 'AllPhysicalExaminationPreSaves',
  initialState,
  reducers: {
    setTempPhysicalExaminationState: (state, action) => {
      state.tempPhysicalExaminationState = _.mergeWith(
        state.tempPhysicalExaminationState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
      );
    },
    setPhysicalExaminationStates: (state, action) => {
      state.states = action.payload;
    },
  },
});

export const { setPhysicalExaminationStates, setTempPhysicalExaminationState } =
  physicalExaminationSlice.actions;

export const selectStates = (state: RootState): PhysicalExaminationStates[] => {
  // TODO: Replace with actual state data when ready
  return [
    {
      note: 'Normal heart sounds, no murmurs detected',
      mainSearchedHeader: 'Cardiovascular',
      mainSearchResult: 'Heart rate regular',
      selectedHead: 'Auscultation',
      activePills: [
        {
          value: 'Regular rhythm',
          header: 'Cardiovascular',
          type: 'Finding',
          snowmedId: '271636001',
        },
      ],
      site: {
        name: 'Chest',
        activePills: [{ value: 'Precordium', type: 'Site' }],
      },
      plane: {
        name: 'Anterior',
        activePills: [{ value: 'Anterior chest', type: 'Plane' }],
      },
      qualifiers: {
        name: 'Normal',
        activePills: [{ value: 'Within normal limits', type: 'Qualifier' }],
      },
      images: [],
    },
  ];
};

export const selectTempPhysicalExaminationState = (
  state: RootState
): PhysicalExaminationStates => {
  // TODO: Replace with actual state data when ready
  return {
    note: '',
    mainSearchedHeader: 'General',
    mainSearchResult: '',
    selectedHead: 'Inspection',
    activePills: [],
    site: {
      name: '',
      activePills: [],
    },
    plane: {
      name: '',
      activePills: [],
    },
    qualifiers: {
      name: '',
      activePills: [],
    },
    images: [],
  };
};

export default physicalExaminationSlice.reducer;
