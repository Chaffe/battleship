import { IWSCurrentUser } from "../types/user";
import { IRoom } from "../types/room";
import { generateId, stringifyMessage } from "../utils";
import {games, rooms} from "../data";
import {IAddUserToRoomRequest, IUpdateRoomRequest, IWSMessage} from "../types/wsRequest";
import { wss } from "../http_server";
import {IGame} from "../types/game";

export const createRoom = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const newRoom: IRoom = {
    roomId: generateId(),
    roomUsers: [{ name: ws.name, index: ws.index }],
  };

  rooms.push(newRoom);

  updateRoom(ws, message);
};

export const updateRoom = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const roomMessage = message as IUpdateRoomRequest;

  const updateRoomRequest: IUpdateRoomRequest = {
    ...roomMessage,
    type: 'update_room',
    data: rooms,
  }

  wss.clients.forEach(client => client.send(stringifyMessage(updateRoomRequest)));
};

export const addUserToRoom = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const roomMessage = message as IAddUserToRoomRequest;
  const roomIndex = rooms.findIndex((room) => room.roomId === roomMessage.data.indexRoom);
  wss.clients.forEach((client) => {
    const foundUser = rooms[roomIndex].roomUsers.find(
      (user) => (client as IWSCurrentUser).index === user.index,
    );
    if (foundUser) {
      client.send(addUserToRoomRequest(client as IWSCurrentUser, roomMessage, roomMessage.data.indexRoom));
      ws.send(addUserToRoomRequest(ws, roomMessage, roomMessage.data.indexRoom));
    }
  });
  removeFullRoom(roomMessage.data.indexRoom);
  updateRoom(ws, message);
}

export const addUserToRoomRequest = (ws: IWSCurrentUser, message: IWSMessage, roomIndex: number) => {
  const targetRoomIndex = rooms.findIndex((room) => room.roomId === roomIndex);
  if (targetRoomIndex === -1) {
    console.error(`Target room with index ${roomIndex} is not defined`);
    return;
  }

  rooms[targetRoomIndex].roomUsers.push({ name: ws.name, index: +ws.index });

  const createGameRequest = {
    ...message,
    type: "create_game",
    data: {
      idGame: rooms[targetRoomIndex].roomId,
      idPlayer: +ws.index,
    },
  };

  return stringifyMessage(createGameRequest);
};

export const removeFullRoom = (index: number): void => {
  const roomIndex = rooms.findIndex((room) => room.roomId === index);
  if (!roomIndex) {
    console.error(`Target room with index ${roomIndex} is not defined`);
    return;
  }

  if (index !== -1) {
    const currentGame: IGame = { gameId: String(index), users: [] };
    rooms.splice(roomIndex, 1);
    games.push(currentGame);
  }
}