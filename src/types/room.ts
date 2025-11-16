export interface IRoomUser {
  name: string;
  index: number|string;
}

export interface IRoom {
  roomId: number|string;
  roomUsers: IRoomUser[];
}
