import { ApiService } from "@/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Game } from "./game.types";
import { Lobby } from "../lobby/lobby.types";
import { TEAM_COLOR } from "./team.types";
import { PLAYER_ROLES } from "../player/player.types";
import { isProduction } from "../../../../utils/environment";

const production = isProduction();

export const createGame = createAsyncThunk(
  "game/createGame",
  async ({ lobby, username }: { lobby: Lobby; username: string }) => {
    const updatedLobby: Lobby = {
      ...lobby,
      players: [
        {
          role: PLAYER_ROLES.BLUE_SPYMASTER,
          playerName: username,
          team: TEAM_COLOR.BLUE,
        },
        {
          role: PLAYER_ROLES.RED_SPYMASTER,
          playerName: "Laura",
          team: TEAM_COLOR.RED,
        },
        {
          role: PLAYER_ROLES.RED_OPERATIVE,
          playerName: "Marta",
          team: TEAM_COLOR.RED,
        },
        {
          role: PLAYER_ROLES.BLUE_OPERATIVE,
          playerName: "Emma",
          team: TEAM_COLOR.BLUE,
        },
      ],
    };

    const apiService = new ApiService();

    const response = await apiService.post<Game>(
      `/game/${lobby.lobbyID}?username=${username}`,
      // production ? lobby : updatedLobby
      lobby
    );
    return response;
  }
);

export const getGame = createAsyncThunk(
  "game/getGame",
  async ({ gameId, username }: { gameId: string; username: string }) => {
    const apiService = new ApiService();

    const response = await apiService.get<Game>(
      `/game/${gameId}?username=${username}`
    );
    return response;
  }
);
