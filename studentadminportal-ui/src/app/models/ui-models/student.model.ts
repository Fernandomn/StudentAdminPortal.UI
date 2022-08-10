import { Address } from './address.model';
import { Gender } from './gender.model';

export interface UiStudent {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genteder: Gender;
  address: Address;
}
