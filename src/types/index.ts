export type ModalType = {
  isOpen: boolean;
};

export type ActionType = ItemType & {
  action: (id: null | number) => void;
  danger?: boolean;
};

export type ApiServicesAppCreateinvestigationresultreviewerhandlerHandlePostApiResponse =
  unknown;
export type ApiServicesAppCreateinvestigationresultreviewerhandlerHandlePostApiArg =
  {
    facilityId?: number;
    investigationResultReviewerRequestDto: InvestigationResultReviewerRequestDto;
  };
export type ApiServicesAppInsuranceclaimCreateinvestigationinsuranceclaimsPostApiResponse =
  unknown;
export type ApiServicesAppInsuranceclaimCreateinvestigationinsuranceclaimsPostApiArg =
  {
    body: CreateOrEditInsuranceClaimRequest[];
  };
export type ApiServicesAppInvestigationGetallGetApiResponse =
  /** status 200 OK */ GetAllInvestigationsResponse[];
export type ApiServicesAppInvestigationGetallGetApiArg = {
  type?: string;
  filter?: string;
};
export type ApiServicesAppInvestigationGetinvestigationGetApiResponse =
  /** status 200 OK */ GetInvestigationResponse;
export type ApiServicesAppInvestigationGetinvestigationGetApiArg = {
  id?: number;
  patientId?: number;
  snomedId?: string;
};
export type ApiServicesAppInvestigationRequestinvestigationPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationRequestinvestigationPostApiArg = {
  body: RequestInvestigationRequest[];
};
export type ApiServicesAppInvestigationCreategroupandrequestinvestigationPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationCreategroupandrequestinvestigationPostApiArg =
  {
    createRequestInvestigationGroupDto: CreateRequestInvestigationGroupDto;
  };
export type ApiServicesAppInvestigationGetpatientsuggestedinvestigationsGetApiResponse =
  /** status 200 OK */ PatientSuggestedInvestigationResponseDto[];
export type ApiServicesAppInvestigationGetpatientsuggestedinvestigationsGetApiArg =
  {
    patientId?: number;
  };
export type ApiServicesAppInvestigationGetinvestigationsrequestsGetApiResponse =
  /** status 200 OK */ GetInvestigationRequestsResponse[];
export type ApiServicesAppInvestigationGetinvestigationsrequestsGetApiArg = {
  patientId?: number;
  type?: string;
  procedureId?: number;
  encounterId?: number;
  excludeRecordedInvestigations?: boolean;
  roleFilter?: string;
  sinceFilter?: string;
  beforeFilter?: string;
  userIdFilter?: number;
  sessionId?: number;
};
export type ApiServicesAppInvestigationGetinvestigationsrequestsummaryGetApiResponse =
  /** status 200 OK */ GetPatientInvestigationRequestResponseDto[];
export type ApiServicesAppInvestigationGetinvestigationsrequestsummaryGetApiArg =
  {
    patientId?: number;
    type?: string;
    procedureId?: number;
    encounterId?: number;
    excludeRecordedInvestigations?: boolean;
    roleFilter?: string;
    sinceFilter?: string;
    beforeFilter?: string;
    userIdFilter?: number;
    sessionId?: number;
  };
export type ApiServicesAppInvestigationRecordinvestigationPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationRecordinvestigationPostApiArg = {
  recordInvestigationRequest: RecordInvestigationRequest;
};
export type ApiServicesAppInvestigationGetinvestigationresultsGetApiResponse =
  /** status 200 OK */ GetInvestigationResultsResponse[];
export type ApiServicesAppInvestigationGetinvestigationresultsGetApiArg = {
  patientId?: number;
  type?: string;
  filters?: string[];
  procedureId?: number;
  encounterId?: number;
  roleFilter?: string;
  sinceFilter?: string;
  beforeFilter?: string;
  userIdFilter?: number;
  sessionId?: number;
};
export type ApiServicesAppInvestigationDeleteinvestigationrequestDeleteApiResponse =
  unknown;
export type ApiServicesAppInvestigationDeleteinvestigationrequestDeleteApiArg =
  {
    requestId?: number;
  };
export type ApiServicesAppInvestigationLinktodiagnosisPostApiResponse = unknown;
export type ApiServicesAppInvestigationLinktodiagnosisPostApiArg = {
  linkInvestigationToDiagnosisRequest: LinkInvestigationToDiagnosisRequest;
};
export type ApiServicesAppInvestigationGetinvestigationtypesGetApiResponse =
  /** status 200 OK */ string[];
export type ApiServicesAppInvestigationGetinvestigationtypesGetApiArg = void;
export type ApiServicesAppInvestigationGetilaboratoryqueueinvestigationstatuslistGetApiResponse =
  /** status 200 OK */ IdentificationTypeDto[];
export type ApiServicesAppInvestigationGetilaboratoryqueueinvestigationstatuslistGetApiArg =
  void;
export type ApiServicesAppInvestigationGetlaboratoryqueueinvestigationresultsGetApiResponse =
  /** status 200 OK */ PagedResultDtoOfInvestigationsForLaboratoryQueueResponse;
export type ApiServicesAppInvestigationGetlaboratoryqueueinvestigationresultsGetApiArg =
  {
    orderBy?: string;
    investigationCategory?: string;
    status?: string;
    facilityId?: number;
    filter?: string;
    restrictToLastNWeeks?: number;
    skipCount?: number;
    maxResultCount?: number;
  };
export type ApiServicesAppInvestigationInvestigationrequestforpatientPostApiResponse =
  /** status 200 OK */ {
    [key: string]: GetInvestigationForPatientResponse;
  };
export type ApiServicesAppInvestigationInvestigationrequestforpatientPostApiArg =
  {
    getPatientInvestigationRequest: GetPatientInvestigationRequest;
  };
export type ApiServicesAppInvestigationLabqueuesummaryinvestigationpricesPostApiResponse =
  /** status 200 OK */ GetInvestigationPricessResponse;
export type ApiServicesAppInvestigationLabqueuesummaryinvestigationpricesPostApiArg =
  {
    getInvestigationPricesRequest: GetInvestigationPricesRequest;
  };
export type ApiServicesAppInvestigationGetlabresulttestinfoGetApiResponse =
  /** status 200 OK */ ViewTestInfoResponse;
export type ApiServicesAppInvestigationGetlabresulttestinfoGetApiArg = {
  patientId?: number;
  investigationRequestId?: number;
};
export type ApiServicesAppInvestigationGetlabtestresultGetApiResponse =
  /** status 200 OK */ ViewTestResultResponse;
export type ApiServicesAppInvestigationGetlabtestresultGetApiArg = {
  patientId?: number;
  investigationRequestId?: number;
};
export type ApiServicesAppInvestigationRecordinvestigationsamplePostApiResponse =
  unknown;
export type ApiServicesAppInvestigationRecordinvestigationsamplePostApiArg = {
  recordInvestigationSampleRequest: RecordInvestigationSampleRequest;
};
export type ApiServicesAppInvestigationCreateorupdateinvestigationresultreviewerPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationCreateorupdateinvestigationresultreviewerPostApiArg =
  {
    investigationResultReviewerRequestDto: InvestigationResultReviewerRequestDto;
  };
