import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "./game.types";
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
    // Restart the game status
    restartGame() {
      return initialState;
    },
    // Set a game
    setGame(state, action: PayloadAction<Game>) {
      const game = action.payload;
      state.game = {
        ...game,
        cards: game.cards.map((e, i) => ({ ...e, id: i, isSelected: false })),
      };
    },
    // Update the selected card state
    setSelectedCard(state, action: PayloadAction<number>) {
      const id = action.payload;

      if (state.game) {
        const isAlreadySelected = state.game.cards.some(
          (e) => e.id === id && e.isSelected
        );

        state.game.cards = state.game.cards.map((card) => {
          if (card.id === id && !card.isRevealed) {
            return { ...card, isSelected: !isAlreadySelected };
          } else {
            return { ...card, isSelected: false };
          }
        });
      }
    },
    // Notify users when a game is saved
    setSavedGame(state) {
      if (state.game) state.game.saved = true;
    },
  },
  selectors: {
    selectLogs: (state) => state.game?.log,
    selectGameId: (state) => state.game?.gameID,
    selectGameStatus: (state) => state.status,
    selectPlayers: (state) => state.game?.players,
    selectTurn: (state) => state.game?.turn,
    selectWinner: (state) => state.game?.winner,
    selectLog: (state) => state.game?.log,
    selectCards: (state) => state.game?.cards,
    selectSelectedCards: (state) =>
      state.game?.cards.filter(({ isSelected }) => isSelected),
    selectLastClue: (state) =>
      state.game?.log?.findLast((e) => e.includes("provided the Clue")),
    selectSave: (state) => state.game?.saved ?? false,
    selectGameTypeFromGame: (state) => state.game?.gameType,
    selectLanguageFromGame: (state) => state.game?.language,
  },
  extraReducers(builder) {
    builder
      .addCase(createGame.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.status = "succeeded";
        const game = action.payload;

        state.game = {
          ...game,
          cards: game.cards.map((e, i) => ({ ...e, id: i, isSelected: false })),
        };
      })
      .addCase(createGame.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.error);
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

export const { restartGame, setSelectedCard, setGame, setSavedGame } =
  gameSlice.actions;

export const {
  selectGameId,
  selectWinner,
  selectLogs,
  selectTurn,
  selectGameStatus,
  selectCards,
  selectSelectedCards,
  selectPlayers,
  selectLastClue,
  selectSave,
  selectGameTypeFromGame,
  selectLanguageFromGame,
} = gameSlice.selectors;

export default gameSlice.reducer;
