import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "@/api/apiService";
import { Lobby } from "@/lib/features/lobby/lobby.types";

export const getLobbyResults = createAsyncThunk(
  "results/getLobbyResults",
  async ({ lobbyId, username }: { lobbyId: string; username: string }): Promise<Lobby> => {
    const response = await apiService.get<Lobby>(
      `/lobby/${lobbyId}?username=${username}`
    );
    return response;
  }
);