export type ApiServicesAppInvestigationGetinvestigationspecimensGetApiResponse =
  /** status 200 OK */ GetInvestigationSpecimensResponse;
export type ApiServicesAppInvestigationGetinvestigationspecimensGetApiArg = {
  type?: string;
};
export type ApiServicesAppInvestigationGetinvestigationspecificorganismGetApiResponse =
  /** status 200 OK */ GetInvestigationSpecificOrganismResponse;
export type ApiServicesAppInvestigationGetinvestigationspecificorganismGetApiArg =
  {
    type?: string;
  };
export type ApiServicesAppInvestigationRecordinvestigationresultforelectroradandpulmPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationRecordinvestigationresultforelectroradandpulmPostApiArg =
  {
    body: {
      PatientId?: number;
      InvestigationId?: number;
      InvestigationRequestId?: number;
      ResultDate?: string;
      ResultTime?: string;
      Conclusion?: string;
      Notes?: string;
      EncounterId?: number;
      ReviewerId?: number;
      ProcedureId?: number;
      SessionId?: number;
      ImageFiles?: Blob[];
    };
  };
export type ApiServicesAppInvestigationDeleteinvestigationresultforelectroradandpulmimageDeleteApiResponse =
  unknown;
export type ApiServicesAppInvestigationDeleteinvestigationresultforelectroradandpulmimageDeleteApiArg =
  {
    imageId?: number;
  };
export type ApiServicesAppInvestigationGetinvestigationresultforelectroradandpulmGetApiResponse =
  /** status 200 OK */ ElectroRadPulmInvestigationResultResponseDto;
export type ApiServicesAppInvestigationGetinvestigationresultforelectroradandpulmGetApiArg =
  {
    patientId?: number;
    investigationRequestId?: number;
  };
export type ApiServicesAppInvestigationGetradiologyandpulmonaryinvestigationsGetApiResponse =
  /** status 200 OK */ RadiologyAndPulmonaryInvestigationDto[];
export type ApiServicesAppInvestigationGetradiologyandpulmonaryinvestigationsGetApiArg =
  {
    category?: string;
    name?: string;
    type?: string;
  };
export type ApiServicesAppInvestigationGetradandpulmrecentinvestigationresultsGetApiResponse =
  /** status 200 OK */ GetInvestigationResultsResponse[];
export type ApiServicesAppInvestigationGetradandpulmrecentinvestigationresultsGetApiArg =
  {
    patientId?: number;
    names?: string[];
    type?: string;
    procedureId?: number;
    encounterId?: number;
    roleFilter?: string;
    sinceFilter?: string;
    beforeFilter?: string;
    userIdFilter?: number;
    sessionId?: number;
  };
export type ApiServicesAppInvestigationRecordotherinvestigationresultPostApiResponse =
  unknown;
export type ApiServicesAppInvestigationRecordotherinvestigationresultPostApiArg =
  {
    body: {
      Name?: string;
      ShortName?: string;
      Type?: string;
      Description?: string;
      PatientId?: number;
      ResultDate?: string;
      ResultTime?: string;
      Conclusion?: string;
      EncounterId?: number;
      ReviewerId?: number;
      ProcedureId?: number;
      Specimen?: string;
      SpecificOrganism?: string;
      Notes?: string;
      Views?: string;
      BodyPart?: string;
      SampleCollectionDate?: string;
      SampleTime?: string;
      ImageFiles: Blob[];
      SessionId?: number;
    };
  };
export type ApiServicesAppInvestigationGetotherinvestigationresultsGetApiResponse =
  /** status 200 OK */ GetInvestigationResultsResponse[];
export type ApiServicesAppInvestigationGetotherinvestigationresultsGetApiArg = {
  patientId?: number;
  type?: string;
  filters?: string[];
  procedureId?: number;
  encounterId?: number;
  roleFilter?: string;
  sinceFilter?: string;
  beforeFilter?: string;
  userIdFilter?: number;
  sessionId?: number;
};
export type ApiServicesAppInvestigationBulkuploadinvestigationpricesPostApiResponse =
  /** status 200 OK */ PriceUploadResponseDto;
export type ApiServicesAppInvestigationBulkuploadinvestigationpricesPostApiArg =
  {
    body: {
      FormFile?: Blob;
      FacilityId?: number;
      PricingTypeId: number;
    };
  };
export type ApiServicesAppInvestigationDownloadinvestigationpricinguploadtemplatePostApiResponse =
  unknown;
export type ApiServicesAppInvestigationDownloadinvestigationpricinguploadtemplatePostApiArg =
  {
    isExcelFormat?: boolean;
  };
export type ApiServicesAppInvestigationGetinvestigationsynonymsGetApiResponse =
  /** status 200 OK */ GetInvestigationSynonymResponseDto[];
export type ApiServicesAppInvestigationGetinvestigationsynonymsGetApiArg = {
  searchString?: string;
};
export type ApiServicesAppInvestigationGetinvestigationcategoryGetApiResponse =
  /** status 200 OK */ InvestigationCategoryDto[];
export type ApiServicesAppInvestigationGetinvestigationcategoryGetApiArg = {
  searchString?: string;
  categoryId?: number;
};
export type ApiServicesAppInvestigationSeedinvestigationscategoryPostApiResponse =
  /** status 200 OK */ number;
export type ApiServicesAppInvestigationSeedinvestigationscategoryPostApiArg =
  void;
export type ApiServicesAppInvestigationUpdateinvestigationPutApiResponse =
  unknown;
export type ApiServicesAppInvestigationUpdateinvestigationPutApiArg = {
  updateInvestigationDto: UpdateInvestigationDto;
};
export type ApiServicesAppInvestigationGetinvestigationspricePostApiResponse =
  /** status 200 OK */ GetInvestigationsPriceResponse[];
export type ApiServicesAppInvestigationGetinvestigationspricePostApiArg = {
  getInvestigationsPriceRequest: GetInvestigationsPriceRequest;
};
export type ApiServicesAppInvoicesCreatenewinvestigationinvoicePostApiResponse =
  /** status 200 OK */ CreateNewInvestigationInvoiceCommand;
export type ApiServicesAppInvoicesCreatenewinvestigationinvoicePostApiArg = {
  createNewInvestigationInvoiceCommand: CreateNewInvestigationInvoiceCommand;
};
export type ApiServicesAppInvoicesComputeinsurancepricingforinvestigationsPostApiResponse =
  /** status 200 OK */ CreateNewInvestigationInvoiceCommand;
export type ApiServicesAppInvoicesComputeinsurancepricingforinvestigationsPostApiArg =
  {
    createNewInvestigationInvoiceCommand: CreateNewInvestigationInvoiceCommand;
  };
export type PostApiPatientsApiPatientLabRequestGetInvestigationRequestsApiResponse =
  /** status 200 OK */ PagedResultDtoOfGetInvestigationRequestsResponseWithHospital;
export type PostApiPatientsApiPatientLabRequestGetInvestigationRequestsApiArg =
  {
    getInvestigationRequestsForPatientApiRequest: GetInvestigationRequestsForPatientApiRequest;
  };
export type PostApiPatientsApiPatientLabRequestGetInvestigationResultsApiResponse =
  /** status 200 OK */ GetInvestigationResultsResponseWithHospital[];
