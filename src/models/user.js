import { stringifyMessage } from "../utils/index.js";
import { users } from "../data/index.js";

export const addUser = (message, ws) => {
  const addUserRequest = {
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
