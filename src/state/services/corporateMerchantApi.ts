import { baseApi as api } from './baseApi';
export const addTagTypes = ['CorporateMerchant'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiServicesAppCorporatemerchantGetplansGet: build.query<
        ApiServicesAppCorporatemerchantGetplansGetApiResponse,
        ApiServicesAppCorporatemerchantGetplansGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporateMerchant/GetPlans`,
          params: { corporateMerchantId: queryArg.corporateMerchantId },
        }),
        providesTags: ['CorporateMerchant'],
      }),
      apiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPost:
        build.mutation<
          ApiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPostApiResponse,
          ApiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPostApiArg
        >({
          query: (queryArg) => ({
            url: `/api/services/app/CorporateMerchant/CreateNewOrUpdateCorporateMerchant`,
            method: 'POST',
            body: queryArg.createCorporateMerchantRequestDto,
          }),
          invalidatesTags: ['CorporateMerchant'],
        }),
      apiServicesAppCorporatemerchantGetcorporatemerchantGet: build.query<
        ApiServicesAppCorporatemerchantGetcorporatemerchantGetApiResponse,
        ApiServicesAppCorporatemerchantGetcorporatemerchantGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/CorporateMerchant/GetCorporateMerchant`,
          params: { id: queryArg.id },
        }),
        providesTags: ['CorporateMerchant'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as corporateMerchantApi };
export type ApiServicesAppCorporatemerchantGetplansGetApiResponse =
  /** status 200 Success */ CorporateMerchantPlanDto[];
export type ApiServicesAppCorporatemerchantGetplansGetApiArg = {
  corporateMerchantId?: number;
};
export type ApiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPostApiResponse =
  unknown;
export type ApiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPostApiArg =
  {
    createCorporateMerchantRequestDto: CreateCorporateMerchantRequestDto;
  };
export type ApiServicesAppCorporatemerchantGetcorporatemerchantGetApiResponse =
  /** status 200 Success */ GetCorporateMerchantResponseDto;
export type ApiServicesAppCorporatemerchantGetcorporatemerchantGetApiArg = {
  id?: number;
};
export type CorporateMerchantPlanDto = {
  id?: number;
  corporateMerchantId?: number;
  enrolmentPlanId?: number;
  enrolmentPlan?: string | null;
};
export type PayableFrequency =
  | 'Bi-weekly'
  | 'Monthly'
  | 'Quarterly'
  | 'Bi-annually'
  | 'Annually';
export type CreateCorporateMerchantRequestDto = {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  nameOfOrganization: string;
  countryId?: number;
  regionId?: number;
  noOfStaffToEnrol?: number;
  estimatedNoOfDependants?: number;
  industryId?: number;
  enrolmentPlanIds?: number[] | null;
  payableFrequency?: PayableFrequency;
  address?: string | null;
};
export type GetCorporateMerchantResponseDto = {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  organization?: string | null;
  noOfStaffToEnrol?: number;
  estimatedNoOfDependants?: number;
  payableFrequency?: PayableFrequency;
};
export const {
  useApiServicesAppCorporatemerchantGetplansGetQuery,
  useApiServicesAppCorporatemerchantCreateneworupdatecorporatemerchantPostMutation,
  useApiServicesAppCorporatemerchantGetcorporatemerchantGetQuery,
} = injectedRtkApi;
