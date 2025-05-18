import { selectGameId, selectWinner } from "@/lib/features/game";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { disconnectGame } from "./useGameWsConnect";
import { AppDispatch } from "@/lib/store";

export const useGameWinner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const winner = useSelector(selectWinner);
  const gameId = useSelector(selectGameId);
  const router = useRouter();

  useEffect(() => {
    if (winner) {
      // Disconnect the game from the WS
      disconnectGame(dispatch);
      // Redirect to the results page
      router.push(`/results/${gameId}`);
    }
  }, [winner]);
};
