import { selectGameId } from "@/lib/features/game";
import { getGame } from "@/lib/features/game/api";
import { GAME_KEY } from "@/lib/features/game/game.types";
import { selectUsername, setUsername } from "@/lib/features/player";
import { USERNAME_KEY } from "@/lib/features/player/player.types";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";


export const useGamePersist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(selectGameId);
  const username = useSelector(selectUsername);

  const restored = useRef(false);

  useEffect(() => {
    if (gameId) localStorage.setItem(GAME_KEY, gameId);
    if (username) localStorage.setItem(USERNAME_KEY, username);
  }, [gameId, username]);

  useEffect(() => {
    if (restored.current) return;
    const storedGameId = localStorage.getItem(GAME_KEY);
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    if (storedGameId && storedUsername && !gameId) {
      restored.current = true;
      dispatch(setUsername(storedUsername));
      dispatch(getGame({ gameId: storedGameId, username: storedUsername }));
    }
  }, [dispatch, gameId]);
};