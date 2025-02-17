import { number } from "yup";

export interface Prediction {
  description: string;
  place_id: string;
}

export interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
