import { useEffect } from "react";
import { selectGameId, selectGameStatus } from "@/lib/features/game";
import { useDispatch, useSelector } from "react-redux";
import { useGameStarting } from "@/context/GameStartingContext";
import { AppDispatch } from "@/lib/store";
import { disconnectLobby } from "../lobby/useLobbyWsConnect";
import { useRouter } from "next/navigation";

export const useGameSucessHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const gameStatus = useSelector(selectGameStatus);
  const { setGameStarting } = useGameStarting();
  const gameId = useSelector(selectGameId);

  useEffect(() => {
    if (gameStatus === "succeeded") {
      setGameStarting(true);
      disconnectLobby(dispatch);
      router.push(`/game/${gameId}`);
      setTimeout(() => {
        setGameStarting(false);
      }, 3000);
    }
  }, [gameId, router, gameStatus, disconnectLobby]);
};
