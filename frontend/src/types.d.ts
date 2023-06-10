export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  role: string;
  phoneNumber: string;
  status?: string;
  cashback?: string;
  favorites: string[];
  isVerified: boolean;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation extends LoginMutation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface GlobalSuccess {
  message: {
    ru: string;
    en: string;
  };
}

export interface CabinetState {
  [key: string]: boolean;
}

export interface SummaryToServer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  education: string;
  educationalInstitution: string;
  startDate: string;
  expirationDate: string;
  desc: string;
  jobTitle: string;
  experience: number;
  region: string;
}

export interface SummaryOnServer extends SummaryToServer {
  _id: string;
  user: string;
}

export interface VacanciesToServer {
  nameOrganisation: string;
  requirements: string;
  vacancyDesc: string;
  vacancyName: string;
  salariesFrom: Number;
  salariesTo: Number;
  region: string;
}

export interface VacanciesOnServer extends VacanciesToServer {
  _id: string;
  user: string;
}


export interface SearchType {
  experience?: number | null;
  region: string | null;
  salary?: {
    salariesFrom: Number | null,
    salariesTo: Number | null,
  };
}




