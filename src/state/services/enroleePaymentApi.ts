import { baseApi as api } from './baseApi';
export const addTagTypes = ['EnroleePayment'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enroleePaymentApi };
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
export const {
  useApiServicesAppEnroleepaymentGetpaymentcheckoutGetQuery,
  useApiServicesAppEnroleepaymentProcessmonnifypaymentPostMutation,
} = injectedRtkApi;
