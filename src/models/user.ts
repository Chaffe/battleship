import { WebSocket } from "ws";
import { stringifyMessage } from "../utils";
import { users } from "../data";
import {IWSRegRequest, IWSUpdateWinnersRequest} from "../interface/IWSRequest";
import { IWSRegResponse } from '../interface/IWSResponse';

export const addUser = (ws: WebSocket, message: any): void => {
  const addUserRequest: IWSRegRequest = {
    ...message,
    data: {
      name: message.data.name,
      index: Date.now(),
      error: false,
      errorText: ''
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
