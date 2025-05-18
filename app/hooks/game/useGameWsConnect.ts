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
      dispatch({
        type: "game/connect",
        payload: gameId,
      });
    }
  }, [dispatch, gameId]);
};

export function disconnectGame(dispatch: AppDispatch) {
  dispatch({
    type: "game/disconnect",
  });
}

export function cleanGameLocalStorage(localStorage: Storage) {
  localStorage.removeItem(GAME_KEY);
}