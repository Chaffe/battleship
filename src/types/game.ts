import { IUser } from "./user";

export interface IShip {
  position: { x: number; y: number };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
  hits: number[];
}

export interface IGame {
  gameId: string;
  players?: { [index: string]: { name: string; ships: IShip[]; board: string[][] } };
  currentPlayer?: string;
  users?: IUser[];
}
