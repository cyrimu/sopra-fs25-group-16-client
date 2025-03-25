import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Lobby } from "./lobby.types";
import { DEFAULT_GAME_TYPE, DEFAULT_LANGUAGE } from "@/constants";
import { Player } from "../player/player.types";
import { Game, GAME_TYPE } from "../game/game.types";
import { LANGUAGES } from "./languages.types";
import { Team } from "./team.types";

const initialState = {
  lobbyId: undefined,
  host: undefined,
  players: [],
  game: undefined,
  type: DEFAULT_GAME_TYPE,
  language: DEFAULT_LANGUAGE,
  blueTeam: undefined,
  redTeam: undefined,
  connections: 0,
} satisfies Lobby as Lobby;

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    // Update the state with the new lobby ID
    setLobbyId(state, action: PayloadAction<string>) {
      state.lobbyId = action.payload;
    },
    // Update the state with the new host
    setHost(state, action: PayloadAction<string>) {
      state.host = action.payload;
    },
    // Insert a new player into the state
    insertPlayer(state, action: PayloadAction<Player>) {
      state.players = [...state.players, action.payload];
    },
    // Remove an existing player from the state
    removePlayer(state, action: PayloadAction<Player>) {
      state.players = state.players.filter(
        (player) => player !== action.payload
      );
    },
    // Once the game has started, update the state with the new game
    setGame(state, action: PayloadAction<Game>) {
      state.game = action.payload;
    },
    // Set the game type
    setGameType(state, action: PayloadAction<GAME_TYPE>) {
      state.type = action.payload;
    },
    // Set the language
    setLanguage(state, action: PayloadAction<LANGUAGES>) {
      state.language = action.payload;
    },
    // Set the blue team
    setBlueTeam(state, action: PayloadAction<Team>) {
      state.blueTeam = action.payload;
    },
    // Set the red team
    setRedTeam(state, action: PayloadAction<Team>) {
      state.redTeam = action.payload;
    },
    // Update the number of connected players
    updateConnections(state, action: PayloadAction<number>) {
      state.connections = action.payload;
    },
  },
  selectors: {
    selectLobbyId: (state) => state.lobbyId,
    selectHost: (state) => state.host,
    selectPlayers: (state) => state.players,
    selectGameType: (state) => state.type,
    selectLanguage: (state) => state.language,
    selectBlueTeam: (state) => state.blueTeam,
    selectRedTeam: (state) => state.redTeam,
    selectConnections: (state) => state.connections,
  },
});

export const {
  setLobbyId,
  setHost,
  insertPlayer,
  removePlayer,
  setGame,
  setGameType,
  setLanguage,
  setBlueTeam,
  setRedTeam,
  updateConnections,
} = lobbySlice.actions;

export const {
  selectLobbyId,
  selectHost,
  selectPlayers,
  selectGameType,
  selectLanguage,
  selectBlueTeam,
  selectRedTeam,
  selectConnections,
} = lobbySlice.selectors;

export default lobbySlice.reducer;
