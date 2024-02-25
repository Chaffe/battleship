export interface IPosition {
  x: number;
  y: number;
}

export interface IShip {
  position: IPosition;
  direction: boolean;
  length: number;
  type: "small"|"medium"|"large"|"huge";
}
