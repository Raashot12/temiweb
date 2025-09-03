export const SORT_DATA = [
  {
    group: 'Patient name',
    items: [
      { value: 'fullName', label: 'Patient name: A-Z' },
      { value: 'fullName desc', label: 'Patient name: Z-A' },
    ],
  },
  {
    group: 'Patient No',
    items: [
      { value: 'patientCode', label: 'Patient No: Ascending' },
      { value: 'patientCode desc', label: 'Patient No: Descending' },
    ],
  },
  {
    group: 'Gender',
    items: [
      { value: 'gender desc', label: 'Gender: Male' },
      { value: 'gender', label: 'Gender: Female' },
      { value: 'gender Other', label: 'Gender: Other' },
    ],
  },
  {
    group: 'Age',
    items: [
      { value: 'dateOfBirth desc', label: 'Age: Youngest' },
      { value: 'dateOfBirth', label: 'Age: Oldest' },
    ],
  },
  {
    group: 'Time/Date',
    items: [
      { value: 'dateTime', label: 'Time/Date: Earliest' },
      { value: 'dateTime desc', label: 'Time/Date: Latest' },
    ],
  },
  {
    group: 'Status',
    items: [
      { value: 'appointmentStatus', label: 'Status: A-Z' },
      { value: 'appointmentStatus desc', label: 'Status: Z-A' },
    ],
  },
];