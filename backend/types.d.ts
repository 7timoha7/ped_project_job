export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  token: string;
  googleId?: string;
  isVerified: boolean;
  verificationToken: string | null;
}
