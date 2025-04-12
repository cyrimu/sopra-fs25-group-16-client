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
