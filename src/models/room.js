import { stringifyMessage } from "../utils/index.js";
import { users, rooms } from "../data/index.js";

export const createRoom = (message, ws) => {
  const createGameRequest = {
    ...message,
    type: "create_game",
    data: {
      idGame: Date.now(),
      idPlayer: users.at(-1).index,
    },
  };

  rooms.push(createGameRequest.data);
  ws.send(stringifyMessage(createGameRequest));
};
