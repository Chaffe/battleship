import { IUser } from "./user";
import { IRoom } from "./room";

export interface IWSMessage {
  type: string;
  id: number
}

export interface IWSRegRequest extends IWSMessage {
  data: IUser;
}

export interface IUpdateRoomRequest extends IWSMessage {
  data: IRoom[];
}