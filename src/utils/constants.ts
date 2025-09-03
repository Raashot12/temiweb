import { NavbarType, StatusColors } from '../types';

export const DEFAULT_API_ERROR_MESSAGE = 'An error occurred kindly try again';

export const MAX_RESULT_PER_PAGE = 20;

export const MOBILE_BREAKPOINT = '48rem';
export const ONBOARDING_SIDEBAR: NavbarType[] = [
  {
    id: 1,
    name: 'Pharmacy and outlet details',
    path: '/onboarding/insurer-details', // existing page in your app
    completed: false,
    active: true,
    tenantOnboardingStatus: 'InProgress',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Invite team members',
    path: '/onboarding/invite-team',
    completed: false,
    active: false,
    tenantOnboardingStatus: 'NotStarted',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Review details',
    path: '/onboarding/review-details',
    completed: false,
    active: false,
    tenantOnboardingStatus: 'NotStarted',
    status: 'Pending',
  },
];

export const statusColors: StatusColors = {
  'In Stock': { bg: '#E2F8EB', color: '#27AE60', text: 'In stock' },
  Supplied: {
    bg: '#E2F8EB',
    color: '#27AE60',
    text: 'Supplied',
    border: '#27AE60',
  },
  CheckedIn: { bg: '#E2F8EB', color: '#27AE60', text: 'CHECKED-IN' },
  Paid: { bg: '#E2F8EB', color: '#27AE60', text: 'default' },
  'Registration fee not paid': {
    bg: '#FFDBDB',
    color: '#FF4D4D',
    text: 'Registration fee not paid',
  },
  "Unpaid": { bg: '#FFDBDB', color: '#FF4D4D', text: 'Unpaid' },
  Scheduled: { bg: '#F5E5F4', color: '#AF40A4', text: 'Invoiced' },
  'Not scheduled': { bg: '#FFDBDB', color: '#FF4D4D', text: 'Not scheduled' },
  'Supplied on credit': {
    bg: '#E2F8EB',
    color: '#27AE60',
    text: 'Supplied on credit',
    border: '#27AE60',
  },
  'On credit': { bg: '#F5E5F4', color: '#AF40A4', text: 'On credit' },
  'Yet to be supplied': {
    bg: '#FFDBDB',
    color: '#FF4D4D',
    text: 'Yet to be supplied',
  },
  default: { bg: '#E2F8EB', color: '#27AE60', text: 'default' },
};
export const BLOOD_GENOTYPE = ['AA', 'AS', 'AC', 'SS', 'SC'] as const;
export const BLOOD_GROUP = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
] as const;

export const MARITAL_STATUS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Separated',
] as const;
export const RELIGION = [
  'Christianity',
  'Islam',
  'African Traditional Religion',
  'Agnosticism',
  'Atheism',
  'Babism',
  'Bahai Faith',
  'Buddhism',
  'Caodaism',
  'Cheondogyo',
  'Confucianism',
  'Daejongism',
  'Druze',
  'Hinduism',
  'Jainism',
  'Judaism',
  'Mandaeism',
  'Rastafarianism',
  'Ryukuan Religion',
  'Shamanism',
  'Shintoism',
  'Shugendo',
  'Sikhism',
  'Taoism',
  'Yarsanism',
  'Yazdanism',
  'Zoroastrianism',
] as const;
export const TITLES = [
  'Mr',
  'Mrs',
  'Miss',
  'Ms',
  'Dr',
  'Prof',
  'Hon',
  'Rev',
  'Pr',
  'Fr',
  'Other',
] as const;
export const IDENTIFICATION_TYPE = [
  'StateIdCard',
  'StateDriverLicense',
  'MilitaryIdCard',
  'SocialSecurityCard',
  'BirthCertificate',
  'VoterRegistrationCard',
] as const;

export const RELATIONSHIP = [
  'Husband',
  'Wife',
  'Father',
  'Mother',
  'Step_Father',
  'Step_Mother',
  'Son',
  'Daughter',
  'Step_Son',
  'Step_Daughter',
  'Brother',
  'Sister',
  'GrandParent',
  'GrandFather',
  'GrandMother',
  'GrandSon',
  'GrandDaughter',
  'Uncle',
  'Aunt',
  'Cousin',
  'Nephew',
  'Niece',
  'Father_In_Law',
  'Mother_In_Law',
  'Brother_In_Law',
  'Sister_In_Law',
  'Son_In_Law',
  'Daughter_In_Law',
  'Friend',
  'BoyFriend',
  'GirlFriend',
] as const;

export const FACILITY_TYPES = {
  Facility: 'Facility',
  Department: 'Department',
  Unit: 'Unit',
  Clinic: 'Clinic',
} as const;