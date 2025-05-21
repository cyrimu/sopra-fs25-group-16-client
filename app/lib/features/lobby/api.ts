import { ApiService } from "@/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";

export const createLobby = createAsyncThunk(
  "lobby/createLobby",
  async (username: string) => {
    const apiService = new ApiService();

    return await apiService.postForm<Lobby>("/lobby", {
      username: username,
    });
  }
);

export const updateLobby = createAsyncThunk(
  "lobby/updateLobby",
  async ({
    lobbyId,
    username,
    lobby,
  }: {
    lobbyId: string;
    username: string;
    lobby: Lobby;
  }) => {
    const apiService = new ApiService();

    return await apiService.put<Lobby>(
      `/lobby/${lobbyId}?username=${username}`,
      lobby
    );
  }
);

export const deleteLobby = createAsyncThunk(
  "lobby/deleteLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    return await apiService.delete(
      `/lobby/${lobbyId}/delete?username=${username}`,
      {
        username: username,
      }
    );
  }
);

export const joinLobby = createAsyncThunk(
  "lobby/joinLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    return await apiService.postForm<Lobby>(`/lobby/${lobbyId}/join`, {
      username: username,
    });
  }
);

export const leaveLobby = createAsyncThunk(
  "lobby/leaveLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    return await apiService.postForm<string>(`/lobby/${lobbyId}/leave`, {
      username: username,
    });
  }
);
