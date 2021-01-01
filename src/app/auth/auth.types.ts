export type SignUpForm = {
  username: string;
  password: string;
  email: string;
};

export type SignUpResponse = {
  username: string;
  balance: number;
};

export type SignInForm = {
  username: string;
  password: string;
};
