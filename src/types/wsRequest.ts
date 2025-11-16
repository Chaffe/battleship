import { IUser } from "./user";
import { IRoom } from "./room";
import {IShip} from "./game";

export type IWSMessage = IWSRegRequest | IUpdateRoomRequest | IAttackRequest | IAddUserToRoomRequest | IStartGameRequest | IAttackWSRequest;

export interface IWSRequest {
  type: string;
  id: number;
}

export interface IWSRegRequest extends IWSRequest {
  data: IUser;
}

export interface IUpdateRoomRequest extends IWSRequest {
  data: IRoom[];
  indexRoom: string;
}

export interface IAddUserToRoomRequest extends IWSRequest {
  data: { indexRoom: number };
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IAttackPosition extends IPosition {
  indexPlayer: number;
}

interface IAttackData {
  position: IPosition;
  currentPlayer: number|string;
  status: "miss"|"killed"|"shot";
}

export interface IAttackRequest extends IWSRequest {
  data: IAttackData;
}

export interface IStartGameRequest extends IWSRequest {
  data: { ships: IShip[] };
}

export interface IAttackWSRequest extends IWSRequest {
  data: IAttackPosition;
}