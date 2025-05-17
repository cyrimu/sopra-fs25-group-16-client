import { TEAM_COLOR } from "../game/team.types";

export interface Player {
  playerName: string;
  role: PLAYER_ROLES | undefined;
  team: TEAM_COLOR | undefined;
}

export enum PLAYER_ROLES {
  BLUE_SPYMASTER = "BLUE_SPYMASTER",
  RED_SPYMASTER = "RED_SPYMASTER",
  BLUE_OPERATIVE = "BLUE_OPERATIVE",
  RED_OPERATIVE = "RED_OPERATIVE",
}

export const USERNAME_KEY = "USERNAME_KEY";

export function playerRoleToTeamColor(playerRole: PLAYER_ROLES): TEAM_COLOR {
  const color = playerRole.split("_")[0];
  return TEAM_COLOR[color as keyof typeof TEAM_COLOR];
}
