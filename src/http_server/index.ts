import * as fs from 'fs';
import * as path from 'path';
import http, { IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from "ws";
import { parseMessage } from "../utils";
import { IWSCurrentUser } from "../types/user";
import { WS_PORT } from "../consts";

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
      case 'reg':
        // reg
        break;

      case 'create_room':
        // create room
        break;

      case 'add_user_to_room':
        // add user to room
        break;

      case 'add_ships':
        // add ships
        break;

      case 'attack':
        // attack
        break;

      case 'single_play':
        // single play
        break;
    }
  });

  // ws.on('close', () => {
  //   console.log(`Client ${ws.name} disconnected`);
  // });
});
