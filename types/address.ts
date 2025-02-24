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

export interface GoogleAdressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
