import _ from 'lodash';
import { NestedApiResponse } from '@/utils/utils';

const HandleValidation = (
  res: NestedApiResponse,
  typeVal: string,
  showError: (title: string, message: string) => void
) => {
  const valType = _.capitalize(typeVal);
  if (res && 'error' in res && res.error && typeof res.error === 'object') {
    const errorMessage = (
      res.error as { data?: { error?: { message?: string } } }
    ).data?.error?.message;
    if (typeof errorMessage === 'string') {
      showError(`${valType}`, `${errorMessage}`);
    } else {
      showError(`${valType}`, `Error while saving ${valType}`);
    }
  }
};

export default HandleValidation;
