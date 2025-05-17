import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";
import { Player } from "../player/player.types";
import { GAME_TYPE } from "../game/game.types";
import { LANGUAGES } from "./languages.types";
import {
  createLobby,
  deleteLobby,
  getLobby,
  joinLobby,
  leaveLobby,
} from "./api";

interface LobbyState {
  lobby: Lobby | undefined;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LobbyState = {
  lobby: undefined,
  status: "idle",
  error: null,
};

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    // Set an updated lobby object
    setLobby(state, action: PayloadAction<Lobby>) {
      const lobby = action.payload;

      if (state.lobby)
        // Preserve the state of players ready
        state.lobby = { ...lobby, playersReady: state.lobby.playersReady };
    },
    // Insert a new player into the state
    setPlayer(state, action: PayloadAction<Player>) {
      if (state.lobby) {
        const player = action.payload;
        // Update the playerName with a new team and role
        const players = state.lobby.players.filter((p) => p);

        state.lobby.players = players.map((p) => {
          if (p.playerName === player.playerName) {
            return {
              ...p,
              team: player.team,
              role: player.role,
            };
          }
          return p;
        });
      }
    },
    // Set the game type
    setGameType(state, action: PayloadAction<GAME_TYPE>) {
      if (state.lobby) state.lobby.gameType = action.payload;
    },
    // Set the language
    setLanguage(state, action: PayloadAction<LANGUAGES>) {
      if (state.lobby) state.lobby.language = action.payload;
    },
    // Delete lobby
    restartLobby() {
      return initialState;
    },
    // Set players ready
    setPlayersReady(state, action: PayloadAction<string[]>) {
      if (state.lobby) {
        state.lobby.playersReady = action.payload;
      }
    },
    // The host deleted the lobby
    setDeletedLobby(state) {
      if (state.lobby) state.lobby.deleted = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(createLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(getLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(getLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(joinLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(joinLobby.fulfilled, (state, action: PayloadAction<Lobby>) => {
        state.status = "succeeded";
        state.lobby = action.payload;
      })
      .addCase(joinLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(leaveLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(leaveLobby.fulfilled, () => initialState)
      .addCase(leaveLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
    builder
      .addCase(deleteLobby.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteLobby.fulfilled, () => initialState)
      .addCase(deleteLobby.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
  selectors: {
    selectLobby: (state) => state.lobby,
    selectLobbyError: (state) => state.error,
    selectLobbyId: (state) => state.lobby?.lobbyID,
    selectLobbyStatus: (state) => state.status,
    selectPlayers: (state) => state.lobby?.players,
    selectGameType: (state) => state.lobby?.gameType,
    selectLanguage: (state) => state.lobby?.language,
    selectLobbyDeleted: (state) => state.lobby?.deleted,
    selectPlayersReady: (state) => state.lobby?.playersReady,
  },
});

export const {
  setLobby,
  setPlayer,
  setGameType,
  setLanguage,
  restartLobby,
  setPlayersReady,
  setDeletedLobby,
} = lobbySlice.actions;

export const {
  selectLobby,
  selectLobbyId,
  selectLobbyError,
  selectLobbyStatus,
  selectPlayers,
  selectGameType,
  selectLanguage,
  selectLobbyDeleted,
  selectPlayersReady,
} = lobbySlice.selectors;

export default lobbySlice.reducer;
