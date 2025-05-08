import { Address } from "./address";
import { Photo } from "./photo";

export interface Member {
  id: string;
  username: string;
  email: string;
  token: any;
  displayName: string;
  bio: string;
  dateOfBirth: string
  lastActive: string
  gender: string;
  interests: string;
  lookingFor: string;
  age: number;
  photoUrl: string;
  address: Address;
  photos: Photo[];
}
