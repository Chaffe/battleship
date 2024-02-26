import { validateUser, stringifyMessage} from "../utils";
import { users } from "../data";
import { IWSRegRequest, IWSUpdateWinnersRequest } from "../interface/IWSRequest";
import { IWSCurrentUser } from "../interface/user";

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

export const updateWinners = (ws: IWSCurrentUser, message: any): void => {
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
