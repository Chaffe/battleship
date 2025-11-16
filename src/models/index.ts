import { IWSCurrentUser } from "../types/user";
import { stringifyMessage, validateUser } from "../utils";
import { IUpdateRoomRequest, IWSRegRequest } from "../types/wsRequest";
import { users, rooms } from "../data";
import {IRoom} from "../types/room";
import { wss } from "../http_server";

export const addUser = (ws: IWSCurrentUser, message: any): void => {
  const errorStatus = validateUser(message);
  if (errorStatus.error) {
    console.error(errorStatus.errorText);
  }

  const addUserRequest: IWSRegRequest = {
    ...message,
    data: {
      name: message.data.name,
      index: Date.now(),
      ...errorStatus,
    }
  };

  ws.name = addUserRequest.data.name;
  ws.index = addUserRequest.data.index;
  users.push(addUserRequest.data);
  ws.send(stringifyMessage(addUserRequest));
};

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