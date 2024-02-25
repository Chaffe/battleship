import { WebSocket } from "ws";
import { stringifyMessage } from "../utils";
import { users } from "../data";
import { IAttackRequest } from "../interface/IWSRequest";

export const startGame = (ws: WebSocket, message: any): void => {
  const startGameRequest = {
    ...message,
    type: 'start_game',
    data: {
      ships: message.data.ships,
      currentPlayerIndex: users.at(-1)?.index,
    }
  };

  ws.send(stringifyMessage(startGameRequest));
};

export const attack = (ws: WebSocket, message: any): void => {
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

export const singlePlay = (ws: WebSocket, message: any): void => {
  console.log('single_play');
};
