export interface ImgType {
  image: File | null;
}

export interface ApartmentMutation extends ApartmentData {
  hotelId: string;
  roomTypeId: string;
  images?: File[];
}

export interface ApartmentPopulated extends IApartment {
  hotelId: Hotel;
}

export interface IApartment extends ApartmentData {
  roomTypeId: {
    name: {
      ru: string;
      en: string;
    };
    _id: string;
  };
  hotelId: {
    name: string;
    userId: string;
    _id: string;
  };
  _id: string;
  images: string[];
}

export interface UpdateApartment {
  id: string;
  apartment: ApartmentMutation;
}

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
