import { useDispatch, useSelector } from "react-redux";
import { selectLobbyId } from "@/lib/features/lobby";
import { selectSaveGame, setSaveGame } from "@/lib/features/flags";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export const useGameSaved = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const lobbyId = useSelector(selectLobbyId);
  const saveGame = useSelector(selectSaveGame);

  useEffect(() => {
    if (saveGame) {
      router.push(`/lobby/${lobbyId}`);
      dispatch(setSaveGame(false));
    }
  }, [dispatch, saveGame, router, lobbyId]);
};
