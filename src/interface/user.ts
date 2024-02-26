import { WebSocket } from "ws";

export interface IUserError {
  error: boolean;
  errorText: string;
}

export interface IWSCurrentUser extends WebSocket {
  name: string;
  index: string;
}

export interface IUser {
  name: string;
  index: string;
  wins?: number;
  error?: boolean;
  errorText?: string;
}
