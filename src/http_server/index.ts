import * as fs from 'fs';
import * as path from 'path';
import http, { IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from "ws";
import { parseMessage } from "../utils";
import { addUser, singlePlay, createGame, startGame, attack, updateRoom, updateWinners } from "../models";
import {users} from "../data";

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

const WEBSOCKET_PORT = 3000;
const wss = new WebSocketServer(
  { port: WEBSOCKET_PORT },
  () => console.log(`Websocket started on ${WEBSOCKET_PORT}`)
);

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  console.log(`New client connected`);

  ws.on('message', function message(message: string) {
    const parsedMessage = parseMessage(message);
    console.log(parsedMessage);

    switch (parsedMessage.type) {
      case 'reg':
        addUser(ws, parsedMessage);
        // updateRoom(ws, parsedMessage);
        // updateWinners(ws, parsedMessage);
        // console.log('currentUsers', users);
        break;

      case 'create_room':
        createGame(ws, parsedMessage);
        break;

      case 'add_ships':
        startGame(ws, parsedMessage);
        break;

      case 'attack':
        attack(ws, parsedMessage);
        break;

      case 'single_play':
        singlePlay(ws, parsedMessage);
        break;
    }
  });

  // ws.on('close', () => {
  //   console.log(`Client ${ws.name} disconnected`);
  // });
});
