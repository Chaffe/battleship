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

export interface IPosition {
  x: number;
  y: number;
}

interface IAttackData {
  position: IPosition;
  currentPlayer: number|string;
  status: "miss"|"killed"|"shot";
}

export interface IAttackRequest extends IWSMessage {
  data: IAttackData;
}