export interface UserDetailsType {

  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  address: {
    city: string;
    number: string;
  };
  phone?: string;
}

export interface LoginType {
  username: string;
  password: string;
}
