import { apiService } from "@/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";

export const createLobby = createAsyncThunk(
  "lobby/createLobby",
  async (username: string) => {
    const response = apiService.postForm<Lobby>("/lobby", {
      username: username,
    });
    return response;
  }
);

export const getLobby = createAsyncThunk(
  "lobby/getLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const response = apiService.get<Lobby>(
      `/lobby/${lobbyId}?username=${username}`
    );
    return response;
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
    const response = apiService.put<Lobby>(
      `/lobby/${lobbyId}?username=${username}`,
      {
        username: username,
        lobby: lobby,
      }
    );
    return response;
  }
);

export const joinLobby = createAsyncThunk(
  "lobby/joinLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const response = apiService.postForm<Lobby>(`/lobby/${lobbyId}/join`, {
      username: username,
    });
    return response;
  }
);

export const leaveLobby = createAsyncThunk(
  "lobby/leaveLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const response = apiService.postForm<Lobby>(`/lobby/${lobbyId}/leave`, {
      username: username,
    });
    return response;
  }
);
