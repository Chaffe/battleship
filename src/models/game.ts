import {generateId, stringifyMessage} from "../utils";
import { users } from "../data";
import { IWSCurrentUser } from "../types/user";
import {IAttackRequest, IAttackWSRequest, IStartGameRequest, IWSMessage} from "../types/wsRequest";

export const startGame = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const gameMessage = message as IStartGameRequest;

  const startGameRequest = {
    ...gameMessage,
    type: 'start_game',
    data: {
      ships: gameMessage.data.ships,
      currentPlayerIndex: users[users.length -1].index,
    }
  };

  ws.send(stringifyMessage(startGameRequest));
};

export const attack = (ws: IWSCurrentUser, message: IWSMessage): void => {
  const gameMessage = message as IAttackWSRequest;

  const attackRequest: IAttackRequest = {
    ...message,
    data: {
      position: {
        x: gameMessage.data.x,
        y: gameMessage.data.y,
      },
      currentPlayer: gameMessage.data.indexPlayer,
      status: 'miss',
    }
  }

  ws.send(stringifyMessage(attackRequest));
}

export const singlePlay = (ws: IWSCurrentUser, message: IWSMessage): void => {
  console.log('single_play');
};