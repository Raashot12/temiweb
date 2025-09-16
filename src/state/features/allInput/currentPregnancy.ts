import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import type { RootState } from '../../store';

export type CurrentPregnancyState = {
  frequency?: number;
  durationContractions?: number;
  contractionsIntensity: string;
  dilation: string;
  effacement: string;
  station: string;
  descentOfHead: string;
  cervixIntensity: string;
  fetalPresentation: Pill[];
  fetalSearchText: string;
  amnioticFluids: Pill[];
  amnioticSearchText: string;
  moulding: Pill[];
  mouldingSearchText: string;
  urine: { name: string; value: string }[];
  urineVolume?: number;
};

export type Pill = {
  value: string;
  type?: string;
  snowmedId?: string;
};
export const initialState = {
  tempState: {
    frequency: undefined,
    durationContractions: undefined,
    contractionsIntensity: '',
    dilation: '',
    effacement: '',
    station: '',
    descentOfHead: '',
    cervixIntensity: '',
    fetalSearchText: '',
    amnioticSearchText: '',
    mouldingSearchText: '',
    fetalPresentation: [],
    amnioticFluids: [],
    moulding: [],
    urine: [],
    urineVolume: undefined,
  },
} as {
  tempState: CurrentPregnancyState;
};

const currentPregnancySlice = createSlice({
  name: 'AllInputPregnancy',
  initialState,
  reducers: {
    setTempState: (state, action) => {
      state.tempState = _.mergeWith(
        state.tempState,
        action.payload,
        // eslint-disable-next-line consistent-return
        (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        },
      );
    },
  },
});

export const { setTempState } = currentPregnancySlice.actions;

export const selectTempState = (state: RootState): CurrentPregnancyState => {
  return {
    frequency: 3,
    durationContractions: 45,
    contractionsIntensity: 'Moderate',
    dilation: '5cm',
    effacement: '60%',
    station: '-2',
    descentOfHead: 'Engaged',
    cervixIntensity: 'Soft',
    fetalPresentation: [],
    fetalSearchText: '',
    amnioticFluids: [],
    amnioticSearchText: '',
    moulding: [],
    mouldingSearchText: '',
    urine: [
      { name: 'Protein', value: 'Negative' },
      { name: 'Glucose', value: 'Trace' },
      { name: 'Ketones', value: 'Negative' },
    ],
    urineVolume: 150,
  };
};

export default currentPregnancySlice.reducer;
