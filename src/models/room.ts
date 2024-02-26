import { games, rooms } from "../data";
import { stringifyMessage } from "../utils";
import { IUpdateRoomRequest } from "../interface/IWSRequest";
import { IWSCurrentUser } from "../interface/user";
import { IRoom } from "../interface/room";
import { wss } from "../http_server";

export const createRoom = (ws: IWSCurrentUser): void => {
  const newRoom: IRoom = {
    roomId: Date.now(),
    roomUsers: [{ name: ws.name, index: ws.index }],
  };

  rooms.push(newRoom);
};

export const updateRoom = (ws: IWSCurrentUser, message: any): void => {
  const updateRoomRequest: IUpdateRoomRequest = {
    ...message,
    type: 'update_room',
    data: rooms,
  }

  wss.clients.forEach(client => client.send(stringifyMessage(updateRoomRequest)));
};

export const addUserToRoom = (ws: IWSCurrentUser, message: any): void => {
  const roomIndex = rooms.findIndex((room) => room.roomId === message.data.indexRoom);
  wss.clients.forEach((client) => {
    const foundUser = rooms[roomIndex].roomUsers.find(
      (user) => (client as IWSCurrentUser).index === user.index,
    );
    if (foundUser) {
      client.send(addUserToRoomRequest(client as IWSCurrentUser, message, message.data.indexRoom));
      ws.send(addUserToRoomRequest(ws, message, message.data.indexRoom));
    }
  });
  removeFullRoom(message.data.indexRoom);
  updateRoom(ws, message);
}

export const addUserToRoomRequest = (ws: IWSCurrentUser, message: any, roomIndex: number) => {
  const targetRoomIndex = rooms.findIndex((room) => room.roomId === roomIndex);
  if (targetRoomIndex === -1) {
    console.error(`Target room with index ${roomIndex} is not defined`);
    return;
  }

  rooms[targetRoomIndex].roomUsers.push({ name: ws.name, index: +ws.index });

  const createGameRequest = {
    ...message,
    type: "create_game",
    data: {
      idGame: rooms[targetRoomIndex].roomId,
      idPlayer: +ws.index,
    },
  };

  return stringifyMessage(createGameRequest);
};

export const removeFullRoom = (index: number): void => {
  const roomIndex = rooms.findIndex((room) => room.roomId === index);
  if (!roomIndex) {
    console.error(`Target room with index ${roomIndex} is not defined`);
    return;
  }

  if (index !== -1) {
    const currentGame: any = { gameId: index, users: [] };
    rooms.splice(roomIndex, 1);
    games.push(currentGame);
  }
}
