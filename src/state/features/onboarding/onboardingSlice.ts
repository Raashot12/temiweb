import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type Step = {
  step: number;
  title: string;
  link: string;
  completed: boolean;
};

type OnboardingState = {
  mobileNavOpened: boolean;
  activeStep: number;
  steps: Step[];
  percentage: number;
};

const initialState = {
  mobileNavOpened: false,
  activeStep: 1,
  percentage: 0,
  steps: [
    {
      step: 1,
      title: 'Facility details',
      link: '/onboarding/facility-details',
      completed: false,
    },
    {
      step: 2,
      title: 'Documentation',
      link: '/onboarding/documentation',
      completed: false,
    },
    {
      step: 3,
      title: 'Additional details',
      link: '/onboarding/additional-details',
      completed: false,
    },
    {
      step: 4,
      title: 'Departments',
      link: '/onboarding/departments',
      completed: false,
    },
    {
      step: 5,
      title: 'Wards',
      link: '/onboarding/wards',
      completed: false,
    },
    {
      step: 6,
      title: 'Job titles & levels',
      link: '/onboarding/job-titles',
      completed: false,
    },
    {
      step: 7,
      title: 'Staff',
      link: '/onboarding/staff',
      completed: false,
    },
    {
      step: 8,
      title: 'Review Details',
      link: '/onboarding/review-details',
      completed: false,
    },
    {
      step: 9,
      title: 'Review Details',
      link: '/onboarding/review-details',
      completed: false,
    },
  ],
} as OnboardingState;

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setCurrentPercent: (state, action) => {
      state.percentage = action.payload;
    },
    toggleMobileNav: (state) => {
      state.mobileNavOpened = !state.mobileNavOpened;
    },
  },
});

export const { setActiveStep, toggleMobileNav, setCurrentPercent } =
  onboardingSlice.actions;

export const selectOnboardingSteps = (state: RootState): Step[] =>
  state.onboarding.steps;

export const selectActiveStep = (state: RootState): number =>
  state.onboarding.activeStep;
export const selectCurrentPercent = (state: RootState): number =>
  state.onboarding.percentage;

export const selectMobileNavOpened = (state: RootState): boolean =>
  state.onboarding.mobileNavOpened;

export default onboardingSlice.reducer;
