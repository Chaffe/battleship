import * as fs from 'fs';
import * as path from 'path';
import http, { IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from "ws";
import { parseMessage } from "../utils";
import { IWSCurrentUser } from "../types/user";
import { MessageTypes, WS_PORT } from "../consts";
import {
  addUser,
  createRoom,
  addUserToRoom,
  startGame,
  attack,
  singlePlay,
} from "../models";

export const httpServer = http.createServer(function (req: IncomingMessage, res: ServerResponse): void {
  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

export const wss = new WebSocketServer(
  { port: WS_PORT },
  () => console.log(`Websocket started on ${WS_PORT}`)
);

wss.on('connection', function connection(ws: IWSCurrentUser) {
  ws.on('error', console.error);
  console.log(`New client connected`);

  ws.on('message', function message(message: string) {
    const parsedMessage = parseMessage(message);
    console.log(parsedMessage);

    switch (parsedMessage.type) {
      case MessageTypes.REG:
        addUser(ws, parsedMessage);
        break;

      case MessageTypes.CREATE_ROOM:
        createRoom(ws, parsedMessage);
        break;

      case MessageTypes.ADD_USER_TO_ROOM:
        addUserToRoom(ws, parsedMessage);
        break;

      case MessageTypes.ADD_SHIPS:
        startGame(ws, parsedMessage);
        break;

      case MessageTypes.ATTACK:
        attack(ws, parsedMessage);
        break;

      case MessageTypes.SINGLE_PLAY:
        singlePlay(ws, parsedMessage);
        break;
    }
  });

  ws.on('close', () => {
    console.log(`Client ${ws.name || 'unknown'} disconnected`);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...');
  wss.clients.forEach(client => client.close());
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});
