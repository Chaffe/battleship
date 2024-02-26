import { WebSocket } from "ws";
import { validateUser, stringifyMessage} from "../utils";
import { users } from "../data";
import { IWSRegRequest, IWSUpdateWinnersRequest } from "../interface/IWSRequest";

export const addUser = (ws: WebSocket, message: any): void => {
  const { error, errorText } = validateUser(message);
  if (error) {
    console.error(errorText);
  }

  const addUserRequest: IWSRegRequest = {
    ...message,
    data: {
      name: message.data.name,
      index: Date.now(),
      error: error,
      errorText: errorText,
    }
  };

  users.push(addUserRequest.data);
  ws.send(stringifyMessage(addUserRequest));
};

export const updateWinners = (ws: WebSocket, message: any): void => {
  const winners = users.map((user) => {
    return ({
      name: user.name,
      wins: 0
    });
  });

  const updateWinnersRequest: IWSUpdateWinnersRequest = {
    ...message,
    type: 'update_winners',
    data: winners,
  };

  ws.send(stringifyMessage(updateWinnersRequest));
};
