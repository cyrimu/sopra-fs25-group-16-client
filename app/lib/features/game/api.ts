import { apiService } from "@/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Game } from "./game.types";
import { Lobby } from "../lobby/lobby.types";

export const createGame = createAsyncThunk(
  "game/createGame",
  async ({ lobby, username }: { lobby: Lobby; username: string }) => {
    console.log(lobby);
    const response = await apiService.post<Game>(`/game?username=Alice`, {
      lobby,
    });
    return response;
  }
);

export const getGame = createAsyncThunk(
  "game/getGame",
  async ({ gameId, username }: { gameId: string; username: string }) => {
    const response = await apiService.get<Game>(
      `/game/${gameId}?username=${username}`
    );
    return response;
  }
);
