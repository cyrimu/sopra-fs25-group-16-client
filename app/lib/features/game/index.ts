import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game, TURN_ORDER } from "./game.types";
import { boardInitialState } from "./board.types";
import { Card } from "./card.types";
import {
  DEFAULT_GAME_TYPE,
  DEFAULT_LANGUAGE,
  DEFAULT_STARTING_TURN,
} from "@/constants";
import { Player } from "../player/player.types";
import { TEAM_COLOR } from "../lobby/team.types";

const initialState = {
  gameId: undefined,
  host: undefined,
  players: [],
  blueTeam: undefined, // Not possible to change during the game
  redTeam: undefined, // Not possible to change during the game
  board: boardInitialState,
  type: DEFAULT_GAME_TYPE, // Not possible to change during the game
  language: DEFAULT_LANGUAGE, // Not possible to change during the game
  turn: DEFAULT_STARTING_TURN,
  remainingGuesses: undefined,
  winner: undefined,
  mvp: undefined,
  log: [],
} satisfies Game as Game;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Update the state with the new game ID
    setGameId(state, action: PayloadAction<string>) {
      state.gameId = action.payload;
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
    // Set the turn order
    setTurn(state, action: PayloadAction<TURN_ORDER>) {
      state.turn = action.payload;
    },
    // Set the remaining guesses
    setRemainingGuesses(state, action: PayloadAction<number>) {
      state.remainingGuesses = action.payload;
    },
    // Set the winner
    setWinner(state, action: PayloadAction<TEAM_COLOR>) {
      state.winner = action.payload;
    },
    // Set the MVP
    setMvp(state, action: PayloadAction<Player>) {
      state.mvp = action.payload;
    },
    // Insert new card into the state
    insertCard(state, action: PayloadAction<Card>) {
      state.board.cards = [action.payload, ...state.board.cards];
    },
    // Update an existing card in the state
    updateCard(state, action: PayloadAction<Card>) {
      state.board.cards = state.board.cards.map((card) =>
        card.content === action.payload.content ? action.payload : card
      );
    },
    // Insert a new log entry
    insertLog(state, action: PayloadAction<string>) {
      state.log = [action.payload, ...state.log];
    },
  },
  selectors: {
    selectGameId: (state) => state.gameId,
    selectHost: (state) => state.host,
    selectPlayers: (state) => state.players,
    selectBlueTeam: (state) => state.blueTeam,
    selectRedTeam: (state) => state.redTeam,
    selectGameType: (state) => state.type,
    selectLanguage: (state) => state.language,
    selectTurn: (state) => state.turn,
    selectRemainingGuesses: (state) => state.remainingGuesses,
    selectWinner: (state) => state.winner,
    selectMvp: (state) => state.mvp,
    selectLog: (state) => state.log,
    selectCards: (state) => state.board.cards,
  },
});

export const { insertCard, updateCard } = gameSlice.actions;

export const { selectCards } = gameSlice.selectors;

export default gameSlice.reducer;
