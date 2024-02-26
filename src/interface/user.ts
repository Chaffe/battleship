export interface IUserError {
  error: boolean;
  errorText: string;
}

export interface IUser {
  name: string;
  index: string;
  wins?: number;
  error: boolean;
  errorText: string;
}
