import { Player } from "../player/player.types";

export interface Team {
  spymaster: Player | undefined;
  operative: Player | undefined;
}

export enum TEAM_COLOR {
  blue = "blue",
  red = "red",
}
