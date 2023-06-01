import { ObjectId } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  status: string;
  cashback: number;
  token: string;
  favorites: ObjectId[];
  googleId?: string;
  isVerified: boolean;
  verificationToken: string | null;
}
