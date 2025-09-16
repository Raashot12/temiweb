import moment from 'moment-timezone';

export const momentBrowserTimezone = (time?: string, format?: string) =>
  time
    ? moment(time, format).tz('GMT').utcOffset(1)
    : moment().tz('GMT').utcOffset(1); // Server time is in GMT+1

export function truncateText(
  text: string,
  maxLength: number,
  mediaQuery: boolean | undefined
) {
  if (mediaQuery || text.length > maxLength) {
    if (text.length > maxLength) {
      const truncatedText = `${text.slice(0, maxLength)}...`;
      return truncatedText;
    }
  }
  return text;
}

export const getAgeByDateOfBirth = (dateOfBirth: string | null | undefined) => {
  const age = moment.duration(momentBrowserTimezone().diff(dateOfBirth));
  const years = age.years();
  const months = age.months();
  const days = age.days();
  const hours = age.hours();

  if (!dateOfBirth) return '';

  if (years > 0) return `${years}y`;

  if (years === 0 && months > 0) return `${months} m`;

  if (months === 0 && days > 0)
    return days > 1 ? `${days} days` : `${days} day`;

  const currentHour = momentBrowserTimezone().hours();

  return currentHour - hours > 1
    ? `${currentHour - hours} hrs`
    : `${currentHour - hours} hr`;
};

export const genderAbbreviations: Record<string, string> = {
  Male: 'M',
  Female: 'F',
};
export type NestedApiResponse = {
  error: {
    status: number;
    data: {
      result: null;
      targetUrl: null;
      success: boolean;
      error: {
        code: number;
        message: string;
        details: null;
        validationErrors: null;
      };
      unAuthorizedRequest: boolean;
      __abp: boolean;
    };
  };
};