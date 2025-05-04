import { ApiService } from "@/api/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";

export const getLobby = async ({
  lobbyId,
  username,
}: {
  lobbyId: string;
  username: string;
}) => {
  const apiService = new ApiService();

  const response = await apiService.get<Lobby>(
    `/lobby/${lobbyId}?username=${username}`
  );
  return response;
};

export const createLobby = createAsyncThunk(
  "lobby/createLobby",
  async (username: string) => {
    const apiService = new ApiService();

    const response = await apiService.postForm<Lobby>("/lobby", {
      username: username,
    });
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
    const apiService = new ApiService();

    const response = await apiService.put<Lobby>(
      `/lobby/${lobbyId}?username=${username}`,
      lobby
    );
    return response;
  }
);

export const deleteLobby = createAsyncThunk(
  "lobby/deleteLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    const response = await apiService.delete(
      `/lobby/${lobbyId}/delete?username=${username}`,
      {
        username: username,
      }
    );
    return response;
  }
);

export const joinLobby = createAsyncThunk(
  "lobby/joinLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    const response = await apiService.postForm<Lobby>(
      `/lobby/${lobbyId}/join`,
      {
        username: username,
      }
    );
    return response;
  }
);

export const leaveLobby = createAsyncThunk(
  "lobby/leaveLobby",
  async ({ lobbyId, username }: { lobbyId: string; username: string }) => {
    const apiService = new ApiService();

    const response = await apiService.postForm(`/lobby/${lobbyId}/leave`, {
      username: username,
    });
    return response;
  }
);
