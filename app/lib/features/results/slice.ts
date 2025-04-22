import { createSlice } from "@reduxjs/toolkit";
import { Lobby } from "@/lib/features/lobby/lobby.types";
import { getLobbyResults } from "./api";

interface ResultsState {
  lobby: Lobby | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResultsState = {
  lobby: null,
  status: "idle",
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLobbyResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getLobbyResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lobby = action.payload;
        state.error = null;
      })
      .addCase(getLobbyResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default resultsSlice.reducer;