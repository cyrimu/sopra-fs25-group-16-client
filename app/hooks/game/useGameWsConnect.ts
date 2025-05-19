import { selectGameId } from "@/lib/features/game";
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
