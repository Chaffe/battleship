import { IWSCurrentUser } from "../types/user";
import {generateId, parseMessage, stringifyMessage, validateUser} from "../utils";
import { IWSRegRequest } from "../types/wsRequest";
import { users } from "../data";
import { updateRoom } from "./room";

export const addUser = (ws: IWSCurrentUser, message: any): void => {
  const errorStatus = validateUser(message);
  if (errorStatus.error) {
    console.error(errorStatus.errorText);
  }

  const addUserRequest: IWSRegRequest = {
    ...message,
    data: {
      name: message.data.name,
      index: generateId(),
      ...errorStatus,
    }
  };

  ws.name = addUserRequest.data.name;
  ws.index = addUserRequest.data.index;
  users.push(addUserRequest.data);
  ws.send(stringifyMessage(addUserRequest));

  updateRoom(ws, parseMessage);
};