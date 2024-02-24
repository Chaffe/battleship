import { stringifyMessage } from "../utils/index.js";
import { users } from "../data/index.js";

export const createGame = (message, ws) => {
  const createGameRequest = {
    ...message,
    type: 'start_game',
    data: {
      ships: message.data.ships,
      currentPlayerIndex: users.at(-1).index,
    }
  };

  ws.send(stringifyMessage(createGameRequest));
};

export const attack = (message, ws) => {
  console.log('attack', message);
}
