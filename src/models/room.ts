import { WebSocket } from "ws";
import { games, rooms, users } from "../data";
import { stringifyMessage } from "../utils";
import { IUpdateRoomRequest } from "../interface/IWSRequest";

export const updateRoom = (ws: WebSocket, message: any): void => {
  const newRoom: any = {
    roomId: Date.now(),
    roomUsers: users,
  }

  rooms.push(newRoom);

  const updateRoomRequest: IUpdateRoomRequest = {
    ...message,
    type: 'update_room',
    data: rooms,
  }

  // console.log('updateRoomRequest', updateRoomRequest);

  ws.send(stringifyMessage(updateRoomRequest));
};

export const createGame = (ws: WebSocket, message: any): void => {
  const createGameRequest = {
    ...message,
    type: "create_game",
    data: {
      idGame: Date.now(),
      idPlayer: users.at(-1)?.index,
    },
  };

  games.push(createGameRequest.data);
  ws.send(stringifyMessage(createGameRequest));
};
