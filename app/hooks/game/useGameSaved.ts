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
      dispatch(restartGame());
      disconnectGame(dispatch);
      router.back();
    }
  }, [dispatch, gameIsSaved, router]);
};
