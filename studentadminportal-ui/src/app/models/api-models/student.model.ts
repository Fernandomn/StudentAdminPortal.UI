import { Address } from './address.model';
import { ApiGender } from './gender.model';

export interface ApiStudent {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  gender: ApiGender;
  address: Address;
}
