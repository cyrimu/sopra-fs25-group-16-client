import { Player } from "../player/player.types";

export interface Team {
  spymaster: Player;
  operative: Player;
}

export enum TEAM_COLOR {
  blue,
  red,
}
