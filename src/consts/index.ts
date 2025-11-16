export const HTTP_PORT = Number(process.env.HTTP_PORT || 8181);
export const WS_PORT = Number(process.env.WS_PORT || 3000);

export enum MessageTypes {
  REG = "reg",
  CREATE_ROOM = "create_room",
  ADD_USER_TO_ROOM = "add_user_to_room",
  ADD_SHIPS = "add_ships",
  ATTACK = "attack",
  SINGLE_PLAY = "single_play",
  UPDATE_ROOM = "update_room",
}