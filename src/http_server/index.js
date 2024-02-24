import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from "ws";
import { parseMessage } from "../utils/index.js";
import { addUser } from "../models/user.js";
import { singlePlay } from "../models/singlePlay.js";
import { createRoom } from "../models/room.js";
import { attack, createGame } from "../models/game.js";

export const httpServer = http.createServer(function (req, res) {
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
const wss = new WebSocketServer({ port: WEBSOCKET_PORT }, () => console.log(`Websocket started on ${WEBSOCKET_PORT}`));

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  console.log(`New client ${ws.name || 'Anonymous'} connected`);

  ws.on('message', function message(data) {
    const parsedMessage = parseMessage(data);
    // console.log(parsedMessage);

    switch (parsedMessage.type) {
      case 'reg':
        addUser(parsedMessage, ws);
        break;

      case 'create_room':
        createRoom(parsedMessage, ws);
        break;

      case 'add_ships':
        createGame(parsedMessage, ws);
        break;

      case 'attack':
        attack(parsedMessage, ws);
        break;

      case 'single_play':
        singlePlay(parsedMessage);
        break;
    }
  });

  // ws.on('close', () => {
  //   console.log(`Client ${ws.name} disconnected`);
  // });
});
