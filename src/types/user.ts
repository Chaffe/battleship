import { WebSocket } from "ws";

export interface IWSCurrentUser extends WebSocket {
  name: string;
  index: string;
}
