import { stringifyMessage } from "../utils";
import { users } from "../data";
import { IWSCurrentUser } from "../types/user";
import { IAttackRequest } from "../types/wsRequest";

export const startGame = (ws: IWSCurrentUser, message: any): void => {
  const startGameRequest = {
    ...message,
    type: 'start_game',
    data: {
      ships: message.data.ships,
      currentPlayerIndex: users[users.length -1].index,
    }
  };

  ws.send(stringifyMessage(startGameRequest));
};

export const attack = (ws: IWSCurrentUser, message: any): void => {
  const attackRequest: IAttackRequest = {
    ...message,
    data: {
      position: {
        x: message.data.x,
        y: message.data.y,
      },
      currentPlayer: message.data.indexPlayer,
      status: 'miss',
    }
  }

  ws.send(stringifyMessage(attackRequest));
}

export const singlePlay = (ws: IWSCurrentUser, message: any): void => {
  console.log('single_play');
};