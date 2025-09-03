import { useEffect } from 'react';
import { useAppDispatch } from '@/state/hooks';
import { setActiveStep } from '@/state/features/onboarding/onboardingSlice';

const useSetActiveStepForOnboarding = (step: number) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveStep(step));
  }, [dispatch, step]);
};

export default useSetActiveStepForOnboarding;
