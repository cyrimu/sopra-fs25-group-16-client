import { disconnectGame } from "./useGameWsConnect";
import { restartGame, selectSave } from "@/lib/features/game";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export const useGameSaved = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameIsSaved = useSelector(selectSave);
  const router = useRouter();

  useEffect(() => {
    if (gameIsSaved) {
      // Restart the game inside the provider
      dispatch(restartGame());
      // Disconnect the game from the WS
      disconnectGame(dispatch);
      // Clean the persisten game from the local storage
      // cleanGameLocalStorage(localStorage);
      router.back();
    }
  }, [dispatch, gameIsSaved, router]);
};
