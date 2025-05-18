import { selectLobbyId } from "@/lib/features/lobby";
import { getLobby } from "@/lib/features/lobby/api";
import { LOBBY_KEY } from "@/lib/features/lobby/lobby.types";
import { selectUsername, setUsername } from "@/lib/features/player";
import { USERNAME_KEY } from "@/lib/features/player/player.types";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLobbyPersist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const lobbyId = useSelector(selectLobbyId);
  const username = useSelector(selectUsername);

  useEffect(() => {
    // Save to localStorage on changes
    if (lobbyId) localStorage.setItem(LOBBY_KEY, lobbyId);
    if (username) localStorage.setItem(USERNAME_KEY, username);
  }, [lobbyId, username]);

  useEffect(() => {
    // Restore if fresh load
    const storedLobbyId = localStorage.getItem(LOBBY_KEY);
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    if (storedLobbyId && storedUsername && !lobbyId) {
      // Restore the username
      dispatch(setUsername(storedUsername));
      // Fetch again the lobby
      dispatch(getLobby({ lobbyId: storedLobbyId, username: storedUsername }));
    }
  }, [dispatch, lobbyId]);
};
