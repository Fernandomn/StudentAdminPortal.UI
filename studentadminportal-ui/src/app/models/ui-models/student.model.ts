import { Address } from './address.model';
import { UiGender } from './gender.model';

export interface UiStudent {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  gender: UiGender;
  address: Address;
}
