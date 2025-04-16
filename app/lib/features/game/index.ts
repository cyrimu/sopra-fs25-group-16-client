import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game, TURN_ORDER } from "./game.types";
import { Card } from "./card.types";
import { Player } from "../player/player.types";
import { TEAM_COLOR } from "../lobby/team.types";
import { createGame, getGame } from "./api";

interface GameState {
  game: Game | undefined;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GameState = {
  game: undefined,
  status: "idle",
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Set a game
    setGame(state, action: PayloadAction<Game>) {
      const game = action.payload;
      state.game = game;
    },
    // Insert a new player into the state
    setTurn(state, action: PayloadAction<TURN_ORDER>) {
      if (state.game) state.game.turn = action.payload;
    },
    // Set the remaining guesses
    setRemainingGuesses(state, action: PayloadAction<number>) {
      if (state.game) state.game.remainingGuesses = action.payload;
    },
    // Set the winner
    setWinner(state, action: PayloadAction<TEAM_COLOR>) {
      if (state.game) state.game.winner = action.payload;
    },
    // Set the MVP
    setMvp(state, action: PayloadAction<Player>) {
      if (state.game) state.game.mvp = action.payload;
    },
    // Update an existing card in the state
    setRevealedCard(state, action: PayloadAction<Card>) {
      const { id } = action.payload;
      if (state.game)
        state.game.board.cards = state.game.board.cards.map((e) =>
          e.id === id ? { ...e, isRevealed: true } : e
        );
    },
    setSelectedCard(state, action: PayloadAction<Card>) {
      const { id } = action.payload;
      if (state.game) {
        const isSelected = state.game.board.cards.some((c) => c.id === id);

        state.game.board.cards = state.game.board.cards.map((e) =>
          e.id === id ? { ...e, isSelected: !isSelected } : e
        );
      }
    },
    // Insert a new log entry
    insertLog(state, action: PayloadAction<string>) {
      if (state.game) state.game.log = [action.payload, ...state.game.log];
    },
  },
  selectors: {
    selectGameId: (state) => state.game?.gameID,
    selectGameStatus: (state) => state.status,
    selectPlayers: (state) => state.game?.players,
    selectGameType: (state) => state.game?.type,
    selectLanguage: (state) => state.game?.language,
    selectTurn: (state) => state.game?.turn,
    selectWinner: (state) => state.game?.winner,
    selectMvp: (state) => state.game?.mvp,
    selectLog: (state) => state.game?.log,
    selectCards: (state) => state.game?.board.cards,
    selectSelectedCards: (state) =>
      state.game?.board.cards.filter(({ isSelected }) => isSelected),
  },
  extraReducers(builder) {
    builder
      .addCase(createGame.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.status = "succeeded";
        state.game = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(getGame.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.status = "succeeded";
        state.game = action.payload;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.error);
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const { setRevealedCard, setSelectedCard } = gameSlice.actions;

export const {
  selectGameId,
  selectGameStatus,
  selectCards,
  selectSelectedCards,
} = gameSlice.selectors;

export default gameSlice.reducer;
