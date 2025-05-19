import { selectGameId } from "@/lib/features/game";
import { useGameStarting } from "@/context/GameStartingContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectStartGame, setStartGame } from "@/lib/features/flags";

export const useGameSucessHandler = () => {
  const router = useRouter();
  const { setGameStarting } = useGameStarting();
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(selectGameId);
  const startGame = useSelector(selectStartGame);

  useEffect(() => {
    if (startGame) {
      // Set the starting game first to true
      setGameStarting(true);
      // Navigate to the actual game screen
      router.push(`/game/${gameId}`);

      setTimeout(() => {
        // After 3 seconds hide the popup
        setGameStarting(false);
        dispatch(setStartGame(false));
      }, 3000);
    }
  }, [dispatch, startGame, gameId, router, setGameStarting]);
};
