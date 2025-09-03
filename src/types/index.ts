export interface AdditonalInterface {
  facilities: {
    id: string | number | undefined;
    is_laboratory: boolean;
    is_pharmacy: boolean;
    patient_id_setup: string;
  }[];
}
export interface ApiStateInterface {
  data?: {
    error?: {
      code: number;
      message: string;
      details: null;
      validationErrors: null;
    };
  };
}

export type NavbarType = {
  name: string;
  path: string;
  completed?: boolean;
  active: boolean;
  tenantOnboardingStatus: string;
  id: number;
  status?: string;
};

import { PlanCoverage } from '@/state/services/enrolmentPlanApi';

export type PricingItemType = {
  name: string;
  pricingItem: string[];
  covered: string[];
};
export type PricingCategoryType = {
  category: string;
  coverLimit: number;
  pricingItems: PricingItemType[];
};

export type PlansDataType = {
  planName: {
    name: string;
    planMRL: number;
    planType: string;
    regionOfCover: string;
  };
  overallLimit: number;
  actualPrice: {
    amount: number;
    type: string;
  }[];
  provider: {
    name: string;
    tier: string;
  };
  planCoverage: string;
  livesUnderPlan: {
    count: number;
    type: string;
  }[];
  analytics: number[];
  pricingCategory: PricingCategoryType[];
};

export type PlanCoverageActualPriceType = {
  planCoverage: PlanCoverage;
  overAllLimit: number;
  planCoverageName: string;
};

export type ProvidersType = {
  providerId: number;
  providerName: string;
  providerLocation: string;
  providerTier: string;
  providerEnrolleeCount: number;
  providerRating: number;
  averageClaimsTillDate: {
    amount: number;
    date: string;
  };
  totalClaimsPaid: {
    amount: number;
    date: string;
  };
  totalClaimsOutstanding: {
    amount: number;
    date: string;
  };
  analytics: number[];
};
export type TenantCategoryType = 'Public' | 'Private';

export const TenantCategory = {
  Public: 'Public',
  Private: 'Private',
} as const;
export type StatusColors = {
  [key: string]: { bg: string; color: string; text?: string; border?: string };
};