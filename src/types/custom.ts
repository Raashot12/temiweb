import { InvestigationResponseList } from './index';

// Extend InvestigationResponseList to include partialAmount property for partial payments
export interface ExtendedInvestigationResponseList extends InvestigationResponseList {
  partialAmount?: number;
}
export type FacilityDto = {
  name?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  phoneCode?: string | null;
  postCode?: string | null;
  level?: string | null;
  facilityGroup?: string | null;
  facilityType?: string | null;
  hasPharmacy?: boolean | null;
  hasLaboratory?: boolean | null;
  logoId?: string | null;
  brandTagName?: string | null;
  id?: number;
};