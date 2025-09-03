import { baseApi as api } from './baseApi';
export const addTagTypes = [
  'Enrolee',
  'EnroleePayment',
  'EnroleeProfile',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppEnroleeCreateneworupdateenroleePost: build.mutation<
        ApiServicesAppEnroleeCreateneworupdateenroleePostApiResponse,
        ApiServicesAppEnroleeCreateneworupdateenroleePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/CreateNewOrUpdateEnrolee`,
          method: 'POST',
          body: queryArg.createEnroleeRequestDto,
        }),
        invalidatesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeCreatenewenroleefromcsvPost: build.mutation<
        ApiServicesAppEnroleeCreatenewenroleefromcsvPostApiResponse,
        ApiServicesAppEnroleeCreatenewenroleefromcsvPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/CreateNewEnroleeFromCsv`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeGetenroleesGet: build.query<
        ApiServicesAppEnroleeGetenroleesGetApiResponse,
        ApiServicesAppEnroleeGetenroleesGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/GetEnrolees`,
          params: {
            Filter: queryArg.filter,
            PlanCoverage: queryArg.planCoverage,
            SortByDescending: queryArg.sortByDescending,
            Sorting: queryArg.sorting,
            SkipCount: queryArg.skipCount,
            MaxResultCount: queryArg.maxResultCount,
          },
        }),
        providesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeGetenroleeGet: build.query<
        ApiServicesAppEnroleeGetenroleeGetApiResponse,
        ApiServicesAppEnroleeGetenroleeGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/GetEnrolee`,
          params: { id: queryArg.id },
        }),
        providesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeEndorseenroleePost: build.mutation<
        ApiServicesAppEnroleeEndorseenroleePostApiResponse,
        ApiServicesAppEnroleeEndorseenroleePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/EndorseEnrolee`,
          method: 'POST',
          body: queryArg.endorseEnroleeRequestDto,
        }),
        invalidatesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeGenerateenroleecodePost: build.mutation<
        ApiServicesAppEnroleeGenerateenroleecodePostApiResponse,
        ApiServicesAppEnroleeGenerateenroleecodePostApiArg
      >({
        query: () => ({
          url: `/api/services/app/Enrolee/GenerateEnroleeCode`,
          method: 'POST',
        }),
        invalidatesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeCreatecodetemplatePost: build.mutation<
        ApiServicesAppEnroleeCreatecodetemplatePostApiResponse,
        ApiServicesAppEnroleeCreatecodetemplatePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/Enrolee/CreateCodeTemplate`,
          method: 'POST',
          body: queryArg.createEnroleeCodeTemplateRequestDto,
        }),
        invalidatesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleeGetenrolmentmetricsGet: build.query<
        ApiServicesAppEnroleeGetenrolmentmetricsGetApiResponse,
        ApiServicesAppEnroleeGetenrolmentmetricsGetApiArg
      >({
        query: () => ({ url: `/api/services/app/Enrolee/GetEnrolmentMetrics` }),
        providesTags: ['Enrolee'],
      }),
      apiServicesAppEnroleepaymentGetpaymentcheckoutGet: build.query<
        ApiServicesAppEnroleepaymentGetpaymentcheckoutGetApiResponse,
        ApiServicesAppEnroleepaymentGetpaymentcheckoutGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/EnroleePayment/GetPaymentCheckout`,
          params: { reference: queryArg.reference },
        }),
        providesTags: ['EnroleePayment'],
      }),
      apiServicesAppEnroleepaymentProcessmonnifypaymentPost: build.mutation<
        ApiServicesAppEnroleepaymentProcessmonnifypaymentPostApiResponse,
        ApiServicesAppEnroleepaymentProcessmonnifypaymentPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/EnroleePayment/ProcessMonnifyPayment`,
          method: 'POST',
          body: queryArg.monnifyPaymentResponseDto,
        }),
        invalidatesTags: ['EnroleePayment'],
      }),
      enroleeCreateenroleeprofilePost: build.mutation<
        EnroleeCreateenroleeprofilePostApiResponse,
        EnroleeCreateenroleeprofilePostApiArg
      >({
        query: (queryArg) => ({
          url: `/Enrolee/CreateEnroleeProfile`,
          method: 'POST',
          body: queryArg.createEnroleeProfileRequestDto,
        }),
        invalidatesTags: ['EnroleeProfile'],
      }),
      enroleeCreateaccountPost: build.mutation<
        EnroleeCreateaccountPostApiResponse,
        EnroleeCreateaccountPostApiArg
      >({
        query: (queryArg) => ({
          url: `/Enrolee/CreateAccount`,
          method: 'POST',
          body: queryArg.createUserAccount,
        }),
        invalidatesTags: ['EnroleeProfile'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enroleeApi };
export type ApiServicesAppEnroleeCreateneworupdateenroleePostApiResponse =
  /** status 200 Success */ CreateEnroleeResponseDto;
export type ApiServicesAppEnroleeCreateneworupdateenroleePostApiArg = {
  createEnroleeRequestDto: CreateEnroleeRequestDto;
};
export type ApiServicesAppEnroleeCreatenewenroleefromcsvPostApiResponse =
  /** status 200 Success */ EnroleeUploadResponseDto;
export type ApiServicesAppEnroleeCreatenewenroleefromcsvPostApiArg = {
  body: {
    EnroleeCsvFile?: Blob;
  };
};
export type ApiServicesAppEnroleeGetenroleesGetApiResponse =
  /** status 200 Success */ PagedResultDtoOfGetEnroleesResponseDto;
export type ApiServicesAppEnroleeGetenroleesGetApiArg = {
  filter?: string;
  planCoverage?: PlanCoverage;
  sortByDescending?: boolean;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppEnroleeGetenroleeGetApiResponse =
  /** status 200 Success */ GetEnroleeDetailsResponseDto;
export type ApiServicesAppEnroleeGetenroleeGetApiArg = {
  id?: number;
};
export type ApiServicesAppEnroleeEndorseenroleePostApiResponse = unknown;
export type ApiServicesAppEnroleeEndorseenroleePostApiArg = {
  endorseEnroleeRequestDto: EndorseEnroleeRequestDto;
};
export type ApiServicesAppEnroleeGenerateenroleecodePostApiResponse =
  /** status 200 Success */ string;
export type ApiServicesAppEnroleeGenerateenroleecodePostApiArg = void;
export type ApiServicesAppEnroleeCreatecodetemplatePostApiResponse = unknown;
export type ApiServicesAppEnroleeCreatecodetemplatePostApiArg = {
  createEnroleeCodeTemplateRequestDto: CreateEnroleeCodeTemplateRequestDto;
};
export type ApiServicesAppEnroleeGetenrolmentmetricsGetApiResponse =
  /** status 200 Success */ GetEnrolmentMetricsResponseDto;
export type ApiServicesAppEnroleeGetenrolmentmetricsGetApiArg = void;
export type ApiServicesAppEnroleepaymentGetpaymentcheckoutGetApiResponse =
  /** status 200 Success */ GetPaymentCheckoutDto;
export type ApiServicesAppEnroleepaymentGetpaymentcheckoutGetApiArg = {
  reference?: string;
};
export type ApiServicesAppEnroleepaymentProcessmonnifypaymentPostApiResponse =
  unknown;
export type ApiServicesAppEnroleepaymentProcessmonnifypaymentPostApiArg = {
  monnifyPaymentResponseDto: MonnifyPaymentResponseDto;
};
export type EnroleeCreateenroleeprofilePostApiResponse =
  /** status 200 Success */ CreateEnroleeProfileResponseDto;
export type EnroleeCreateenroleeprofilePostApiArg = {
  createEnroleeProfileRequestDto: CreateEnroleeProfileRequestDto;
};
export type EnroleeCreateaccountPostApiResponse =
  /** status 200 Success */ CreateEnroleeProfileResponseDto;
export type EnroleeCreateaccountPostApiArg = {
  createUserAccount: CreateUserAccount;
};
export type CreateEnroleeResponseDto = {
  enrolleeId?: number;
};
export type GenderType = 'Male' | 'Female' | 'Other';
export type PlanCoverage = 0 | 1 | 2;
export type EnrolmentMethod = 0 | 1 | 2 | 3 | 4;
export type EnroleeDependantDto = {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  gender?: GenderType;
  dateOfBirth?: string;
  phoneNumber?: string | null;
  emailAddress?: string | null;
  countryId?: number;
  regionId?: number;
  address?: string | null;
  planCoverage?: PlanCoverage;
  isVip?: boolean;
  hasPreExistingConditions?: boolean;
  preExistingConditions?: string | null;
  preferredHospitalId?: number;
  districtId?: number;
  enrolmentPlanId?: number;
  relationShip?: string | null;
  enrolmentMethod?: EnrolmentMethod;
};
export type CreateEnroleeRequestDto = {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  gender?: GenderType;
  dateOfBirth?: string;
  phoneNumber: string;
  emailAddress: string;
  countryId?: number;
  regionId?: number;
  address?: string | null;
  planCoverage?: PlanCoverage;
  isVip?: boolean;
  hasPreExistingConditions?: boolean;
  preExistingConditions?: string | null;
  preferredHospitalId?: number;
  enrolmentPlanId?: number;
  enroleeDependants?: EnroleeDependantDto[] | null;
  id?: number;
  enrolmentMethod?: EnrolmentMethod;
  preferredHospitalLocation?: string | null;
};
export type EnroleeUploadResponseDto = {
  successItemsCount?: number;
  failedItemCount?: number;
  failedUploadMessages?: string[] | null;
};
export type MoneyDto = {
  amount: number;
  currency: string;
};
export type PlanType = 'General' | 'Bespoke';
export type GetEnroleesResponseDto = {
  dependants?: GetEnroleesResponseDto[] | null;
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  provider?: string | null;
  dependantsCount?: number;
  tiers?: string[] | null;
  isNew?: boolean;
  premiumAmount?: MoneyDto;
  dateOfBirth?: string;
  gender?: GenderType;
  insuranceId?: string | null;
  planCoverage?: PlanCoverage;
  planType?: PlanType;
  creationTime?: string;
  lastModificationTime?: string | null;
  countryId?: number | null;
  regionId?: number | null;
  region?: string | null;
  isVip?: boolean;
  hasPreExistingConditions?: boolean;
  preExistingConditions?: string | null;
  preferredHospitalId?: number | null;
  address?: string | null;
  imageUrl?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  relationship?: string | null;
  enrolmentPlanId?: number;
  enrolmentPlanName?: string | null;
  enrolmentMethod?: EnrolmentMethod;
  preferredHospitalLocation?: string | null;
};
export type PagedResultDtoOfGetEnroleesResponseDto = {
  totalCount?: number;
  items?: GetEnroleesResponseDto[] | null;
};
export type GetEnroleeDetailsResponseDto = {
  dependants?: GetEnroleesResponseDto[] | null;
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  provider?: string | null;
  dependantsCount?: number;
  tiers?: string[] | null;
  premiumAmount?: MoneyDto;
  dateOfBirth?: string;
  gender?: GenderType;
  insuranceId?: string | null;
  planCoverage?: PlanCoverage;
  planType?: PlanType;
  creationTime?: string;
  lastModificationTime?: string | null;
  countryId?: number | null;
  regionId?: number | null;
  region?: string | null;
  isVip?: boolean;
  hasPreExistingConditions?: boolean;
  preExistingConditions?: string | null;
  preferredHospitalId?: number | null;
  address?: string | null;
  imageUrl?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  relationship?: string | null;
  enrolmentPlanId?: number;
  preferredHospitalLocation?: string | null;
};
export type EndorseEnroleeRequestDto = {
  enroleeId?: number;
};
export type CreateEnroleeCodeTemplateRequestDto = {
  prefix?: string | null;
  length?: number;
  suffix?: string | null;
  startingIndex?: number;
  isActive?: boolean;
};
export type GetEnrolmentMetricsResponseDto = {
  totalEnroleesCount?: number;
  totalDependentsCount?: number;
  totalFamilyEnrolees?: number;
  totalIndividualEnrolees?: number;
  totalCorporateMerchants?: number;
  totalMaleCount?: number;
  totalFemaleCount?: number;
  totalEnroleesWithDeclaredCondition?: number;
  enrolmentMethodCount?: {
    [key: string]: number | null;
  } | null;
};
export type GetPaymentCheckoutDto = {
  amount?: number;
  currency?: string | null;
  reference?: string | null;
  customerFullName?: string | null;
  customerEmail?: string | null;
  paymentDescription?: string | null;
  metaData?: {
    [key: string]: string | null;
  } | null;
};
export type MonnifyPaymentResponseDto = {
  paymentReference?: string | null;
  transactionReference?: string | null;
  paymentStatus?: string | null;
};
export type CreateEnroleeProfileResponseDto = {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: number;
};
export type CreateEnroleeProfileRequestDto = {
  tenantId?: number;
  enroleeId?: number;
  username: string;
  password: string;
  confirmPassword: string;
};
export type CreateUserAccount = {
  tenantId?: number;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  username: string;
  password: string;
  confirmPassword: string;
};
export const {
  useApiServicesAppEnroleeCreateneworupdateenroleePostMutation,
  useApiServicesAppEnroleeCreatenewenroleefromcsvPostMutation,
  useApiServicesAppEnroleeGetenroleesGetQuery,
  useApiServicesAppEnroleeGetenroleeGetQuery,
  useApiServicesAppEnroleeEndorseenroleePostMutation,
  useApiServicesAppEnroleeGenerateenroleecodePostMutation,
  useApiServicesAppEnroleeCreatecodetemplatePostMutation,
  useApiServicesAppEnroleeGetenrolmentmetricsGetQuery,
  useApiServicesAppEnroleepaymentGetpaymentcheckoutGetQuery,
  useApiServicesAppEnroleepaymentProcessmonnifypaymentPostMutation,
  useEnroleeCreateenroleeprofilePostMutation,
  useEnroleeCreateaccountPostMutation,
} = injectedRtkApi;
