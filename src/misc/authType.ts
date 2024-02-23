export interface UserDetailsType {
  email: string;
  username?: string;
  password?: string;
  name: {
    firstname: string;
    lastname: string;
  };

  address: {
    city: string;
    number: string;
    zipcode: string;
    geolocation?: {
      lat?: string;
      long?: string;
    };
  };
  phone?: string;
}

export interface LoginType {
  username: string;
  password: string;
}
