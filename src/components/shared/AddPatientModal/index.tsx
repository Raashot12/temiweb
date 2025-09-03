import React, { useState } from 'react';
import {
  Modal,
  Flex,
  ScrollArea,
  Button,
  Text,
  Collapse,
  SelectProps,
} from '@mantine/core';
import { appColors } from '@/theme/colors';
import CloseIcon from '../IconComponents/IconClose';
import { useMediaQuery } from '@mantine/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import PersonalDetails from '@/app/(protected)/receiptionist/components/PersonalDetails';
import {
  addPatientSchema,
  AddPatientSchema,
} from '@/app/(protected)/receiptionist/components/schema';
import { useForm } from 'react-hook-form';
import {
  defaultGuardian,
  defaultIdentity,
  defaultNextOfKin,
  defaultPatientInsurance,
} from './DefaultRelation';
import AddNewPatientCollapseToggler from './AddNewPatientFormCollapseToggler';
import OtherPersonalDetails from './OtherPersonalDetails';
import { GuardianDetailsForm, NextOfKinForm } from './RelationsForm';
import IconArrowUpFilled from '../IconComponents/IconArrowUpFilled';
import IconArrowDownFilled from '../IconComponents/IconArrowDownFilled';
import { PatientInsuranceForm } from './PatientInsuranceForm';

export const addNewPatientFormDefaultValues: Omit<
  AddPatientSchema,
  'dateOfBirth'
> = {
  // patientCode: '',
  education: '',
  emailAddress: '',
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  genderType: '',
  stateOfOriginId: '',
  countryId: '',
  districtId: '',
  isNewToHospital: false,
  religion: undefined,
  maritalStatus: undefined,
  bloodGenotype: undefined,
  bloodGroup: undefined,
  nextOfKinForm: [defaultNextOfKin],
  // guardianForm: [defaultGuardian],
  // patientIdentities: [defaultIdentity],
  insuranceInformations: [defaultPatientInsurance],
};
const AddPatientModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const [openAdditionalDetails, setOpenAdditionalDetails] =
    useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const handleCloseAddPatientModal = () => onClose();
  const { control, formState, handleSubmit, reset, setValue } =
    useForm<AddPatientSchema>({
      defaultValues: { ...addNewPatientFormDefaultValues },
      resolver: zodResolver(addPatientSchema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });
  const occupationList: SelectProps['data'] = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'farmer', label: 'Farmer' },
    { value: 'trader', label: 'Trader' },
    { value: 'civil-servant', label: 'Civil Servant' },
    { value: 'self-employed', label: 'Self-employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
  ];
  const handleProceedToAddPatient = async (values: AddPatientSchema) => {
    try {
      setIsSaving(true);
      // TODO: Integrate API call to persist the patient record
      // await createPatientMutation(values).unwrap();

      // Reset form and close modal after successful save
      reset({ ...addNewPatientFormDefaultValues });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Modal
      size={'85vw'}
      fullScreen={isMobile}
      opened={opened}
      onClose={handleCloseAddPatientModal}
      closeOnClickOutside={false}
      withCloseButton={false}
      closeButtonProps={{ h: '2rem', w: '2rem', iconSize: '1rem' }}
      title={
        <Flex align="center" justify={'space-between'}>
          <Flex gap={3} direction={'column'}>
            <Text fw={700} c={appColors.black}>
              Add new patient
            </Text>
            <Text c={appColors.text} fw={500}>
              Fill in the patient information in the fields provided below
            </Text>
          </Flex>
          <CloseIcon handleClose={handleCloseAddPatientModal} />
        </Flex>
      }
      h={'100%'}
      yOffset="1vh"
      xOffset={0}
      centered
      styles={{
        header: {
          background: appColors.pageBackground,
          paddingTop: 24,
        },
        title: {
          flex: 1,
        },
        content: {
          background: appColors.pageBackground,
          padding: '0px 32px',
        },
        close: {
          borderRadius: '50%',
          background: appColors.halfFade,
          color: appColors.blue,
        },
      }}
    >
      <form
        noValidate
        onSubmit={handleSubmit(handleProceedToAddPatient)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
        }}
      >
        <ScrollArea h={'68vh'} offsetScrollbars type="hover">
          <Flex direction={'column'} gap="6px">
            {/* <PersonalInfo
              profilePictureId={''}
              title="Take patient's picture"
              onUploadProfilePicture={(uploadFile) =>
                setProfilePictureData(uploadFile)
              }
            >
              <Flex
                justify={'flex-end'}
                align={'flex-end'}
                direction={'column'}
              >
                <PatientExistBanner control={control} />
                <PatientCodeFormInput
                  control={control}
                  isPatientCodeAutogenerateActive={
                    isPatientCodeAutogenerateActive
                  }
                  setAutoGeneratedPatientCode={setAutoGeneratedPatientCode}
                  setManuallyEnteredPatientCode={setManuallyEnteredPatientCode}
                  openedConfirmDialog={openedConfirmDialog}
                />
              </Flex>
            </PersonalInfo> */}

            <PersonalDetails control={control} />

            <Flex direction={'column'} mb={isMobile ? 50 : 'none'}>
              <Flex
                data-cy="additional-details"
                onClick={() => setOpenAdditionalDetails((open) => !open)}
                bg={appColors.white}
                style={{ borderRadius: '10px', cursor: 'pointer' }}
                align={'center'}
                justify={'space-between'}
                mih="45px"
                px={'20px'}
              >
                <Text fw={700} c={appColors.black}>
                  Additional details
                </Text>
                {openAdditionalDetails ? (
                  <IconArrowUpFilled />
                ) : (
                  <IconArrowDownFilled />
                )}
              </Flex>

              <Collapse in={openAdditionalDetails}>
                <AddNewPatientCollapseToggler
                  title="Next of kin details"
                  data-cy="next-of-kin-details"
                >
                  <NextOfKinForm control={control} />
                </AddNewPatientCollapseToggler>
                <AddNewPatientCollapseToggler
                  title="Insurance provider details"
                  data-cy="insurance-provider-details"
                >
                  <PatientInsuranceForm
                    control={control}
                    handleInsuranceAdministratorName={(index, name) =>
                      setValue(
                        `insuranceInformations.${index}.insuranceAdministratorName`,
                        name,
                      )
                    }
                  />
                </AddNewPatientCollapseToggler>
                {/* <AddNewPatientCollapseToggler
                  title="Attach referral letter"
                  data-cy="add-reference-letter"
                >
                  <AttachReferralLetter
                    onSave={(data) => {
                      setReferralLetterData(data);
                    }}
                  />
                </AddNewPatientCollapseToggler> */}
              </Collapse>
            </Flex>
          </Flex>
        </ScrollArea>
        <Flex
          justify="flex-end"
          align="flex-end"
          gap={32}
          style={{ position: 'sticky', bottom: 0, flex: 1, paddingTop: 10 }}
        >
          <Button
            data-cy={'save-and-close-button'}
            h={'2.5rem'}
            variant="white"
            w={'125px'}
            px={2}
            type="submit"
            disabled={isSaving}
            loading={isSaving}
          >
            Save & close
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddPatientModal;
