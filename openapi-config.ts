import type { ConfigFile } from '@rtk-query/codegen-openapi';
import { resolve } from 'uri-js';

const config: ConfigFile = {
  schemaFile: resolve(__filename, 'api.json'),
  apiFile: './src/state/services/baseApi.ts',
  apiImport: 'baseApi',
  outputFiles: {
    './src/state/services/accountApi.ts': {
      filterEndpoints: [/Account/i],
      exportName: 'accountApi',
      tag: true,
    },
    './src/state/services/enroleeApi.ts': {
      filterEndpoints: [/Enrolee/i],
      exportName: 'enroleeApi',
      tag: true,
    },
    './src/state/services/enrolmentPlanApi.ts': {
      filterEndpoints: [/EnrolmentPlan/i],
      exportName: 'enrolmentPlanApi',
      tag: true,
    },

    './src/state/services/tokenAuthApi.ts': {
      filterEndpoints: [/TokenAuth/i],
      exportName: 'tokenAuthApi',
      tag: true,
    },
    './src/state/services/providerApi.ts': {
      filterEndpoints: [/Provider/i],
      exportName: 'providerApi',
      tag: true,
    },
    './src/state/services/locationsApi.ts': {
      filterEndpoints: [/Locations/i],
      exportName: 'locationsApi',
      tag: true,
    },
    './src/state/services/enumsApi.ts': {
      filterEndpoints: [/Enums/i],
      exportName: 'enumsApi',
      tag: true,
    },
    './src/state/services/sessionApi.ts': {
      filterEndpoints: [/Session/i],
      exportName: 'sessionApi',
      tag: true,
    },
    './src/state/services/smsApi.ts': {
      filterEndpoints: [/Sms/i],
      exportName: 'smsApi',
      tag: true,
    },
    './src/state/services/industryApi.ts': {
      filterEndpoints: [/Industry/i],
      exportName: 'industryApi',
      tag: true,
    },
    './src/state/services/diseaseConditionsApi.ts': {
      filterEndpoints: [/DiseaseConditions/i],
      exportName: 'diseaseConditionsApi',
      tag: true,
    },
    './src/state/services/tiersApi.ts': {
      filterEndpoints: [/Tiers/i],
      exportName: 'tiersApi',
      tag: true,
    },
    './src/state/services/otpApi.ts': {
      filterEndpoints: [/OTP/i],
      exportName: 'otpApi',
      tag: true,
    },
    './src/state/services/enroleePaymentApi.ts': {
      filterEndpoints: [/EnroleePayment/i],
      exportName: 'enroleePaymentApi',
      tag: true,
    },
    './src/state/services/enroleeProfileApi.ts': {
      filterEndpoints: [/EnroleeProfile/i],
      exportName: 'enroleeProfileApi',
      tag: true,
    },
    './src/state/services/corporateMerchantApi.ts': {
      filterEndpoints: [/CorporateMerchant/i],
      exportName: 'corporateMerchantApi',
      tag: true,
    },
    './src/state/services/corporatePlanLimitApi.ts': {
      filterEndpoints: [/CorporatePlanLimit/i],
      exportName: 'corporatePlanLimitApi',
      tag: true,
    },
    './src/state/services/corporateJobTitleLevelApi.ts': {
      filterEndpoints: [/CorporateJobTitleLevel/i],
      exportName: 'corporateJobTitleLevelApi',
      tag: true,
    },
    './src/state/services/corporateJobTitleApi.ts': {
      filterEndpoints: [/CorporateJobTitle/i],
      exportName: 'corporateJobTitleApi',
      tag: true,
    },
  },
  hooks: true,
};

export default config;