export type PostApiPatientsApiPatientLabRequestGetInvestigationResultsApiArg = {
  getInvestigationResultsForPatientRequest: GetInvestigationResultsForPatientRequest;
};
export type ApiServicesAppPatientprofileGetclinicalinvestigationGetApiResponse =
  /** status 200 OK */ ClinicalInvestigationResultResponse;
export type ApiServicesAppPatientprofileGetclinicalinvestigationGetApiArg = {
  patientId?: number;
  categoryFilter?: string;
  testFilter?: string;
  dateFilter?: InvestigationResultDateFilter;
  customStartDate?: string;
  customEndDate?: string;
};
export type ApiServicesAppPatientprofileGetawaitingclinicalinvestigationresultGetApiResponse =
  /** status 200 OK */ AwaitClinicalInvestigationResultResponse[];
export type ApiServicesAppPatientprofileGetawaitingclinicalinvestigationresultGetApiArg =
  {
    patientId?: number;
    categoryFilter?: string;
    testFilter?: string;
    dateFilter?: InvestigationResultDateFilter;
    customStartDate?: string;
    customEndDate?: string;
  };
export type ApiServicesAppPricesettingsAddinvestigationpricingPostApiResponse =
  unknown;
export type ApiServicesAppPricesettingsAddinvestigationpricingPostApiArg = {
  body: CreateInvestigationPricingDto[];
};
export type ApiServicesAppPricesettingsUpdateinvestigationpricingPutApiResponse =
  unknown;
export type ApiServicesAppPricesettingsUpdateinvestigationpricingPutApiArg = {
  updateInvestigationPricingRequestCommand: UpdateInvestigationPricingRequestCommand;
};
export type ApiServicesAppPricesettingsGetinvestigationpricingGetApiResponse =
  /** status 200 OK */ PagedResultDtoOfGetInvestigationPricingResponseDto;
export type ApiServicesAppPricesettingsGetinvestigationpricingGetApiArg = {
  filter?: string;
  investigationCategory?: string;
  sortBy?: string;
  investigationPricingId?: number;
  insuranceProviderId?: number;
  skipCount?: number;
  maxResultCount?: number;
};
export type ApiServicesAppPricesettingsGetinvestigationpricingsortitemsGetApiResponse =
  /** status 200 OK */ IdentificationTypeDto[];
export type ApiServicesAppPricesettingsGetinvestigationpricingsortitemsGetApiArg =
  void;
export type InvestigationResultReviewerRequestDto = {
  investigationResultId?: number | null;
  electroRadPulmInvestigationResultId?: number | null;
  reviewerId?: number | null;
  id?: number;
};
export type CreateOrEditInsuranceClaimRequest = {
  invoiceId?: number;
  insuranceProviderId?: number;
  invoiceItemId?: number;
  isActive?: boolean;
  authorizationCode?: string | null;
  id?: number | null;
};
export type GetAllInvestigationsResponse = {
  id?: number;
  snowmedId?: string | null;
  name?: string | null;
  specimen?: string | null;
  source?: string | null;
  category?: string | null;
  categoryId?: number | null;
  hasPrice?: boolean;
};
export type Synonyms = {
  name?: string | null;
  snomedId?: string | null;
};
export type Conclusion = {
  text?: string | null;
  snomedId?: string | null;
};
export type UnitOfTime = 'Day' | 'Week' | 'Month' | 'Year';
export type GenderType = 'Male' | 'Female' | 'Other';
export type InvestigationRangeDto = {
  ageMin?: number | null;
  ageMinUnit?: UnitOfTime;
  ageMax?: number | null;
  ageMaxUnit?: UnitOfTime;
  gender?: GenderType;
  unit?: string | null;
  minRange?: number | null;
  maxRange?: number | null;
};
export type InvestigationSuggestionDto = {
  result?: string | null;
  snomedId?: string | null;
  category?: string | null;
  normal?: boolean;
};
export type InvestigationResultsDto = {
  result?: string | null;
  normal?: boolean;
};
export type DipstickResultDto = {
  result?: string | null;
  order?: number;
};
export type DipstickRangeDto = {
  unit?: string | null;
  results?: DipstickResultDto[] | null;
};
export type DipstickDto = {
  parameter?: string | null;
  ranges?: DipstickRangeDto[] | null;
};
export type GetInvestigationResponse = {
  id?: number;
  name?: string | null;
  shortName?: string | null;
  snomedId?: string | null;
  synonyms?: Synonyms[] | null;
  specimen?: string[] | null;
  nugentScore?: boolean;
  type?: string | null;
  specificOrganism?: string | null;
  conclusion?: Conclusion[] | null;
  bodyPart?: string | null;
  views?: string | null;
  components?: GetInvestigationResponse[] | null;
  ranges?: InvestigationRangeDto[] | null;
  suggestions?: InvestigationSuggestionDto[] | null;
  results?: InvestigationResultsDto[] | null;
  dipstick?: DipstickDto[] | null;
};
export type RequestInvestigationRequest = {
  patientId?: number;
  investigationId?: number | null;
  investigationName?: string | null;
  snomedId?: string | null;
  investigationType?: string | null;
  urgent?: boolean;
  withContrast?: boolean;
  notes?: string | null;
  encounterId?: number | null;
  procedureId?: number | null;
  specimen?: string | null;
  specificOrganism?: string | null;
  bodyPart?: string | null;
  views?: string | null;
  id?: number;
  onBehalfOfUserId?: number | null;
  sessionId?: number | null;
  investigationRequestGroupId?: number | null;
};
export type CreateSelectedRequestInvestigationGroupDiagnosis = {
  selectedDiagnosisId?: number;
};
export type CreateRequestInvestigationGroupGenderDto = {
  gender?: GenderType;
};
export type InvestigationGroupType =
  | 'Personal'
  | 'Unit'
  | 'FacilityWide'
  | 'GroupWide';
export type CreateRequestInvestigationGroupDto = {
  name?: string | null;
  diagnosis?: CreateSelectedRequestInvestigationGroupDiagnosis[] | null;
  investigationRequests?: RequestInvestigationRequest[] | null;
  minimumAge?: number;
  maximumAge?: number;
  investigationRequestGroupGenders?:
    | CreateRequestInvestigationGroupGenderDto[]
    | null;
  type?: InvestigationGroupType;
  encounterId?: number;
};
export type InvestigationStatus =
  | 'All Investigations'
  | 'Requested'
  | 'Invoiced'
  | 'Processing'
  | 'Result Ready'
  | 'Image Ready'
  | 'Awaiting Review'
  | 'Report Ready';
