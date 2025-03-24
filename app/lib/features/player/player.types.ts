import { TEAM_COLOR } from "../lobby/team.types";

export interface Player {
  playerName: string | undefined;
  role: PLAYER_ROLES | undefined;
  team: TEAM_COLOR | undefined;
}

export enum PLAYER_ROLES {
  spymaster,
  operative,
}
