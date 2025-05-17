import { restartGame, selectGameId, selectWinner } from "@/lib/features/game";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { disconnectGame, cleanGameLocalStorage } from "./useGameWsConnect";
import { AppDispatch } from "@/lib/store";

export const useGameWinner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const winner = useSelector(selectWinner);
  const gameId = useSelector(selectGameId);
  const router = useRouter();

  useEffect(() => {
    if (winner) {
      // Restart the game inside the provider
      dispatch(restartGame());
      // Disconnect the game from the WS
      disconnectGame(dispatch);
      // Clean the persisten game from the local storage
      cleanGameLocalStorage(localStorage);
      router.push(`/results/${gameId}`);
    }
  }, [winner]);
};
