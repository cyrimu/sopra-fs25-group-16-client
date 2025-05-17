import { selectGameId } from "@/lib/features/game";
import { GAME_KEY } from "@/lib/features/game/game.types";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGameWsConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(selectGameId);

  useEffect(() => {
    if (gameId) {
      // Infinite loop until the connection is established
      dispatch({
        type: "game/connect",
        payload: { gameId: gameId },
      });
    }
  }, [dispatch, gameId]);
};

// eslint-disable-next-line react-hooks/exhaustive-deps
export function disconnectGame(dispatch: AppDispatch) {
  // Disconnect websocket
  dispatch({
    type: "game/disconnect",
  });
}

export function cleanGameLocalStorage(localStorage: Storage) {
  // Clean the stored game
  localStorage.removeItem(GAME_KEY);
}
