import { selectLobbyId } from "@/lib/features/lobby";
import { LOBBY_KEY } from "@/lib/features/lobby/lobby.types";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLobbyWsConnect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lobbyId = useSelector(selectLobbyId);

  useEffect(() => {
    if (lobbyId) {
      // Infinite loop until the connection is established
      dispatch({
        type: "lobby/connect",
        payload: lobbyId,
      });
    }
  }, [dispatch, lobbyId]);
};

// eslint-disable-next-line react-hooks/exhaustive-deps
export function disconnectLobby(dispatch: AppDispatch) {
  // Disconnect websocket
  dispatch({
    type: "lobby/disconnect",
  });
}

export function cleanLobbyLocalStorage(localStorage: Storage) {
  // Clean the stored lobby
  localStorage.removeItem(LOBBY_KEY);
}
