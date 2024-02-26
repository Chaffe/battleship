import { WebSocket } from "ws";
import { games, rooms, users } from "../data";
import { stringifyMessage } from "../utils";
import { IUpdateRoomRequest } from "../interface/IWSRequest";
import { IWSCurrentUser } from "../interface/user";
import { IRoom } from "../interface/room";
import { wss } from "../http_server";

export const createRoom = (ws: IWSCurrentUser): void => {
  const newRoom: IRoom = {
    roomId: Date.now(),
    roomUsers: [{ name: ws.name, index: ws.index }],
  };

  rooms.push(newRoom);
};

export const updateRoom = (ws: IWSCurrentUser, message: any): void => {
  const updateRoomRequest: IUpdateRoomRequest = {
    ...message,
    type: 'update_room',
    data: rooms,
  }

  wss.clients.forEach(client => client.send(stringifyMessage(updateRoomRequest)));
};

export const addUserToRoom = (ws: IWSCurrentUser, message: any): void => {
  console.log('add_user_to_room')
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