export type GetInvestigationRequestsResponse = {
  id?: number;
  investigationId?: number | null;
  name?: string | null;
  snomedId?: string | null;
  shortName?: string | null;
  type?: string | null;
  specimen?: string | null;
  specificOrganism?: string | null;
  bodyPart?: string | null;
  views?: string | null;
  urgent?: boolean;
  withContrast?: boolean;
  notes?: string | null;
  investigationStatus?: InvestigationStatus;
  procedureId?: number | null;
  isDeleted?: boolean;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  deletedUser?: string | null;
};
export type PatientSuggestedInvestigationResponseDto = {
  id?: number;
  name?: string | null;
  groupReuqestedInvestigations?: GetInvestigationRequestsResponse[] | null;
};
export type GetPatientInvestigationRequestResponseDto = {
  date?: string;
  investigationRequest?: GetInvestigationRequestsResponse[] | null;
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
export type CreateHistopathologyDiagnosisDto = {
  sctId?: string | null;
  name?: string | null;
};
export type RecordInvestigationRequest = {
  patientId?: number;
  investigationId?: number;
  investigationRequestId?: number | null;
  name?: string | null;
  reference?: string | null;
  sampleCollectionDate?: string;
  resultDate?: string;
  sampleTime?: string;
  resultTime?: string;
  specimen?: string | null;
  conclusion?: string | null;
  specificOrganism?: string | null;
  view?: string | null;
  notes?: string | null;
  encounterId?: number | null;
  reviewerId?: number | null;
  procedureId?: number | null;
  investigationComponentResults?: InvestigationComponentResultDto[] | null;
  id?: number;
  sessionId?: number | null;
  diagnosis?: CreateHistopathologyDiagnosisDto[] | null;
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
export type LinkInvestigationToDiagnosisRequest = {
  investigationRequestId?: number;
  diagnosisId?: number;
};
export type IdentificationTypeDto = {
  label?: string | null;
  value?: string | null;
};
export type InsuranceProviderType = 'National' | 'State' | 'Private';
export type PaymentTypes =
  | 'ServiceOnCredit'
  | 'Wallet'
  | 'SplitPayment'
  | 'Insurance'
  | 'PayDirect'
  | 'Pos'
  | 'CARD';
export type InsuranceProviderDto = {
  name?: string | null;
  isActive?: boolean;
  type?: InsuranceProviderType;
  defaultPaymentType?: PaymentTypes;
  isCreateInvoiceGeneralPriceEnabled?: boolean;
  isPayInvoiceGeneralPriceEnabled?: boolean;
  id?: number;
};
export type PatientDetail = {
  patientId?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  patientDisplayName?: string | null;
  patientImageUrl?: string | null;
  phoneNumber?: string | null;
  age?: string | null;
  gender?: string | null;
  hasInsurance?: boolean;
  ward?: string | null;
  wardBed?: string | null;
  patientCode?: string | null;
  lastModifiedTime?: string;
  creationTime?: string;
  emailAddress?: string | null;
  insuranceProviders?: InsuranceProviderDto[] | null;
  walletBalance?: number;
  insuranceInfo?: InsuranceInfo;
};
export type MoneyDto = {
  amount: number;
  currency: string;
};
export type ModifierOrCreatorDetailDto = {
  title?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  unit?: string | null;
};
export type InvestigtionReviewerResponse = {
  reviewerId?: number | null;
  reviewerFullname?: string | null;
};
export type HistopathologyDiagnosisDto = {
  sctId?: string | null;
  name?: string | null;
};
export type InvestigationResponseList = {
  sampleNo?: string | null;
  investigationName?: string | null;
  snomedId?: string | null;
  investigationNote?: string | null;
  specimen?: string | null;
  organism?: string | null;
  amount?: MoneyDto;
  dateCreatedOrLastModified?: string;
  investigationCategory?: string | null;
  investigationId?: number | null;
  investigationRequestId?: number;
  encounterId?: number | null;
  creatorOrModifierInfo?: ModifierOrCreatorDetailDto;
  status?: string | null;
  paymentStatus?: string | null;
  isSampleTaken?: boolean;
  dataEntryUser?: string | null;
  reviewerFullName?: string | null;
  invoiceItemId?: number | null;
  invoiceId?: number | null;
  investigationReviewerId?: number | null;
  isDeleted?: boolean;
  updateIsDisabled?: boolean;
  reviewer?: InvestigtionReviewerResponse;
  histopathDiagnosis?: HistopathologyDiagnosisDto[] | null;
};
export type InvestigationsForLaboratoryQueueResponse = {
  patientDetail?: PatientDetail;
  investigationItems?: InvestigationResponseList[] | null;
};
export type PagedResultDtoOfInvestigationsForLaboratoryQueueResponse = {
  totalCount?: number;
  items?: InvestigationsForLaboratoryQueueResponse[] | null;
};
export type GetInvestigationForPatientResponse = {
  patientId?: number;
  status?: InvestigationStatus;
  nameOfInvestigation?: string | null;
  dateRequested?: string;
  isDeleted?: boolean;
};
export type GetPatientInvestigationRequest = {
  investigationIds?: number[] | null;
  patientId?: number;
};
export type GetInvestigationPricessResponse = {
  investigationsAndPrices?: {
    [key: string]: MoneyDto;
  } | null;
};
export type GetInvestigationPricesRequest = {
  investigationIds?: number[] | null;
};
export type ViewTestInfoResponse = {
  patientFirstName?: string | null;
  patientLastName?: string | null;
  patientAge?: string | null;
  gender?: string | null;
  patientImageUrl?: string | null;
  patientCode?: string | null;
  requestorFirstName?: string | null;
  requestorLastName?: string | null;
  requestorContactPhoneNumber?: string | null;
  requestorUnit?: string | null;
  requestorTitle?: string | null;
  requestorImageUrl?: string | null;
  diagnosisDescription?: string | null;
  diagnosisNotes?: string | null;
  testName?: string | null;
  specimen?: string | null;
  views?: string | null;
  resultImageUrls?: string[] | null;
  bodyPart?: string | null;
  organism?: string | null;
  testCategory?: string | null;
  testStatus?: string | null;
  clinicOrWard?: string | null;
  investigationRequestNotes?: string | null;
  dateRequested?: string;
};
export type LabInvestigationResultsDto = {
  name?: string | null;
  result?: string | null;
  reference?: string | null;
  minRange?: number;
  maxRange?: number;
  numericResult?: number;
  unit?: string | null;
  category?: string | null;
  total?: number;
  procedureId?: number | null;
  updateIsDisabled?: boolean;
};
export type ViewTestResultResponse = {
  patientFirstName?: string | null;
  patientLastName?: string | null;
  patientAge?: string | null;
  gender?: string | null;
  patientImageUrl?: string | null;
  patientCode?: string | null;
  requestorFirstName?: string | null;
  requestorLastName?: string | null;
  requestorContactPhoneNumber?: string | null;
  requestorUnit?: string | null;
  requestorTitle?: string | null;
  requestorImageUrl?: string | null;
  dateRequested?: string;
  investigationRequestNote?: string | null;
  diagnosisDescription?: string | null;
  diagnosisNotes?: string | null;
  testName?: string | null;
  specimen?: string | null;
  organism?: string | null;
  testCategory?: string | null;
  testStatus?: string | null;
  clinicOrWard?: string | null;
  processingLabPersonnel?: string | null;
  timeOfResultCollection?: string;
  dateOfResultCollection?: string;
  timeOfSampleCollection?: string;
  dateOfSampleCollection?: string;
  investigationResultId?: number;
  reviewer?: InvestigtionReviewerResponse;
  investigationResults?: LabInvestigationResultsDto[] | null;
  histopathologyDiagnosis?: HistopathologyDiagnosisDto[] | null;
  notes?: string | null;
  conclusion?: string | null;
};
export type RecordInvestigationSampleRequest = {
  sampleNo?: string | null;
  patientId?: number;
  investigationId?: number;
  investigationRequestId?: number;
  encounterId?: number | null;
  nameOfInvestigation?: string | null;
  sampleCollectionDate?: string;
  sampleCollectionTime?: string;
  specimen?: string | null;
  procedureId?: number | null;
};
export type GetInvestigationSpecimensResponse = {
  specimens?: string[] | null;
};
export type GetInvestigationSpecificOrganismResponse = {
  specificOrganisms?: string[] | null;
};
export type ElectroRadPulmInvestigationImageResultResponseDto = {
  imageId?: number;
  imageUrl?: string | null;
};
export type ElectroRadPulmInvestigationResultResponseDto = {
  name?: string | null;
  type?: string | null;
  patientId?: number;
  investigationId?: number;
  investigationRequestId?: number | null;
  resultTime?: string;
  resultDate?: string;
  sampleCollectionDate?: string | null;
  sampleCollectionTime?: string | null;
  notes?: string | null;
  conclusions?: string | null;
  resultImageUrls?: ElectroRadPulmInvestigationImageResultResponseDto[] | null;
  creationTime?: string;
  procedureId?: number | null;
  updateIsDisabled?: boolean;
  creatorUserId?: number | null;
};
export type RadiologyAndPulmonaryInvestigationsDto = {
  id?: number;
  investigationId?: number;
  name?: string | null;
  category?: string | null;
};
export type RadiologyAndPulmonaryInvestigationDto = {
  id?: number;
  name?: string | null;
  type?: string | null;
  investigationComponents?: RadiologyAndPulmonaryInvestigationsDto[] | null;
};
export type PriceUploadResponseDto = {
  message?: string | null;
  failedUploadMessages?: string[] | null;
};
export type GetInvestigationSynonymResponseDto = {
  synonym?: string | null;
};
export type InvestigationCategoryDto = {
  name?: string | null;
  id?: number;
};
export type UpdateInvestigationDto = {
  type?: string | null;
  name?: string | null;
  shortName?: string | null;
  snomedId?: string | null;
  synonyms?: string | null;
  specimen?: string | null;
  specificOrganism?: string | null;
  conclusion?: string | null;
  investigationCode?: string | null;
  investigationCategoryId?: number | null;
  id?: number;
};
export type GetInvestigationsPriceResponse = {
  investigationId?: number;
  investigationName?: string | null;
  price?: MoneyDto;
  hasPreAuth?: boolean;
  investigationRequestId?: number;
};
export type InvestigationDto = {
  name?: string | null;
  investigationRequestId?: number;
  id?: number;
};
export type GetInvestigationsPriceRequest = {
  insuranceProviderId: number;
  investigations: InvestigationDto[];
};
export type InvoiceItemStatus =
  | 'Unpaid'
  | 'Awaiting approval'
  | 'Paid'
  | 'Cancelled'
  | 'Approved'
  | 'ReliefApplied'
  | 'Refunded'
  | 'AwaitCancellationApproval';
export type InvoiceItemRequest = {
  name?: string | null;
  quantity?: number;
  unitPrice?: MoneyDto;
  subTotal?: MoneyDto;
  discountPercentage?: number;
  isGlobal?: boolean;
  isDeleted?: boolean;
  investigationId?: number | null;
  investigationRequestId?: number | null;
  investigationCategory?: string | null;
  priceId?: number | null;
  hasPreAuth?: boolean;
  preAuthCode?: string | null;
  status?: InvoiceItemStatus;
  id?: number | null;
};
export type InvoiceSource =
  | 'AccidentAndEmergency'
  | 'OutPatient'
  | 'InPatient'
  | 'Pharmacy'
  | 'Lab'
  | 'Others';
export type CreateNewInvestigationInvoiceCommand = {
  invoiceNo: string;
  appointmentId?: number | null;
  patientId: number;
  paymentType: PaymentTypes;
  totalAmount?: MoneyDto;
  isServiceOnCredit?: boolean;
  encounterId?: number | null;
  items?: InvoiceItemRequest[] | null;
  invoiceSource?: InvoiceSource;
  appliedPriceFrom?: string | null;
  insuranceProviderId?: number | null;
  id?: number | null;
};
export type GetInvestigationRequestsResponseWithHospital = {
  hospital?: string | null;
  id?: number;
  investigationId?: number | null;
  name?: string | null;
  snomedId?: string | null;
  shortName?: string | null;
  type?: string | null;
  specimen?: string | null;
  specificOrganism?: string | null;
  bodyPart?: string | null;
  views?: string | null;
  urgent?: boolean;
  withContrast?: boolean;
  notes?: string | null;
  investigationStatus?: InvestigationStatus;
  procedureId?: number | null;
  isDeleted?: boolean;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  deletedUser?: string | null;
};
export type PagedResultDtoOfGetInvestigationRequestsResponseWithHospital = {
  totalCount?: number;
  items?: GetInvestigationRequestsResponseWithHospital[] | null;
};
export type GetInvestigationRequestsForPatientApiRequest = {
  patientId: number;
  type?: string | null;
  procedureId?: number | null;
  encounterId?: number | null;
  excludeRecordedInvestigations?: boolean;
  sinceFilter?: string | null;
  beforeFilter?: string | null;
  sessionId?: number | null;
  skipCount?: number;
  maxResultCount?: number;
};
export type GetInvestigationResultsResponseWithHospital = {
  hospital?: string | null;
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
export type GetInvestigationResultsForPatientRequest = {
  patientId: number;
  type?: string | null;
  filters?: string[] | null;
  procedureId?: number | null;
  encounterId?: number | null;
  sinceFilter?: string | null;
  beforeFilter?: string | null;
};
export type HaematologyAndChemistryConclusionTableResponse = {
  id?: number;
  minRange?: number;
  maxRange?: number;
  result?: string | null;
  flag?: string | null;
  date?: string;
  reference?: string | null;
  name?: string | null;
  category?: string | null;
  numericResult?: number;
  unit?: string | null;
  resultDate?: string;
  resultTime?: string;
};
export type HaematologyAndChemistryConclusionResponse = {
  conclusion?: string | null;
  date?: string;
  note?: string | null;
  id?: number;
};
export type HaematologyAndChemistryTableResponse = {
  name?: string | null;
  components?: {
    [key: string]: {
      [key: string]: HaematologyAndChemistryConclusionTableResponse[];
    } | null;
  } | null;
  conclusions?: HaematologyAndChemistryConclusionResponse[] | null;
};
export type MicrobiologyAndSerologyComponentResponse = {
  name?: string | null;
  result?: string | null;
  reference?: string | null;
  flag?: string | null;
  numericResult?: number;
  creationTime?: string;
  category?: string | null;
  unit?: string | null;
  resultDate?: string;
  resultTime?: string;
};
export type MicrobiologyAndSerologyResponse = {
  name?: string | null;
  note?: string | null;
  conclusion?: string | null;
  creationTime?: string;
  components?: MicrobiologyAndSerologyComponentResponse[] | null;
};
export type RadiologyAndElectrophysiologyResponse = {
  conclusion?: string | null;
  note?: string | null;
  numberOfImages?: string | null;
  name?: string | null;
  resultImageUrls?: string[] | null;
  creationTime?: string;
  id?: number;
  resultDate?: string;
  resultTime?: string;
};
export type ClinicalInvestigationResultResponse = {
  haematologyAndChemistry?: HaematologyAndChemistryTableResponse[] | null;
  microbiologyAndSerology?: MicrobiologyAndSerologyResponse[] | null;
  radiologyAndElectrophysiology?:
    | RadiologyAndElectrophysiologyResponse[]
    | null;
};
export type InvestigationResultDateFilter =
  | 'Today'
  | 'LastSevenDays'
  | 'LastFourteenDays'
  | 'LastThirtyDays'
  | 'LastNinetyDays'
  | 'LastOneYear';
export type AwaitClinicalInvestigationResultResponse = {
  name?: string | null;
  physician?: string | null;
  clinic?: string | null;
  date?: string;
  id?: number;
  status?: InvestigationStatus;
};
export type CreateInvestigationPricingDto = {
  investigationId: number;
  investigationName?: string | null;
  investigationSnomedId?: string | null;
  investigationCategory: string;
  amount: MoneyDto;
  isActive: boolean;
  notes?: string | null;
  insuranceProviderId?: number | null;
  requiresPreAuth?: boolean;
  synonym?: string | null;
  investigationCategoryId?: number | null;
};
export type PricingType = 'General Pricing' | 'Insurance Pricing';
export type UpdateInvestigationPricingRequestCommand = {
  investigationPricingId: number;
  investigationId: number;
  amount?: MoneyDto;
  isActive: boolean;
  notes?: string | null;
  priceType?: PricingType;
  insuranceProviderId?: number | null;
  synonym?: string | null;
  requiresPreAuth?: boolean;
};
export type InvestigationPricingTypeDto = {
  type?: string | null;
  insuranceProviderId?: number | null;
};
export type GetInvestigationCategoryDto = {
  name?: string | null;
  id?: number;
  canEdit?: boolean;
};
export type GetInvestigationPricingResponseDto = {
  id?: number;
  investigationId?: number;
  investigationName?: string | null;
  amount?: MoneyDto;
  isActive?: boolean;
  notes?: string | null;
  dateCreated?: string;
  priceType?: InvestigationPricingTypeDto;
  investigationCategory?: GetInvestigationCategoryDto;
  synonyms?: string | null;
  requiresPreAuth?: boolean;
};
export type PagedResultDtoOfGetInvestigationPricingResponseDto = {
  totalCount?: number;
  items?: GetInvestigationPricingResponseDto[] | null;
};

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
import { GetCurrentLoginInformationsOutput } from '@/state/services/sessionApi';

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

export type AppointmentStatusType =
  | 'Pending'
  | 'Executed'
  | 'Missed'
  | 'Rescheduled'
  | 'Upcoming'
  | 'Concluded'
  | 'Fully discharged'
  | 'Deceased'
  | 'Not arrived'
  | 'Arrived'
  | 'Processing'
  | 'Awaiting vitals'
  | 'Awaiting clinician'
  | 'Awaiting doctor'
  | 'Referred to A&E'
  | 'Seen doctor'
  | 'Seen clinician'
  | 'Admitted to ward'
  | 'Transferred to A&E'
  | 'Awaiting admission'
  | 'Cancelled';
export enum InputType {
  AE,
  INPATIENT,
  OUTPATIENT,
  LABOUR,
  ANTENATAL,
}

export enum InputTypeStrings {
  AE = 'Accident and Emergency',
  INPATIENT = 'Inpatient',
  OUTPATIENT = 'Outpatient',
  LABOUR = 'Labour',
  ANTENATAL = 'Antenatal',
}

export enum TransferEnum {
  INPROGRESS = 'In progress',
  COMPLETED = 'Completed',
  AWAITINGNURSE = `Awaiting Nurses' transfer`,
}

export type Pill = {
  value: string;
  name?: string;
  specimen?: string | null;
  type?: string;
  tab?: string;
  views?: string;
  bodyPart?: string;
  specificOrganism?: string;
  sub?: string;
  contrast?: string | null;
  id?: number | null;
  source?: string;
  snowmedId?: number | null;
  groupReuqestedInvestigations?: GetInvestigationRequestsResponse[] | null;
};

export type ItemType = {
  id: string;
  name: string;
};

export type ItemProps = {
  id?: number;
  name: string;
  source?: string;
  snomedId?: string;
  hasPrice?: boolean;
  groupReuqestedInvestigations?: GetInvestigationRequestsResponse[] | null;
};

export type CreateMedicationGroupGenderDto = {
  gender?: GenderType;
};
export type MedicationGroupType =
  | 'Personal'
  | 'Unit'
  | 'FacilityWide'
  | 'GroupWide';
export type CreateSelectedMedicationGroupDiagnosis = {
  selectedDiagnosisId?: number;
};
export type CreateMedicationDto = {
  patientId?: number;
  productId?: number | null;
  productName?: string | null;
  snowmedId?: string | null;
  productSourceType: ProductSourceType;
  doseUnit?: string | null;
  doseValue?: number | null;
  frequencyUnit?: string | null;
  frequencyValue?: number | null;
  durationUnit?: string | null;
  durationValue?: number | null;
  directions?: string[] | null;
  note?: string | null;
  isManualEntry?: boolean;
  medicationGroupId?: number | null;
  isAdministered?: boolean;
};
export type CreateMedicationGroupDto = {
  name?: string | null;
  diagnosis?: CreateSelectedMedicationGroupDiagnosis[] | null;
  prescriptions?: CreateMedicationDto[] | null;
  minimumAge?: number;
  maximumAge?: number;
  minimumWeight?: number;
  maximumWeight?: number;
  medicationGroupGenders?: CreateMedicationGroupGenderDto[] | null;
  type?: MedicationGroupType;
  encounterId?: number;
  sessionId?: number | null;
};
export type DispensingUnitType =
  | 'Pallet'
  | 'Carton'
  | 'Packet'
  | 'Pack'
  | 'Blister pack'
  | 'Sachet'
  | 'Tablet'
  | 'Capsule'
  | 'Caplet'
  | 'Bottle'
  | 'Half bottle'
  | 'Vial'
  | 'Ampoule'
  | 'Tube'
  | 'Granule'
  | 'Bundle'
  | 'Nebule'
  | 'Unit'
  | 'Pack of 1000 tablets'
  | 'Pack of 100 tablets'
  | 'Pack of 10 tablets';
export type SearchProductMedicationForReturnDto = {
  productId?: number | null;
  productName?: string | null;
  resultDisplayName?: string | null;
  activeIngredients?: string | null;
  brandId?: number;
  brandName?: string | null;
  doseFormId?: number | null;
  doseFormName?: string | null;
  doseFormShortName?: string | null;
  doseStrengthId?: number | null;
  doseStrengthName?: string | null;
  genericDrugId?: number | null;
  genericDrugName?: string | null;
  snowmedId?: string | null;
  sourceType?: ProductSourceType;
  isGlobal?: boolean;
  isAvailable?: boolean;
  totalAmountInStock?: number;
  dispensingUnit?: DispensingUnitType;
};
export type MedicationSuggestionForReturnDto = {
  dose?: string[] | null;
  unit?: string[] | null;
  frequency?: string[] | null;
  direction?: string[] | null;
  duration?: string[] | null;
};
export type MedicalViewResponse = {
  id?: number;
  productName?: string | null;
  description?: string | null;
};
export type MedicationActivityResponse = {
  id?: number;
  medicationId?: number | null;
  encounterId?: number | null;
  isAvailable?: boolean;
  directions?: string[] | null;
  note?: string | null;
  doseUnit?: string | null;
  doseValue?: number | null;
  frequencyUnit?: string | null;
  frequencyValue?: number | null;
  durationUnit?: string | null;
  durationValue?: number | null;
  productName?: string | null;
  createdDate?: string;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
};
export type MedicationAdministrationResponse = {
  id?: number;
  patientId?: number;
  productId?: number | null;
  productName?: string | null;
  doseUnit?: string | null;
  frequency?: string | null;
  duration?: string | null;
  note?: string | null;
  procedureSessionId?: number | null;
  procedureEntryType?: string | null;
  creationTime?: string;
  isAdministered?: boolean;
  isDiscontinued?: boolean;
  medicationAdministrationActivities?: MedicationActivityResponse[] | null;
  doseValue?: number | null;
  frequencyValue?: number | null;
  durationValue?: number | null;
  directions?: string[] | null;
  productSourceType?: ProductSourceType;
  deletedUser?: string | null;
  isDeleted?: boolean;
  deletionTime?: string | null;
  discontinueUser?: string | null;
};
export type MedicationSummaryQueryResponse = {
  id?: number;
  productName?: string | null;
  description?: string | null;
};
export type DeleteMedicationDto = {
  id?: number;
  isDeleted?: boolean;
  selectedAdministeredMedications?: DeleteMedicationDto[] | null;
};
export type ProductSourceType =
  | 'GenericName'
  | 'Synonyms'
  | 'Product'
  | 'ActiveIngrediens'
  | 'Category'
  | 'DoseForm'
  | 'Snowmed'
  | 'Suggestion';
export type MedicationAdministrationActivityRequest = {
  medicationId?: number;
  encounterId: number;
  patientId: number;
  isAvailable?: boolean;
  directions?: string[] | null;
  note?: string | null;
  doseUnit?: string | null;
  doseValue?: number | null;
  frequencyUnit?: string | null;
  frequencyValue?: number | null;
  durationUnit?: string | null;
  durationValue?: number | null;
  productName?: string | null;
  productId?: number | null;
  snowmedId?: string | null;
  isManualEntry?: boolean;
  sessionId?: number | null;
  productSourceType: ProductSourceType;
};
export type MedicationAdministrationActivityResponse = {
  id?: number;
  medicationId?: number | null;
  encounterId?: number | null;
  isAvailable?: boolean;
  directions?: string[] | null;
  note?: string | null;
  doseUnit?: string | null;
  doseValue?: number | null;
  frequencyUnit?: string | null;
  frequencyValue?: number | null;
  durationUnit?: string | null;
  durationValue?: number | null;
  productName?: string | null;
  productId?: number | null;
  product?: {};
  productSourceType?: ProductSourceType;
  summary?: string | null;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  deletedUser?: string | null;
  isDeleted?: boolean;
  discontinuedBy?: string | null;
  isAdministered?: boolean;
  isDiscontinued?: boolean;
};
export type SuggestedMedicationType = 'Medication' | 'MedicationGroup';
export type PatientMedicationBaseResponseDto = {
  id?: number;
  sessionId?: number | null;
  patientId?: number;
  productId?: number | null;
  productName?: string | null;
  productSourceType?: ProductSourceType;
  doseUnit?: string | null;
  doseValue?: number | null;
  frequencyUnit?: string | null;
  frequencyValue?: number | null;
  durationValue?: number | null;
  durationUnit?: string | null;
  directions?: string[] | null;
  note?: string | null;
};
export type PatientSuggestedMedicationsResponseDto = {
  id?: number;
  name?: string | null;
  suggestedMedicationType?: SuggestedMedicationType;
  groupedMedications?: PatientMedicationBaseResponseDto[] | null;
};

export type ApiServicesAppVaccineGetallGetApiResponse =
  /** status 200 OK */ GetAllVaccinesResponse[];
export type ApiServicesAppVaccineGetallGetApiArg = void;
export type ApiServicesAppVaccineGetvaccineGetApiResponse =
  /** status 200 OK */ GetVaccineResponse;
export type ApiServicesAppVaccineGetvaccineGetApiArg = {
  id?: number;
};
export type ApiServicesAppVaccineGetallvaccinegroupsGetApiResponse =
  /** status 200 OK */ GetAllVaccineGroupsResponse[];
export type ApiServicesAppVaccineGetallvaccinegroupsGetApiArg = void;
export type ApiServicesAppVaccineGetvaccinegroupGetApiResponse =
  /** status 200 OK */ GetVaccineGroupResponse;
export type ApiServicesAppVaccineGetvaccinegroupGetApiArg = {
  id?: number;
};
export type ApiServicesAppVaccineCreatevaccinationPostApiResponse = unknown;
export type ApiServicesAppVaccineCreatevaccinationPostApiArg = {
  createMultipleVaccinationDto: CreateMultipleVaccinationDto;
};
export type ApiServicesAppVaccineCreatevaccinationhistoryPostApiResponse =
  unknown;
export type ApiServicesAppVaccineCreatevaccinationhistoryPostApiArg = {
  createMultipleVaccinationHistoryDto: CreateMultipleVaccinationHistoryDto;
};
export type ApiServicesAppVaccineGetpatientvaccinationGetApiResponse =
  /** status 200 OK */ VaccinationResponseDto[];
export type ApiServicesAppVaccineGetpatientvaccinationGetApiArg = {
  id?: number;
  procedureId?: number;
  encounterId?: number;
  roleFilter?: string;
  sinceFilter?: string;
  beforeFilter?: string;
  userIdFilter?: number;
  sessionId?: number;
};
export type ApiServicesAppVaccineDeletevaccinationDeleteApiResponse = unknown;
export type ApiServicesAppVaccineDeletevaccinationDeleteApiArg = {
  deleteVaccinationRequest: DeleteVaccinationRequest;
};
export type ApiServicesAppVaccineGetpatientvaccinationhistoryGetApiResponse =
  /** status 200 OK */ VaccinationHistoryResponseDto[];
export type ApiServicesAppVaccineGetpatientvaccinationhistoryGetApiArg = {
  id?: number;
};
export type GetAllVaccinesResponse = {
  id?: number;
  name?: string | null;
  fullName?: string | null;
};

export type VaccineScheduleDto = {
  id?: number;
  dosage?: string | null;
  doses?: number;
  routeOfAdministration?: string | null;
  ageMin?: number | null;
  ageMinUnit?: UnitOfTime;
  ageMax?: number | null;
  ageMaxUnit?: UnitOfTime;
  notes?: string | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  deletionTime?: string | null;
};
export type GetVaccineResponse = {
  id?: number;
  name?: string | null;
  fullName?: string | null;
  schedules?: VaccineScheduleDto[] | null;
};
export type GetAllVaccineGroupsResponse = {
  id?: number;
  name?: string | null;
  fullName?: string | null;
};
export type GetVaccineGroupResponse = {
  id?: number;
  name?: string | null;
  fullName?: string | null;
  vaccines?: GetVaccineResponse[] | null;
};
export type CreateVaccinationDto = {
  dueDate?: string | null;
  patientId?: number;
  vaccineId?: number;
  vaccineScheduleId?: number;
  isAdministered?: boolean;
  dateAdministered?: string | null;
  hasComplication?: boolean;
  vaccineBrand?: string | null;
  vaccineBatchNo?: string | null;
  note?: string | null;
};
export type ProcedureEntryType = 'Preop' | 'Intraop' | 'Postop';
export type CreateMultipleVaccinationDto = {
  vaccinations?: CreateVaccinationDto[] | null;
  encounterId?: number;
  procedureId?: number | null;
  procedureEntryType?: ProcedureEntryType;
  sessionId?: number | null;
};
export type CreateVaccinationHistoryDto = {
  patientId?: number;
  vaccineId?: number;
  hasComplication?: boolean;
  lastVaccineDuration?: string | null;
  note?: string | null;
  id?: number | null;
  numberOfDoses?: number;
};
export type CreateMultipleVaccinationHistoryDto = {
  vaccinationHistory?: CreateVaccinationHistoryDto[] | null;
  encounterId?: number;
  sessionId?: number | null;
};
export type VaccinationResponseDto = {
  patientId?: number;
  vaccineId?: number;
  vaccine?: GetVaccineResponse;
  vaccineScheduleId?: number;
  vaccineSchedule?: VaccineScheduleDto;
  isAdministered?: boolean;
  dueDate?: string | null;
  dateAdministered?: string | null;
  hasComplication?: boolean;
  vaccineBrand?: string | null;
  vaccineBatchNo?: string | null;
  note?: string | null;
  procedureId?: number | null;
  procedureEntryType?: string | null;
  creationTime?: string;
  creatorUser?: string | null;
  deletionTime?: string | null;
  isDeleted?: boolean;
  deletedUser?: string | null;
  id?: number;
};
export type SelectedVaccinationToDeleteRequest = {
  id?: number;
  isDeleted?: boolean;
};
export type DeleteVaccinationRequest = {
  selectedVaccination?: SelectedVaccinationToDeleteRequest[] | null;
  sessionId?: number | null;
};
export type VaccinationHistoryResponseDto = {
  id?: number;
  patientId?: number;
  vaccineId?: number;
  vaccine?: GetVaccineResponse;
  numberOfDoses?: number;
  hasComplication?: boolean;
  lastVaccineDuration?: string | null;
  note?: string | null;
};

type RecordPill = {
  id: number;
  name: string;
  specimen: string | null;
  specificOrganism: string | null;
  requestId: number | null;
  patientDetail?: PatientDetail;
  investigationDetails?: InvestigationResponseList;
};
export type LaboratoryType = {
  id: number;
  patientName: string;
  hospitalNumber: string;
  age: string;
  gender: string;
  image?: string;
  ward: string;
  prescriptionDoctor: string;
  unit: string;
  timeIssued: string;
  prescribedLab: LaboratoryUnit[];
};

export type LaboratoryUnit = {
  id: number;
  testName: {
    drugName: string;
    prescriptionDoctor: string;
    unit: string;
  };
  category: string;
  specimen: string;
  specificOrganism: string;
  price: string;
  date: {
    status: string;
    day: string;
  };
  status: {
    type: string;
  };
};

export type InvestigationResponseListCustom = {
  investigationName?: string | null;
  snomedId?: string | null;
  investigationNote?: string | null;
  specimen?: string | null;
  organism?: string | null;
  amount?: MoneyDto;
  dateCreatedOrLastModified?: string;
  investigationCategory?: string | null;
  investigationId?: number | null;
  investigationRequestId?: number;
  encounterId?: number | null;
  creatorOrModifierInfo?: ModifierOrCreatorDetailDto;
  status?: string | null;
  isSampleTaken?: boolean;
  dataEntryUser?: string | null;
  reviewerFullName?: string | null;
  invoiceItemId?: number | null;
  invoiceId?: number | null;
  investigationReviewerId?: number | null;
  reviewer?: InvestigtionReviewerResponse;
  unitPrice?: MoneyDto;
  hasPreAuth?: boolean;
  preAuthCode?: string | null;
  id?: number | null;
  paymentType: string;
};
export interface OtherPropsType {
  userRole: string;
  handleInvoiceModal: (modalTypeProps: ModalType) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setSelectedInvestigationDetails: React.Dispatch<
    React.SetStateAction<RecordPill | null>
  >;
  patientDetails: PatientDetail;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<PatientDetail | undefined>
  >;
  setTestDetails: React.Dispatch<
    React.SetStateAction<InvestigationResponseList | undefined>
  >;
  setSelectedDetails: React.Dispatch<
    React.SetStateAction<InvestigationsForLaboratoryQueueResponse>
  >;
  showWarning: (title: string, message: string) => void;
  setInvestigationRequestId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  loggedInDetails: GetCurrentLoginInformationsOutput | undefined;
  toPDF: (options?: null ) => void;
  showSuccess: (title: string, message: string) => void;
  setCreateInvoiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPayInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  setIsServiceOnCredit: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenViewpaidInvoiceModal: (
    id: number | undefined | null,
    createdAt: string | null | undefined,
  ) => void;
  handleSetInvoiceIdForPayInvoice: (id: number | undefined | null) => void;
  setDicomOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  editLabResult?: boolean;
  setEditLabResult?: React.Dispatch<React.SetStateAction<boolean>>;
  generateWordDoc?: (
    testDetails: InvestigationResponseList,
    patientDetail: PatientDetail,
    isRadiologyReport?: boolean,
  ) => Promise<void>;
}

export type DipstickDataPropsType = {
  id?: number | string;
  name?: string;
  textResultForEdit?: string[];
  colorBrand: (
    | {
        color?: string | JSX.Element;
        title?: string;
        id?: number | string;
        subtitle?: undefined;
        subSubtitle?: undefined;
        unit?: string;
        firstUnit?: string;
        secondUnit?: string;
      }
    | {
        id?: number | string;
        color?: string | JSX.Element;
        title?: string;
        subtitle?: string;
        subSubtitle?: string;
        unit?: string;
        firstUnit?: string;
        secondUnit?: string;
      }
  )[];
  result?: {
    none: string;
  };
};
export type SortItem = {
  value: string;
  label: string;
  group: string;
};
export type PatientInsurerStatus = 'Paused' | 'Active' | 'Inactive' | 'Expired';
export type InsuranceInfo = {
  name?: string | null;
  type?: InsuranceProviderType;
  status?: PatientInsurerStatus;
  id?: number;
  isCustom?: boolean;
  isCreateInvoiceGeneralPriceEnabled?: boolean;
  isPayInvoiceGeneralPriceEnabled?: boolean;
  defaultPaymentType?: PaymentTypes;
  insuranceType: string,
  insuranceNumber: string,
  insuranceProvider: string,
};
export type PatientDetails = {
  patientId?: number;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  patientDisplayName?: string | null;
  patientImageUrl?: string | null;
  age?: string | null;
  gender?: string | null;
  hasInsurance?: boolean;
  ward?: string | null;
  wardBed?: string | null;
  patientCode?: string | null;
  lastModifiedTime?: string;
  creationTime?: string;
  emailAddress?: string | null;
  insuranceInfo?: InsuranceInfo[] | null;
  insuranceProviders?: InsuranceProviderDto[] | null;
};
