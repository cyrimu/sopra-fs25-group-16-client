import { useEffect } from "react";
import { selectGameId, selectGameStatus } from "@/lib/features/game";
import { useDispatch, useSelector } from "react-redux";
import { useGameStarting } from "@/context/GameStartingContext";
import { AppDispatch } from "@/lib/store";
import { disconnectLobby } from "../lobby/useLobbyWsConnect";
import { useRouter } from "next/navigation";
import { GAME_KEY, WIN_KEY } from "@/lib/features/game/game.types";
import { restartLobby, selectLobbyId } from "@/lib/features/lobby";

export const useGameSucessHandler = () => {
  const router = useRouter();
  const { setGameStarting } = useGameStarting();
  const dispatch = useDispatch<AppDispatch>();
  const gameStatus = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);
  const lobbyId = useSelector(selectLobbyId);

  useEffect(() => {
    if (gameId && gameStatus === "succeeded") {
      // Store the lobbyId in case the players want to return back at the winning screen
      if (lobbyId) localStorage.setItem(WIN_KEY, lobbyId);
      // Store the new game id inside the local storage
      localStorage.setItem(GAME_KEY, gameId);
      // Set the starting game first to true
      setGameStarting(true);
      // Restart the lobby
      dispatch(restartLobby());
      // Disconnect the lobby
      disconnectLobby(dispatch);
      // Clean the lobby from the local storage
      // cleanLobbyLocalStorage(localStorage);
      // Navigate to the actual game screen
      router.push(`/game/${gameId}`);

      setTimeout(() => {
        // After 3 seconds hide the popup
        setGameStarting(false);
      }, 3000);
    }
  }, [gameId, gameStatus]);
};
