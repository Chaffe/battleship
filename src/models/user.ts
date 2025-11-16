import { IWSCurrentUser } from "../types/user";
import {generateId, parseMessage, stringifyMessage, validateUser} from "../utils";
import { IWSMessage, IWSRegRequest } from "../types/wsRequest";
import { users } from "../data";
import { updateRoom } from "./room";

export const addUser = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const userMessage = message as IWSRegRequest;
  const errorStatus = validateUser(userMessage);
  if (errorStatus.error) {
    console.error(errorStatus.errorText);
  }

  const addUserRequest: IWSMessage = {
    ...userMessage,
    data: {
      name: userMessage.data.name,
      index: generateId(),
      ...errorStatus,
    }
  };

  ws.name = addUserRequest.data.name;
  ws.index = addUserRequest.data.index;
  users.push(addUserRequest.data);
  ws.send(stringifyMessage(addUserRequest));

  updateRoom(ws, userMessage);
};