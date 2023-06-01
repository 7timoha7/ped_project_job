export interface HotelData {
  name: string;
  address: string;
  city: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  founding: number;
  lowestPrice: LowestPriceType;
  parking: boolean;
  petFriendly: boolean;
  swimmingPool: boolean;
  nonSmokingRooms: boolean;
  type: string;
}

export interface LowestPriceType {
  som: number;
  dollar: number;
}

export interface HotelMutation extends HotelData {
  star: string;
  image: File | null | string;
}

export interface Hotel extends HotelData {
  _id: string;
  userId: string;
  star: number;
  isPublished: boolean;
  image: string;
  founding: number;
  lowestPrice: {
    som: number;
    dollar: number;
  };
  status: string;
}

export interface HotelWithLabel extends Hotel {
  label: string;
}

export interface ApartmentData {
  price: {
    usd: number;
    kgs: number;
  };
  description: {
    ru: string;
    en: string;
  };
  AC: boolean;
  balcony: boolean;
  bath: boolean;
  petFriendly: boolean;
  food: boolean;
  place: number;
  tv: boolean;
  towel: boolean;
  wifi: boolean;
}

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

export interface SearchData {
  city: string;
  nonSmokingRooms: boolean;
  parking: boolean;
  swimmingPool: boolean;
  petFriendly: boolean;
  star: number | null;
  propertyType: string;
}

export interface OrderData {
  comment: string;
  personalTranslator: boolean;
  meetingAirport: boolean;
  tourManagement: boolean;
  eventManagement: boolean;
}

export interface OrderMutation extends OrderData {
  apartmentId: string;
  dateArrival: Date | null;
  dateDeparture: Date | null;
}

export interface OrderSend extends OrderData {
  apartmentId: string;
  dateArrival: string;
  dateDeparture: string;
}

export interface Order extends OrderData {
  adminId: User | null;
  apartmentId: ApartmentPopulated;
  createdAt: string;
  dateArrival: string;
  dateDeparture: string;
  status: 'open' | 'in progress' | 'closed';
  userId: User;
  _id: string;
}

export interface Comment {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  hotel: string;
  text: string;
  createdAt: string;
}

export interface CommentMutation {
  hotel: string;
  text: string;
}

export interface IRoomType {
  _id: string;
  name: {
    en: string;
    ru: string;
  };
}

export interface CabinetState {
  [key: string]: boolean;
}

export interface RoomTypesMutation {
  ru: string;
  en: string;
}

export interface BlockOnMainPage {
  name: string;
  link: string;
  lang: string;
}
