import { IWSMessage } from "./IWSRequest";
import { IShip } from "./ship";

export interface IWSRegData {
  name: string;
  password: string;
}

interface IRoom {
  indexRoom: number|string;
}

interface IAddShipData {
  gameId: number|string;
  ships: IShip[];
}

interface IAttackData {
  gameId: number|string;
  x: number;
  y: number;
  indexPlayer: number|string;
}

interface IRandomAttackData {
  gameId: number|string;
  indexPlayer: number|string;
}

export interface IWSRegResponse extends IWSMessage {
  data: IWSRegData;
}

export interface IWSCreateRoomResponse extends IWSMessage {
  data: string;
}

export interface IWSAddUserToRoomResponse extends IWSMessage {
  data: IRoom;
}

export interface IWSAddShipsResponse extends IWSMessage {
  data: IAddShipData;
}

export interface IWSAttackResponse extends IWSMessage {
  data: IAttackData;
}

export interface IWSRandomAttackResponse extends IWSMessage {
  data: IRandomAttackData;
}
