"use client";
import useSetActiveStepForOnboarding from "hooks/useSetActiveStepForOnboarding";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OnboardingHome = () => {
  const router = useRouter();
  useSetActiveStepForOnboarding(0);
  useEffect(() => {
    router.push("/onboarding/insurer-details");
  });

  return null;
};

export default OnboardingHome;
