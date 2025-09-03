import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppAccountIstenantavailablePost: build.mutation<
      ApiServicesAppAccountIstenantavailablePostApiResponse,
      ApiServicesAppAccountIstenantavailablePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Account/IsTenantAvailable`,
        method: 'POST',
        body: queryArg.isTenantAvailableRequest,
      }),
    }),
    apiServicesAppAccountGettenantsGet: build.query<
      ApiServicesAppAccountGettenantsGetApiResponse,
      ApiServicesAppAccountGettenantsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Account/GetTenants`,
        params: { SearchTerm: queryArg.searchTerm },
      }),
    }),
    apiServicesAppAccountResolvetenantidPost: build.mutation<
      ApiServicesAppAccountResolvetenantidPostApiResponse,
      ApiServicesAppAccountResolvetenantidPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Account/ResolveTenantId`,
        method: 'POST',
        body: queryArg.resolveTenantIdInput,
      }),
    }),
    apiServicesAppAccountImpersonatetenantPost: build.mutation<
      ApiServicesAppAccountImpersonatetenantPostApiResponse,
      ApiServicesAppAccountImpersonatetenantPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Account/ImpersonateTenant`,
        method: 'POST',
        body: queryArg.impersonateTenantInput,
      }),
    }),
    apiServicesAppAntenantalvisitsGetvisitstableGet: build.query<
      ApiServicesAppAntenantalvisitsGetvisitstableGetApiResponse,
      ApiServicesAppAntenantalvisitsGetvisitstableGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/AntenantalVisits/GetVisitsTable`,
        params: {
          PatientId: queryArg.patientId,
          EncounterId: queryArg.encounterId,
        },
      }),
    }),
    apiServicesAppEditionMovetenantstoanothereditionPost: build.mutation<
      ApiServicesAppEditionMovetenantstoanothereditionPostApiResponse,
      ApiServicesAppEditionMovetenantstoanothereditionPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Edition/MoveTenantsToAnotherEdition`,
        method: 'POST',
        body: queryArg.moveTenantsToAnotherEditionDto,
      }),
    }),
    apiServicesAppEditionGettenantcountGet: build.query<
      ApiServicesAppEditionGettenantcountGetApiResponse,
      ApiServicesAppEditionGettenantcountGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Edition/GetTenantCount`,
        params: { editionId: queryArg.editionId },
      }),
    }),
    apiServicesAppHostdashboardGetrecenttenantsdataGet: build.query<
      ApiServicesAppHostdashboardGetrecenttenantsdataGetApiResponse,
      ApiServicesAppHostdashboardGetrecenttenantsdataGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/HostDashboard/GetRecentTenantsData`,
      }),
    }),
    apiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGet:
      build.query<
        ApiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGetApiResponse,
        ApiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGetApiArg
      >({
        query: () => ({
          url: `/api/services/app/HostDashboard/GetSubscriptionExpiringTenantsData`,
        }),
      }),
    apiServicesAppHostdashboardGeteditiontenantstatisticsGet: build.query<
      ApiServicesAppHostdashboardGeteditiontenantstatisticsGetApiResponse,
      ApiServicesAppHostdashboardGeteditiontenantstatisticsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/HostDashboard/GetEditionTenantStatistics`,
        params: { StartDate: queryArg.startDate, EndDate: queryArg.endDate },
      }),
    }),
    apiServicesAppTenantGettenantsGet: build.query<
      ApiServicesAppTenantGettenantsGetApiResponse,
      ApiServicesAppTenantGettenantsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/GetTenants`,
        params: {
          Filter: queryArg.filter,
          CountryIdFilter: queryArg.countryIdFilter,
          SubscriptionEndDateStart: queryArg.subscriptionEndDateStart,
          SubscriptionEndDateEnd: queryArg.subscriptionEndDateEnd,
          CreationDateStart: queryArg.creationDateStart,
          CreationDateEnd: queryArg.creationDateEnd,
          EditionId: queryArg.editionId,
          EditionIdSpecified: queryArg.editionIdSpecified,
          Sorting: queryArg.sorting,
          MaxResultCount: queryArg.maxResultCount,
          SkipCount: queryArg.skipCount,
        },
      }),
    }),
    apiServicesAppTenantCreatetenantPost: build.mutation<
      ApiServicesAppTenantCreatetenantPostApiResponse,
      ApiServicesAppTenantCreatetenantPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/CreateTenant`,
        method: 'POST',
        body: queryArg.createTenantInput,
      }),
    }),
    apiServicesAppTenantGettenantforeditGet: build.query<
      ApiServicesAppTenantGettenantforeditGetApiResponse,
      ApiServicesAppTenantGettenantforeditGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/GetTenantForEdit`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantUpdatetenantPut: build.mutation<
      ApiServicesAppTenantUpdatetenantPutApiResponse,
      ApiServicesAppTenantUpdatetenantPutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/UpdateTenant`,
        method: 'PUT',
        body: queryArg.tenantEditDto,
      }),
    }),
    apiServicesAppTenantDeletetenantDelete: build.mutation<
      ApiServicesAppTenantDeletetenantDeleteApiResponse,
      ApiServicesAppTenantDeletetenantDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/DeleteTenant`,
        method: 'DELETE',
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantGettenantfeaturesforeditGet: build.query<
      ApiServicesAppTenantGettenantfeaturesforeditGetApiResponse,
      ApiServicesAppTenantGettenantfeaturesforeditGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/GetTenantFeaturesForEdit`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantUpdatetenantfeaturesPut: build.mutation<
      ApiServicesAppTenantUpdatetenantfeaturesPutApiResponse,
      ApiServicesAppTenantUpdatetenantfeaturesPutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/UpdateTenantFeatures`,
        method: 'PUT',
        body: queryArg.updateTenantFeaturesInput,
      }),
    }),
    apiServicesAppTenantResettenantspecificfeaturesPost: build.mutation<
      ApiServicesAppTenantResettenantspecificfeaturesPostApiResponse,
      ApiServicesAppTenantResettenantspecificfeaturesPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/ResetTenantSpecificFeatures`,
        method: 'POST',
        body: queryArg.entityDto,
      }),
    }),
    apiServicesAppTenantUnlocktenantadminPost: build.mutation<
      ApiServicesAppTenantUnlocktenantadminPostApiResponse,
      ApiServicesAppTenantUnlocktenantadminPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/UnlockTenantAdmin`,
        method: 'POST',
        body: queryArg.entityDto,
      }),
    }),
    apiServicesAppTenantGetsuscribededitionGet: build.query<
      ApiServicesAppTenantGetsuscribededitionGetApiResponse,
      ApiServicesAppTenantGetsuscribededitionGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/Tenant/GetSuscribedEdition`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantdashboardGetmemberactivityGet: build.query<
      ApiServicesAppTenantdashboardGetmemberactivityGetApiResponse,
      ApiServicesAppTenantdashboardGetmemberactivityGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantDashboard/GetMemberActivity`,
      }),
    }),
    apiServicesAppTenantdashboardGetdashboarddataGet: build.query<
      ApiServicesAppTenantdashboardGetdashboarddataGetApiResponse,
      ApiServicesAppTenantdashboardGetdashboarddataGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDashboard/GetDashboardData`,
        params: { SalesSummaryDatePeriod: queryArg.salesSummaryDatePeriod },
      }),
    }),
    apiServicesAppTenantdashboardGettopstatsGet: build.query<
      ApiServicesAppTenantdashboardGettopstatsGetApiResponse,
      ApiServicesAppTenantdashboardGettopstatsGetApiArg
    >({
      query: () => ({ url: `/api/services/app/TenantDashboard/GetTopStats` }),
    }),
    apiServicesAppTenantdashboardGetprofitshareGet: build.query<
      ApiServicesAppTenantdashboardGetprofitshareGetApiResponse,
      ApiServicesAppTenantdashboardGetprofitshareGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantDashboard/GetProfitShare`,
      }),
    }),
    apiServicesAppTenantdashboardGetdailysalesGet: build.query<
      ApiServicesAppTenantdashboardGetdailysalesGetApiResponse,
      ApiServicesAppTenantdashboardGetdailysalesGetApiArg
    >({
      query: () => ({ url: `/api/services/app/TenantDashboard/GetDailySales` }),
    }),
    apiServicesAppTenantdashboardGetsalessummaryGet: build.query<
      ApiServicesAppTenantdashboardGetsalessummaryGetApiResponse,
      ApiServicesAppTenantdashboardGetsalessummaryGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDashboard/GetSalesSummary`,
        params: { SalesSummaryDatePeriod: queryArg.salesSummaryDatePeriod },
      }),
    }),
    apiServicesAppTenantdashboardGetregionalstatsGet: build.query<
      ApiServicesAppTenantdashboardGetregionalstatsGetApiResponse,
      ApiServicesAppTenantdashboardGetregionalstatsGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantDashboard/GetRegionalStats`,
      }),
    }),
    apiServicesAppTenantdashboardGetgeneralstatsGet: build.query<
      ApiServicesAppTenantdashboardGetgeneralstatsGetApiResponse,
      ApiServicesAppTenantdashboardGetgeneralstatsGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantDashboard/GetGeneralStats`,
      }),
    }),
    apiServicesAppTenantdocumentsGetallGet: build.query<
      ApiServicesAppTenantdocumentsGetallGetApiResponse,
      ApiServicesAppTenantdocumentsGetallGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDocuments/GetAll`,
        params: {
          Filter: queryArg.filter,
          Sorting: queryArg.sorting,
          SkipCount: queryArg.skipCount,
          MaxResultCount: queryArg.maxResultCount,
        },
      }),
    }),
    apiServicesAppTenantdocumentsGettenantdocumentforeditGet: build.query<
      ApiServicesAppTenantdocumentsGettenantdocumentforeditGetApiResponse,
      ApiServicesAppTenantdocumentsGettenantdocumentforeditGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDocuments/GetTenantDocumentForEdit`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantdocumentsCreateoreditPost: build.mutation<
      ApiServicesAppTenantdocumentsCreateoreditPostApiResponse,
      ApiServicesAppTenantdocumentsCreateoreditPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDocuments/CreateOrEdit`,
        method: 'POST',
        body: queryArg.createOrEditTenantDocumentDto,
      }),
    }),
    apiServicesAppTenantdocumentsDeleteDelete: build.mutation<
      ApiServicesAppTenantdocumentsDeleteDeleteApiResponse,
      ApiServicesAppTenantdocumentsDeleteDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDocuments/Delete`,
        method: 'DELETE',
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantdocumentsRemovedocumentfileDelete: build.mutation<
      ApiServicesAppTenantdocumentsRemovedocumentfileDeleteApiResponse,
      ApiServicesAppTenantdocumentsRemovedocumentfileDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantDocuments/RemoveDocumentFile`,
        method: 'DELETE',
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantinvoiceGetinvoiceinfoGet: build.query<
      ApiServicesAppTenantinvoiceGetinvoiceinfoGetApiResponse,
      ApiServicesAppTenantinvoiceGetinvoiceinfoGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantInvoice/GetInvoiceInfo`,
        params: { Id: queryArg.id },
      }),
    }),
    apiServicesAppTenantinvoiceCreateinvoicePost: build.mutation<
      ApiServicesAppTenantinvoiceCreateinvoicePostApiResponse,
      ApiServicesAppTenantinvoiceCreateinvoicePostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantInvoice/CreateInvoice`,
        method: 'POST',
        body: queryArg.tenantCreateInvoiceDto,
      }),
    }),
    apiServicesAppTenantregistrationSuggesttenantcountrybyipPost:
      build.mutation<
        ApiServicesAppTenantregistrationSuggesttenantcountrybyipPostApiResponse,
        ApiServicesAppTenantregistrationSuggesttenantcountrybyipPostApiArg
      >({
        query: () => ({
          url: `/api/services/app/TenantRegistration/SuggestTenantCountryByIp`,
          method: 'POST',
        }),
      }),
    apiServicesAppTenantregistrationRegistertenantPost: build.mutation<
      ApiServicesAppTenantregistrationRegistertenantPostApiResponse,
      ApiServicesAppTenantregistrationRegistertenantPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantRegistration/RegisterTenant`,
        method: 'POST',
        body: queryArg.registerTenantInput,
      }),
    }),
    apiServicesAppTenantregistrationGettenantonboardingprogressGet: build.query<
      ApiServicesAppTenantregistrationGettenantonboardingprogressGetApiResponse,
      ApiServicesAppTenantregistrationGettenantonboardingprogressGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantRegistration/GetTenantOnboardingProgress`,
      }),
    }),
    apiServicesAppTenantregistrationUpdatetenantonboardingprogressPut:
      build.mutation<
        ApiServicesAppTenantregistrationUpdatetenantonboardingprogressPutApiResponse,
        ApiServicesAppTenantregistrationUpdatetenantonboardingprogressPutApiArg
      >({
        query: (queryArg) => ({
          url: `/api/services/app/TenantRegistration/UpdateTenantOnboardingProgress`,
          method: 'PUT',
          body: queryArg.updateTenantOnboardingProgressInput,
        }),
      }),
    apiServicesAppTenantregistrationGeteditionsforselectGet: build.query<
      ApiServicesAppTenantregistrationGeteditionsforselectGetApiResponse,
      ApiServicesAppTenantregistrationGeteditionsforselectGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantRegistration/GetEditionsForSelect`,
      }),
    }),
    apiServicesAppTenantregistrationGeteditionGet: build.query<
      ApiServicesAppTenantregistrationGeteditionGetApiResponse,
      ApiServicesAppTenantregistrationGeteditionGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantRegistration/GetEdition`,
        params: { editionId: queryArg.editionId },
      }),
    }),
    apiServicesAppTenantsettingsGetallsettingsGet: build.query<
      ApiServicesAppTenantsettingsGetallsettingsGetApiResponse,
      ApiServicesAppTenantsettingsGetallsettingsGetApiArg
    >({
      query: () => ({ url: `/api/services/app/TenantSettings/GetAllSettings` }),
    }),
    apiServicesAppTenantsettingsUpdateallsettingsPut: build.mutation<
      ApiServicesAppTenantsettingsUpdateallsettingsPutApiResponse,
      ApiServicesAppTenantsettingsUpdateallsettingsPutApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantSettings/UpdateAllSettings`,
        method: 'PUT',
        body: queryArg.tenantSettingsEditDto,
      }),
    }),
    apiServicesAppTenantsettingsClearlogoPost: build.mutation<
      ApiServicesAppTenantsettingsClearlogoPostApiResponse,
      ApiServicesAppTenantsettingsClearlogoPostApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantSettings/ClearLogo`,
        method: 'POST',
      }),
    }),
    apiServicesAppTenantsettingsClearcustomcssPost: build.mutation<
      ApiServicesAppTenantsettingsClearcustomcssPostApiResponse,
      ApiServicesAppTenantsettingsClearcustomcssPostApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantSettings/ClearCustomCss`,
        method: 'POST',
      }),
    }),
    apiServicesAppTenantsettingsSendtestemailPost: build.mutation<
      ApiServicesAppTenantsettingsSendtestemailPostApiResponse,
      ApiServicesAppTenantsettingsSendtestemailPostApiArg
    >({
      query: (queryArg) => ({
        url: `/api/services/app/TenantSettings/SendTestEmail`,
        method: 'POST',
        body: queryArg.sendTestEmailInput,
      }),
    }),
    apiServicesAppTenantsettingsGetenabledsocialloginsettingsGet: build.query<
      ApiServicesAppTenantsettingsGetenabledsocialloginsettingsGetApiResponse,
      ApiServicesAppTenantsettingsGetenabledsocialloginsettingsGetApiArg
    >({
      query: () => ({
        url: `/api/services/app/TenantSettings/GetEnabledSocialLoginSettings`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as tenantApi };
export type ApiServicesAppAccountIstenantavailablePostApiResponse =
  /** status 200 OK */ IsTenantAvailableResponse;
export type ApiServicesAppAccountIstenantavailablePostApiArg = {
  isTenantAvailableRequest: IsTenantAvailableRequest;
};
export type ApiServicesAppAccountGettenantsGetApiResponse =
  /** status 200 OK */ GetTenantsResponse[];
export type ApiServicesAppAccountGettenantsGetApiArg = {
  searchTerm?: string;
};
export type ApiServicesAppAccountResolvetenantidPostApiResponse =
  /** status 200 OK */ number;
export type ApiServicesAppAccountResolvetenantidPostApiArg = {
  resolveTenantIdInput: ResolveTenantIdInput;
};
export type ApiServicesAppAccountImpersonatetenantPostApiResponse =
  /** status 200 OK */ ImpersonateOutput;
export type ApiServicesAppAccountImpersonatetenantPostApiArg = {
  impersonateTenantInput: ImpersonateTenantInput;
};
export type ApiServicesAppAntenantalvisitsGetvisitstableGetApiResponse =
  /** status 200 OK */ VisitTableResponseDto[];
export type ApiServicesAppAntenantalvisitsGetvisitstableGetApiArg = {
  patientId: number;
  encounterId?: number;
};
export type ApiServicesAppEditionMovetenantstoanothereditionPostApiResponse =
  unknown;
export type ApiServicesAppEditionMovetenantstoanothereditionPostApiArg = {
  moveTenantsToAnotherEditionDto: MoveTenantsToAnotherEditionDto;
};
export type ApiServicesAppEditionGettenantcountGetApiResponse =
  /** status 200 OK */ number;
export type ApiServicesAppEditionGettenantcountGetApiArg = {
  editionId?: number;
};
export type ApiServicesAppHostdashboardGetrecenttenantsdataGetApiResponse =
  /** status 200 OK */ GetRecentTenantsOutput;
export type ApiServicesAppHostdashboardGetrecenttenantsdataGetApiArg = void;
export type ApiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGetApiResponse =
  /** status 200 OK */ GetExpiringTenantsOutput;
export type ApiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGetApiArg =
  void;
export type ApiServicesAppHostdashboardGeteditiontenantstatisticsGetApiResponse =
  /** status 200 OK */ GetEditionTenantStatisticsOutput;
export type ApiServicesAppHostdashboardGeteditiontenantstatisticsGetApiArg = {
  startDate?: string;
  endDate?: string;
};
export type ApiServicesAppTenantGettenantsGetApiResponse =
  /** status 200 OK */ PagedResultDtoOfTenantListDto;
export type ApiServicesAppTenantGettenantsGetApiArg = {
  filter?: string;
  countryIdFilter?: number;
  subscriptionEndDateStart?: string;
  subscriptionEndDateEnd?: string;
  creationDateStart?: string;
  creationDateEnd?: string;
  editionId?: number;
  editionIdSpecified?: boolean;
  sorting?: string;
  maxResultCount?: number;
  skipCount?: number;
};
export type ApiServicesAppTenantCreatetenantPostApiResponse = unknown;
export type ApiServicesAppTenantCreatetenantPostApiArg = {
  createTenantInput: CreateTenantInput;
};
export type ApiServicesAppTenantGettenantforeditGetApiResponse =
  /** status 200 OK */ TenantEditDto;
export type ApiServicesAppTenantGettenantforeditGetApiArg = {
  id?: number;
};
export type ApiServicesAppTenantUpdatetenantPutApiResponse = unknown;
export type ApiServicesAppTenantUpdatetenantPutApiArg = {
  tenantEditDto: TenantEditDto;
};
export type ApiServicesAppTenantDeletetenantDeleteApiResponse = unknown;
export type ApiServicesAppTenantDeletetenantDeleteApiArg = {
  id?: number;
};
export type ApiServicesAppTenantGettenantfeaturesforeditGetApiResponse =
  /** status 200 OK */ GetTenantFeaturesEditOutput;
export type ApiServicesAppTenantGettenantfeaturesforeditGetApiArg = {
  id?: number;
};
export type ApiServicesAppTenantUpdatetenantfeaturesPutApiResponse = unknown;
export type ApiServicesAppTenantUpdatetenantfeaturesPutApiArg = {
  updateTenantFeaturesInput: UpdateTenantFeaturesInput;
};
export type ApiServicesAppTenantResettenantspecificfeaturesPostApiResponse =
  unknown;
export type ApiServicesAppTenantResettenantspecificfeaturesPostApiArg = {
  entityDto: EntityDto;
};
export type ApiServicesAppTenantUnlocktenantadminPostApiResponse = unknown;
export type ApiServicesAppTenantUnlocktenantadminPostApiArg = {
  entityDto: EntityDto;
};
export type ApiServicesAppTenantGetsuscribededitionGetApiResponse =
  /** status 200 OK */ GetEditionByTenantOutput;
export type ApiServicesAppTenantGetsuscribededitionGetApiArg = {
  id?: number;
};
export type ApiServicesAppTenantdashboardGetmemberactivityGetApiResponse =
  /** status 200 OK */ GetMemberActivityOutput;
export type ApiServicesAppTenantdashboardGetmemberactivityGetApiArg = void;
export type ApiServicesAppTenantdashboardGetdashboarddataGetApiResponse =
  /** status 200 OK */ GetDashboardDataOutput;
export type ApiServicesAppTenantdashboardGetdashboarddataGetApiArg = {
  salesSummaryDatePeriod?: SalesSummaryDatePeriod;
};
export type ApiServicesAppTenantdashboardGettopstatsGetApiResponse =
  /** status 200 OK */ GetTopStatsOutput;
export type ApiServicesAppTenantdashboardGettopstatsGetApiArg = void;
export type ApiServicesAppTenantdashboardGetprofitshareGetApiResponse =
  /** status 200 OK */ GetProfitShareOutput;
export type ApiServicesAppTenantdashboardGetprofitshareGetApiArg = void;
export type ApiServicesAppTenantdashboardGetdailysalesGetApiResponse =
  /** status 200 OK */ GetDailySalesOutput;
export type ApiServicesAppTenantdashboardGetdailysalesGetApiArg = void;
export type ApiServicesAppTenantdashboardGetsalessummaryGetApiResponse =
  /** status 200 OK */ GetSalesSummaryOutput;
export type ApiServicesAppTenantdashboardGetsalessummaryGetApiArg = {
  salesSummaryDatePeriod?: SalesSummaryDatePeriod;
};
export type ApiServicesAppTenantdashboardGetregionalstatsGetApiResponse =
  /** status 200 OK */ GetRegionalStatsOutput;
export type ApiServicesAppTenantdashboardGetregionalstatsGetApiArg = void;
export type ApiServicesAppTenantdashboardGetgeneralstatsGetApiResponse =
  /** status 200 OK */ GetGeneralStatsOutput;
export type ApiServicesAppTenantdashboardGetgeneralstatsGetApiArg = void;
export type ApiServicesAppTenantdocumentsGetallGetApiResponse =
  /** status 200 OK */ PagedResultDtoOfGetTenantDocumentForViewDto;
export type ApiServicesAppTenantdocumentsGetallGetApiArg = {
  filter?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppTenantdocumentsGettenantdocumentforeditGetApiResponse =
  /** status 200 OK */ GetTenantDocumentForEditOutput;
export type ApiServicesAppTenantdocumentsGettenantdocumentforeditGetApiArg = {
  id?: number;
};
export type ApiServicesAppTenantdocumentsCreateoreditPostApiResponse = unknown;
export type ApiServicesAppTenantdocumentsCreateoreditPostApiArg = {
  createOrEditTenantDocumentDto: CreateOrEditTenantDocumentDto;
};
export type ApiServicesAppTenantdocumentsDeleteDeleteApiResponse = unknown;
export type ApiServicesAppTenantdocumentsDeleteDeleteApiArg = {
  id?: number;
};
export type ApiServicesAppTenantdocumentsRemovedocumentfileDeleteApiResponse =
  unknown;
export type ApiServicesAppTenantdocumentsRemovedocumentfileDeleteApiArg = {
  id?: number;
};
export type ApiServicesAppTenantinvoiceGetinvoiceinfoGetApiResponse =
  /** status 200 OK */ TenantInvoiceDto;
export type ApiServicesAppTenantinvoiceGetinvoiceinfoGetApiArg = {
  id?: number;
};
export type ApiServicesAppTenantinvoiceCreateinvoicePostApiResponse = unknown;
export type ApiServicesAppTenantinvoiceCreateinvoicePostApiArg = {
  tenantCreateInvoiceDto: TenantCreateInvoiceDto;
};
export type ApiServicesAppTenantregistrationSuggesttenantcountrybyipPostApiResponse =
  /** status 200 OK */ SuggestTenantCountryByIpOutput;
export type ApiServicesAppTenantregistrationSuggesttenantcountrybyipPostApiArg =
  void;
export type ApiServicesAppTenantregistrationRegistertenantPostApiResponse =
  /** status 200 OK */ RegisterTenantOutput;
export type ApiServicesAppTenantregistrationRegistertenantPostApiArg = {
  registerTenantInput: RegisterTenantInput;
};
export type ApiServicesAppTenantregistrationGettenantonboardingprogressGetApiResponse =
  /** status 200 OK */ GetTenantOnboardingProgressOutput;
export type ApiServicesAppTenantregistrationGettenantonboardingprogressGetApiArg =
  void;
export type ApiServicesAppTenantregistrationUpdatetenantonboardingprogressPutApiResponse =
  unknown;
export type ApiServicesAppTenantregistrationUpdatetenantonboardingprogressPutApiArg =
  {
    updateTenantOnboardingProgressInput: UpdateTenantOnboardingProgressInput;
  };
export type ApiServicesAppTenantregistrationGeteditionsforselectGetApiResponse =
  /** status 200 OK */ EditionsSelectOutput;
export type ApiServicesAppTenantregistrationGeteditionsforselectGetApiArg =
  void;
export type ApiServicesAppTenantregistrationGeteditionGetApiResponse =
  /** status 200 OK */ EditionSelectDto;
export type ApiServicesAppTenantregistrationGeteditionGetApiArg = {
  editionId?: number;
};
export type ApiServicesAppTenantsettingsGetallsettingsGetApiResponse =
  /** status 200 OK */ TenantSettingsEditDto;
export type ApiServicesAppTenantsettingsGetallsettingsGetApiArg = void;
export type ApiServicesAppTenantsettingsUpdateallsettingsPutApiResponse =
  unknown;
export type ApiServicesAppTenantsettingsUpdateallsettingsPutApiArg = {
  tenantSettingsEditDto: TenantSettingsEditDto;
};
export type ApiServicesAppTenantsettingsClearlogoPostApiResponse = unknown;
export type ApiServicesAppTenantsettingsClearlogoPostApiArg = void;
export type ApiServicesAppTenantsettingsClearcustomcssPostApiResponse = unknown;
export type ApiServicesAppTenantsettingsClearcustomcssPostApiArg = void;
export type ApiServicesAppTenantsettingsSendtestemailPostApiResponse = unknown;
export type ApiServicesAppTenantsettingsSendtestemailPostApiArg = {
  sendTestEmailInput: SendTestEmailInput;
};
export type ApiServicesAppTenantsettingsGetenabledsocialloginsettingsGetApiResponse =
  /** status 200 OK */ ExternalLoginSettingsDto;
export type ApiServicesAppTenantsettingsGetenabledsocialloginsettingsGetApiArg =
  void;
export type TenantAvailabilityState = 1 | 2 | 3;
export type FacilityGroupInfoDto = {
  name?: string | null;
  logoId?: string | null;
  brandTagName?: string | null;
  isDefaultBrandTag?: boolean;
};
export type IsTenantAvailableResponse = {
  state?: TenantAvailabilityState;
  tenantId?: number | null;
  isTenantOnboarded?: boolean;
  serverRootAddress?: string | null;
  facilityGroupInfoDto?: FacilityGroupInfoDto;
};
export type IsTenantAvailableRequest = {
  tenancyName: string;
};
export type GetTenantsResponse = {
  name?: string | null;
  uniqueBusinessCode?: string | null;
};
export type ResolveTenantIdInput = {
  c?: string | null;
};
export type ImpersonateOutput = {
  impersonationToken?: string | null;
  tenancyName?: string | null;
};
export type ImpersonateTenantInput = {
  tenantId?: number | null;
  userId?: number;
};
export type InvestigationComponentResultDto = {
  category?: string | null;
  name?: string | null;
  result?: string | null;
  numericResult?: number;
  reference?: string | null;
  rangeMin?: number;
  rangeMax?: number;
  unit?: string | null;
  subCategory?: string | null;
};
export type GetInvestigationResultsResponse = {
  patientId?: number;
  investigationId?: number;
  investigationRequestId?: number | null;
  name?: string | null;
  shortName?: string | null;
  type?: string | null;
  reference?: string | null;
  sampleCollectionDate?: string;
  resultDate?: string;
  sampleTime?: string;
  resultTime?: string;
  specimen?: string | null;
  conclusion?: string | null;
  specificOrganism?: string | null;
  view?: string | null;
  bodyPart?: string | null;
  notes?: string | null;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  deletedUser?: string | null;
  isDeleted?: boolean;
  procedureId?: number | null;
  investigationComponentResults?: InvestigationComponentResultDto[] | null;
  resultImageUrls?: string[] | null;
  description?: string | null;
  creatorUserId?: number | null;
  updateIsDisabled?: boolean;
};
export type Vitals = {
  name?: string | null;
  reading?: number;
  measuringUnit?: string | null;
  label?: string | null;
};
export type RoutineMeds = {
  name?: string | null;
  symbol?: string | null;
};
export type UrineInvestigationResult =
  | 'Negative'
  | 'Trace'
  | '+/-'
  | '+'
  | '++'
  | '+++';
export type PhysicalExaminationEntryType = 0 | 1;
export type GetPhysicalExaminationTypeResponseDto = {
  id?: number;
  name?: string | null;
  type?: string | null;
};
export type PatientPhysicalExamTypeNoteResponseDto = {
  id?: number;
  type?: string | null;
  note?: string | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
};
export type PatientPhysicalExamSuggestionQualifierResponseDto = {
  id?: number;
  qualifierId?: number | null;
  name?: string | null;
  isDeleted?: boolean;
};
export type PatientPhysicalExamSuggestionAnswerResponseDto = {
  id?: number;
  snowmedId?: string | null;
  description?: string | null;
  isAbsent?: boolean;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
  sites?: PatientPhysicalExamSuggestionQualifierResponseDto[] | null;
  planes?: PatientPhysicalExamSuggestionQualifierResponseDto[] | null;
  qualifiers?: PatientPhysicalExamSuggestionQualifierResponseDto[] | null;
};
export type PatientPhysicalExamSuggestionQuestionResponseDto = {
  id?: number;
  headerName?: string | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
  patientPhysicalExamSuggestionAnswers?:
    | PatientPhysicalExamSuggestionAnswerResponseDto[]
    | null;
};
export type UploadedImageDto = {
  id?: number;
  fileName?: string | null;
  fileUrl?: string | null;
};
export type PatientPhysicalExaminationResponseDto = {
  id?: number;
  physicalExaminationEntryType?: PhysicalExaminationEntryType;
  physicalExaminationEntryTypeName?: string | null;
  physicalExaminationTypeId?: number;
  physicalExaminationType?: GetPhysicalExaminationTypeResponseDto;
  patientId?: number;
  otherNote?: string | null;
  creatorUserId?: number;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  typeNotes?: PatientPhysicalExamTypeNoteResponseDto[] | null;
  suggestions?: PatientPhysicalExamSuggestionQuestionResponseDto[] | null;
  procedureEntryType?: string | null;
  imageUploaded?: boolean;
  encounterId?: number | null;
  procedureSessionId?: number | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  imageFiles?: UploadedImageDto[] | null;
};
export type SymptomEntryType = 'Suggestion' | 'TypeNote';
export type SymptomTypeNoteDto = {
  type?: string | null;
  note?: string | null;
  isDeleted?: boolean;
};
export type SuggestionQuestionType =
  | 'Site'
  | 'Onset'
  | 'Character'
  | 'Radiation'
  | 'Associations'
  | 'TimeCourse'
  | 'ExacerbatingOrRelieving'
  | 'Severity';
export type SuggestionOnsetInterval =
  | 'Seconds'
  | 'Minutes'
  | 'Hours'
  | 'Days'
  | 'Weeks'
  | 'Months'
  | 'Years';
export type SymptomSuggestionAnswerDto = {
  symptomSnowmedId?: string | null;
  description?: string | null;
  howLongAgo?: number;
  onsetInterval?: SuggestionOnsetInterval;
  cyclicality?: string | null;
  isAbsent?: boolean;
  frequency?: string | null;
  howLongDidItLast?: string | null;
  exacerbatingOrRelievingType?: string | null;
  severityScale?: number;
};
export type SuggestionQuestionForResponseDto = {
  suggestionQuestionType?: SuggestionQuestionType;
  symptomSuggestionAnswer: SymptomSuggestionAnswerDto;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
  id?: number;
};
export type GenderType = 'Male' | 'Female' | 'Other';
export type SymptomSummaryForReviewAndSaveReturnDto = {
  id?: number;
  symptomEntryTypeName?: string | null;
  symptomEntryType?: SymptomEntryType;
  description?: string | null;
  suggestionSummary?: string | null;
  referAndConsultSummary?: string | null;
  typeNotes?: SymptomTypeNoteDto[] | null;
  suggestions?: SuggestionQuestionForResponseDto[] | null;
  creatorUserId?: number;
  creationTime?: string;
  deletionTime?: string | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  encounterId?: number | null;
  appointmentId?: number | null;
  otherNote?: string | null;
  gender?: GenderType;
  onsetDuration?: number | null;
  onsetInterval?: SuggestionOnsetInterval;
  isNew?: boolean;
  formattedOnset?: string | null;
};
export type AntenatalVaccinationDto = {
  id?: number;
  vaccineName?: string | null;
  dateAdministered?: string | null;
  isAdministered?: boolean;
  vaccineBrand?: string | null;
  vaccineBatchNo?: string | null;
  note?: string | null;
};
export type VisitTableResponseDto = {
  displayName?: string | null;
  dateOfVisit?: string;
  visitNumber?: number;
  counsellingStatus?: string | null;
  indications?: string[] | null;
  investigations?: GetInvestigationResultsResponse[] | null;
  vitals?: Vitals[] | null;
  routineMeds?: RoutineMeds[] | null;
  glucose?: UrineInvestigationResult;
  protein?: UrineInvestigationResult;
  physicalExaminations?: PatientPhysicalExaminationResponseDto[] | null;
  nextAppointmentDate?: string | null;
  notes?: string[] | null;
  presentingComplaints?: SymptomSummaryForReviewAndSaveReturnDto[] | null;
  estimatedGestationalAge?: number | null;
  vaccinations?: AntenatalVaccinationDto[] | null;
};
export type MoveTenantsToAnotherEditionDto = {
  sourceEditionId?: number;
  targetEditionId?: number;
};
export type RecentTenant = {
  id?: number;
  name?: string | null;
  creationTime?: string;
};
export type GetRecentTenantsOutput = {
  recentTenantsDayCount?: number;
  maxRecentTenantsShownCount?: number;
  tenantCreationStartDate?: string;
  recentTenants?: RecentTenant[] | null;
};
export type ExpiringTenant = {
  tenantName?: string | null;
  remainingDayCount?: number;
};
export type GetExpiringTenantsOutput = {
  expiringTenants?: ExpiringTenant[] | null;
  subscriptionEndAlertDayCount?: number;
  maxExpiringTenantsShownCount?: number;
  subscriptionEndDateStart?: string;
  subscriptionEndDateEnd?: string;
};
export type TenantEdition = {
  label?: string | null;
  value?: number;
};
export type GetEditionTenantStatisticsOutput = {
  editionStatistics?: TenantEdition[] | null;
};
export type TenantCategoryType = 'Public' | 'Private';
export type TenantType = 'Individual' | 'Business';
export type TenantListDto = {
  tenancyName?: string | null;
  name?: string | null;
  category?: TenantCategoryType;
  type?: TenantType;
  editionDisplayName?: string | null;
  country?: string | null;
  connectionString?: string | null;
  isActive?: boolean;
  creationTime?: string;
  subscriptionEndDateUtc?: string | null;
  editionId?: number | null;
  isInTrialPeriod?: boolean;
  id?: number;
};
export type PagedResultDtoOfTenantListDto = {
  totalCount?: number;
  items?: TenantListDto[] | null;
};
export type TenantDocumentType = 'Medical_Degree' | 'Practicing_License';
export type CreateTenantInput = {
  tenancyName: string;
  name: string;
  category: TenantCategoryType;
  type: TenantType;
  countryId?: number;
  individualSpecialization?: string | null;
  individualGraduatingSchool?: string | null;
  individualGraduatingYear?: string | null;
  individualDocumentToken?: string | null;
  individualDocumentType?: TenantDocumentType;
  facilityGroupName?: string | null;
  hasSignedAgreement: boolean;
  adminEmailAddress: string;
  adminName?: string | null;
  adminSurname?: string | null;
  adminPassword?: string | null;
  connectionString?: string | null;
  shouldChangePasswordOnNextLogin?: boolean;
  sendActivationEmail?: boolean;
  editionId?: number | null;
  isActive?: boolean;
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
};
export type TenantEditDto = {
  tenancyName: string;
  name: string;
  category: TenantCategoryType;
  type: TenantType;
  individualSpecialization?: string | null;
  individualGraduatingSchool?: string | null;
  individualGraduatingYear?: string | null;
  hasSignedAgreement: boolean;
  connectionString?: string | null;
  countryId: number;
  editionId?: number | null;
  isActive?: boolean;
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
  id?: number;
};
export type NameValueDto = {
  name?: string | null;
  value?: string | null;
};
export type IValueValidator = {
  name?: string | null;
  attributes?: {
    [key: string]: any;
  } | null;
};
export type LocalizableComboboxItemDto = {
  value?: string | null;
  displayText?: string | null;
};
export type LocalizableComboboxItemSourceDto = {
  items?: LocalizableComboboxItemDto[] | null;
};
export type FeatureInputTypeDto = {
  name?: string | null;
  attributes?: {
    [key: string]: any;
  } | null;
  validator?: IValueValidator;
  itemSource?: LocalizableComboboxItemSourceDto;
};
export type FlatFeatureDto = {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  defaultValue?: string | null;
  inputType?: FeatureInputTypeDto;
};
export type GetTenantFeaturesEditOutput = {
  featureValues?: NameValueDto[] | null;
  features?: FlatFeatureDto[] | null;
};
export type UpdateTenantFeaturesInput = {
  id?: number;
  featureValues: NameValueDto[];
};
export type EntityDto = {
  id?: number;
};
export type PaymentPeriodType = 1 | 7 | 30 | 180 | 365;
export type EditionListDto = {
  name?: string | null;
  displayName?: string | null;
  price?: number | null;
  actualAmount?: number | null;
  paymentPeriodType?: PaymentPeriodType;
  discount?: number | null;
  isActive?: boolean;
  patientEncounterLimit?: number | null;
  isUnlimitedPatientEncounter?: boolean;
  waitingDayAfterExpire?: number | null;
  trialDayCount?: number | null;
  minimumStaffCount?: number | null;
  maximumStaffCount?: number | null;
  expiringEditionDisplayName?: string | null;
  tenantId?: number | null;
  tenantName?: string | null;
  countryId?: number | null;
  countryName?: string | null;
  id?: number;
};
export type NameValue = {
  name?: string | null;
  value?: string | null;
};
export type GetEditionByTenantOutput = {
  edition?: EditionListDto;
  features?: NameValue[] | null;
};
export type MemberActivity = {
  name?: string | null;
  earnings?: string | null;
  cases?: number;
  closed?: number;
  rate?: string | null;
  profilePictureName?: string | null;
};
export type GetMemberActivityOutput = {
  memberActivities?: MemberActivity[] | null;
};
export type SalesSummaryData = {
  period?: string | null;
  sales?: number;
  profit?: number;
};
export type GetDashboardDataOutput = {
  totalProfit?: number;
  newFeedbacks?: number;
  newOrders?: number;
  newUsers?: number;
  salesSummary?: SalesSummaryData[] | null;
  totalSales?: number;
  revenue?: number;
  expenses?: number;
  growth?: number;
  transactionPercent?: number;
  newVisitPercent?: number;
  bouncePercent?: number;
  dailySales?: number[] | null;
  profitShares?: number[] | null;
};
export type SalesSummaryDatePeriod = 1 | 2 | 3;
export type GetTopStatsOutput = {
  totalProfit?: number;
  newFeedbacks?: number;
  newOrders?: number;
  newUsers?: number;
};
export type GetProfitShareOutput = {
  profitShares?: number[] | null;
};
export type GetDailySalesOutput = {
  dailySales?: number[] | null;
};
export type GetSalesSummaryOutput = {
  totalSales?: number;
  revenue?: number;
  expenses?: number;
  growth?: number;
  salesSummary?: SalesSummaryData[] | null;
};
export type RegionalStatCountry = {
  countryName?: string | null;
  sales?: number;
  change?: number[] | null;
  averagePrice?: number;
  totalPrice?: number;
};
export type GetRegionalStatsOutput = {
  stats?: RegionalStatCountry[] | null;
};
export type GetGeneralStatsOutput = {
  transactionPercent?: number;
  newVisitPercent?: number;
  bouncePercent?: number;
};
export type TenantDocumentDto = {
  type?: TenantDocumentType;
  document?: string | null;
  documentFileName?: string | null;
  fileName?: string | null;
  id?: number;
};
export type GetTenantDocumentForViewDto = {
  tenantDocument?: TenantDocumentDto;
};
export type PagedResultDtoOfGetTenantDocumentForViewDto = {
  totalCount?: number;
  items?: GetTenantDocumentForViewDto[] | null;
};
export type CreateOrEditTenantDocumentDto = {
  type?: TenantDocumentType;
  document?: string | null;
  documentToken?: string | null;
  fileName?: string | null;
  id?: number | null;
};
export type GetTenantDocumentForEditOutput = {
  tenantDocument?: CreateOrEditTenantDocumentDto;
  documentFileName?: string | null;
};
export type TenantInvoiceDto = {
  amount?: number;
  editionDisplayName?: string | null;
  invoiceNo?: string | null;
  invoiceDate?: string;
  tenantLegalName?: string | null;
  tenantAddress?: string[] | null;
  tenantTaxNo?: string | null;
  hostLegalName?: string | null;
  hostAddress?: string[] | null;
};
export type TenantCreateInvoiceDto = {
  subscriptionPaymentId?: number;
};
export type SuggestTenantCountryByIpOutput = {
  id?: number;
  name?: string | null;
  code?: string | null;
};
export type RegisterTenantOutput = {
  tenantId?: number;
  tenancyName?: string | null;
  category?: TenantCategoryType;
  type?: TenantType;
  individualSpecialization?: string | null;
  individualGraduatingSchool?: string | null;
  individualGraduatingYear?: string | null;
  hasSignedAgreement?: boolean;
  name?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  isTenantActive?: boolean;
  isEmailConfirmationRequired?: boolean;
};
export type SubscriptionStartType = 1 | 2 | 3;
export type RegisterTenantInput = {
  tenancyName: string;
  name: string;
  category: TenantCategoryType;
  type: TenantType;
  individualSpecialization?: string | null;
  individualGraduatingSchool?: string | null;
  individualGraduatingYear?: string | null;
  facilityGroupName?: string | null;
  individualDocumentToken?: string | null;
  individualDocumentType?: TenantDocumentType;
  countryId?: number | null;
  hasSignedAgreement: boolean;
  adminEmailAddress: string;
  adminName?: string | null;
  adminSurname?: string | null;
  adminPassword?: string | null;
  captchaResponse?: string | null;
  subscriptionStartType?: SubscriptionStartType;
  editionId?: number | null;
};
export type TenantOnboardingStatus =
  | 'Facility_Details'
  | 'Documentation'
  | 'Additional_Details'
  | 'Departments'
  | 'Clinics'
  | 'Wards'
  | 'Job_Titles_And_Levels'
  | 'Staff'
  | 'Review_Details'
  | 'Finalize'
  | 'Trial'
  | 'Checkout';
export type TenantOnboardingProgressDto = {
  tenantOnboardingStatus?: TenantOnboardingStatus;
  completed?: boolean;
};
export type GetTenantOnboardingProgressOutput = {
  isOnboarded?: boolean;
  onboardingProgress?: TenantOnboardingProgressDto[] | null;
};
export type UpdateTenantOnboardingProgressInput = {
  onboardingProgress?: TenantOnboardingProgressDto[] | null;
};
export type IInputType = {
  name?: string | null;
  attributes?: {
    [key: string]: any;
  } | null;
  validator?: IValueValidator;
};
export type FlatFeatureSelectDto = {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  defaultValue?: string | null;
  inputType?: IInputType;
  textHtmlColor?: string | null;
};
export type EditionSelectDto = {
  id?: number;
  name?: string | null;
  displayName?: string | null;
  expiringEditionId?: number | null;
  dailyPrice?: number | null;
  weeklyPrice?: number | null;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  trialDayCount?: number | null;
  waitingDayAfterExpire?: number | null;
  isFree?: boolean;
};
export type EditionWithFeaturesDto = {
  edition?: EditionSelectDto;
  featureValues?: NameValueDto[] | null;
};
export type EditionsSelectOutput = {
  allFeatures?: FlatFeatureSelectDto[] | null;
  editionsWithFeatures?: EditionWithFeaturesDto[] | null;
};
export type GeneralSettingsEditDto = {
  timezone?: string | null;
  timezoneForComparison?: string | null;
};
export type SessionTimeOutSettingsEditDto = {
  isEnabled?: boolean;
  timeOutSecond?: number;
  showTimeOutNotificationSecond?: number;
  showLockScreenWhenTimedOut?: boolean;
};
export type TenantUserManagementSettingsEditDto = {
  allowSelfRegistration?: boolean;
  isNewRegisteredUserActiveByDefault?: boolean;
  isEmailConfirmationRequiredForLogin?: boolean;
  useCaptchaOnRegistration?: boolean;
  useCaptchaOnLogin?: boolean;
  isCookieConsentEnabled?: boolean;
  isQuickThemeSelectEnabled?: boolean;
  allowUsingGravatarProfilePicture?: boolean;
  sessionTimeOutSettings?: SessionTimeOutSettingsEditDto;
};
export type TenantEmailSettingsEditDto = {
  useHostDefaultEmailSettings?: boolean;
  defaultFromAddress?: string | null;
  defaultFromDisplayName?: string | null;
  smtpHost?: string | null;
  smtpPort?: number;
  smtpUserName?: string | null;
  smtpPassword?: string | null;
  smtpDomain?: string | null;
  smtpEnableSsl?: boolean;
  smtpUseDefaultCredentials?: boolean;
};
export type LdapSettingsEditDto = {
  isModuleEnabled?: boolean;
  isEnabled?: boolean;
  domain?: string | null;
  userName?: string | null;
  password?: string | null;
};
export type PasswordComplexitySetting = {
  allowedMinimumLength?: number;
  requireDigit?: boolean;
  requireLowercase?: boolean;
  requireNonAlphanumeric?: boolean;
  requireUppercase?: boolean;
  requiredLength?: number;
};
export type UserLockOutSettingsEditDto = {
  isEnabled?: boolean;
  maxFailedAccessAttemptsBeforeLockout?: number;
  defaultAccountLockoutSeconds?: number;
};
export type TwoFactorLoginSettingsEditDto = {
  isEnabledForApplication?: boolean;
  isEnabled?: boolean;
  isEmailProviderEnabled?: boolean;
  isSmsProviderEnabled?: boolean;
  isRememberBrowserEnabled?: boolean;
  isGoogleAuthenticatorEnabled?: boolean;
};
export type SecuritySettingsEditDto = {
  allowOneConcurrentLoginPerUser?: boolean;
  useDefaultPasswordComplexitySettings?: boolean;
  passwordComplexity?: PasswordComplexitySetting;
  defaultPasswordComplexity?: PasswordComplexitySetting;
  userLockOut?: UserLockOutSettingsEditDto;
  twoFactorLogin?: TwoFactorLoginSettingsEditDto;
};
export type TenantBillingSettingsEditDto = {
  legalName?: string | null;
  address?: string | null;
  taxVatNo?: string | null;
};
export type TenantOtherSettingsEditDto = {
  isQuickThemeSelectEnabled?: boolean;
};
export type FacebookExternalLoginProviderSettings = {
  appId?: string | null;
  appSecret?: string | null;
};
export type GoogleExternalLoginProviderSettings = {
  clientId?: string | null;
  clientSecret?: string | null;
  userInfoEndpoint?: string | null;
};
export type TwitterExternalLoginProviderSettings = {
  consumerKey?: string | null;
  consumerSecret?: string | null;
};
export type MicrosoftExternalLoginProviderSettings = {
  clientId?: string | null;
  clientSecret?: string | null;
};
export type OpenIdConnectExternalLoginProviderSettings = {
  clientId?: string | null;
  clientSecret?: string | null;
  authority?: string | null;
  loginUrl?: string | null;
  validateIssuer?: boolean;
  responseType?: string | null;
};
export type JsonClaimMapDto = {
  claim?: string | null;
  key?: string | null;
};
export type WsFederationExternalLoginProviderSettings = {
  clientId?: string | null;
  tenant?: string | null;
  metaDataAddress?: string | null;
  wtrealm?: string | null;
  authority?: string | null;
};
export type ExternalLoginProviderSettingsEditDto = {
  facebook_IsDeactivated?: boolean;
  facebook?: FacebookExternalLoginProviderSettings;
  google_IsDeactivated?: boolean;
  google?: GoogleExternalLoginProviderSettings;
  twitter_IsDeactivated?: boolean;
  twitter?: TwitterExternalLoginProviderSettings;
  microsoft_IsDeactivated?: boolean;
  microsoft?: MicrosoftExternalLoginProviderSettings;
  openIdConnect_IsDeactivated?: boolean;
  openIdConnect?: OpenIdConnectExternalLoginProviderSettings;
  openIdConnectClaimsMapping?: JsonClaimMapDto[] | null;
  wsFederation_IsDeactivated?: boolean;
  wsFederation?: WsFederationExternalLoginProviderSettings;
  wsFederationClaimsMapping?: JsonClaimMapDto[] | null;
};
export type TenantSettingsEditDto = {
  general?: GeneralSettingsEditDto;
  userManagement: TenantUserManagementSettingsEditDto;
  email?: TenantEmailSettingsEditDto;
  ldap?: LdapSettingsEditDto;
  security: SecuritySettingsEditDto;
  billing?: TenantBillingSettingsEditDto;
  otherSettings?: TenantOtherSettingsEditDto;
  externalLoginProviderSettings?: ExternalLoginProviderSettingsEditDto;
};
export type SendTestEmailInput = {
  emailAddress: string;
};
export type ExternalLoginSettingsDto = {
  enabledSocialLoginSettings?: string[] | null;
};
export const {
  useApiServicesAppAccountIstenantavailablePostMutation,
  useApiServicesAppAccountGettenantsGetQuery,
  useApiServicesAppAccountResolvetenantidPostMutation,
  useApiServicesAppAccountImpersonatetenantPostMutation,
  useApiServicesAppAntenantalvisitsGetvisitstableGetQuery,
  useApiServicesAppEditionMovetenantstoanothereditionPostMutation,
  useApiServicesAppEditionGettenantcountGetQuery,
  useApiServicesAppHostdashboardGetrecenttenantsdataGetQuery,
  useApiServicesAppHostdashboardGetsubscriptionexpiringtenantsdataGetQuery,
  useApiServicesAppHostdashboardGeteditiontenantstatisticsGetQuery,
  useApiServicesAppTenantGettenantsGetQuery,
  useApiServicesAppTenantCreatetenantPostMutation,
  useApiServicesAppTenantGettenantforeditGetQuery,
  useApiServicesAppTenantUpdatetenantPutMutation,
  useApiServicesAppTenantDeletetenantDeleteMutation,
  useApiServicesAppTenantGettenantfeaturesforeditGetQuery,
  useApiServicesAppTenantUpdatetenantfeaturesPutMutation,
  useApiServicesAppTenantResettenantspecificfeaturesPostMutation,
  useApiServicesAppTenantUnlocktenantadminPostMutation,
  useApiServicesAppTenantGetsuscribededitionGetQuery,
  useApiServicesAppTenantdashboardGetmemberactivityGetQuery,
  useApiServicesAppTenantdashboardGetdashboarddataGetQuery,
  useApiServicesAppTenantdashboardGettopstatsGetQuery,
  useApiServicesAppTenantdashboardGetprofitshareGetQuery,
  useApiServicesAppTenantdashboardGetdailysalesGetQuery,
  useApiServicesAppTenantdashboardGetsalessummaryGetQuery,
  useApiServicesAppTenantdashboardGetregionalstatsGetQuery,
  useApiServicesAppTenantdashboardGetgeneralstatsGetQuery,
  useApiServicesAppTenantdocumentsGetallGetQuery,
  useApiServicesAppTenantdocumentsGettenantdocumentforeditGetQuery,
  useApiServicesAppTenantdocumentsCreateoreditPostMutation,
  useApiServicesAppTenantdocumentsDeleteDeleteMutation,
  useApiServicesAppTenantdocumentsRemovedocumentfileDeleteMutation,
  useApiServicesAppTenantinvoiceGetinvoiceinfoGetQuery,
  useApiServicesAppTenantinvoiceCreateinvoicePostMutation,
  useApiServicesAppTenantregistrationSuggesttenantcountrybyipPostMutation,
  useApiServicesAppTenantregistrationRegistertenantPostMutation,
  useApiServicesAppTenantregistrationGettenantonboardingprogressGetQuery,
  useApiServicesAppTenantregistrationUpdatetenantonboardingprogressPutMutation,
  useApiServicesAppTenantregistrationGeteditionsforselectGetQuery,
  useApiServicesAppTenantregistrationGeteditionGetQuery,
  useApiServicesAppTenantsettingsGetallsettingsGetQuery,
  useApiServicesAppTenantsettingsUpdateallsettingsPutMutation,
  useApiServicesAppTenantsettingsClearlogoPostMutation,
  useApiServicesAppTenantsettingsClearcustomcssPostMutation,
  useApiServicesAppTenantsettingsSendtestemailPostMutation,
  useApiServicesAppTenantsettingsGetenabledsocialloginsettingsGetQuery,
} = injectedRtkApi;
