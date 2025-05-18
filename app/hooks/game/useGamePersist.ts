import { selectGameId } from "@/lib/features/game";
import { getGame } from "@/lib/features/game/api";
import { GAME_KEY } from "@/lib/features/game/game.types";
import { selectUsername, setUsername } from "@/lib/features/player";
import { USERNAME_KEY } from "@/lib/features/player/player.types";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGamePersist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const gameId = useSelector(selectGameId);
  const username = useSelector(selectUsername);

  useEffect(() => {
    // Save the initial state inside the local storage
    if (gameId) localStorage.setItem(GAME_KEY, gameId);
    if (username) localStorage.setItem(USERNAME_KEY, username);
  }, [gameId, username]);

  useEffect(() => {
    // Restore the state if the user reloads
    const storedGameId = localStorage.getItem(GAME_KEY);
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    if (storedGameId && storedUsername && !gameId) {
      // Restore the username
      dispatch(setUsername(storedUsername));
      // Fetch again the game
      dispatch(getGame({ gameId: storedGameId, username: storedUsername }));
    }
  }, [dispatch, gameId]);
};
