export interface User {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
    telephone: string;
    address: string;
  };
}

export interface SignUpUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
}
