import { IUser } from "./user";
import { IRoom } from "./room";
import { IPosition, IShip } from "./ship";

export interface IWSMessage {
  type: string;
  id: number
}

interface IWinner {
  name: string;
  wins: number;
}

interface ICreateGameData {
  idGame: number|string;
  idPlayer: number|string;
}

interface IStartGameData {
  ships: IShip[];
}

interface IAttackData {
  position: IPosition;
  currentPlayer: number|string;
  status: "miss"|"killed"|"shot";
}

interface ITurnData {
  currentPlayer: number|string;
}

interface IFinishData {
  winPlayer: number|string;
}

export interface IWSRegRequest extends IWSMessage {
  data: IUser;
}

export interface IWSUpdateWinnersRequest extends IWSMessage {
  data: IWinner[];
}

export interface ICreateGameRequest extends IWSMessage {
  data: ICreateGameData;
}

export interface IUpdateRoomRequest extends IWSMessage {
  data: IRoom[];
}

export interface IStartGameRequest extends IWSMessage {
  data: IStartGameData;
}

export interface IAttackRequest extends IWSMessage {
  data: IAttackData;
}

export interface ITurnRequest extends IWSMessage {
  data: ITurnData;
}

export interface IFinishRequest extends IWSMessage {
  data: IFinishData;
}
