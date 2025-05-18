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
      dispatch({
        type: "lobby/connect",
        payload: lobbyId,
      });
    }
  }, [dispatch, lobbyId]);
};

export function disconnectLobby(dispatch: AppDispatch) {
  // Disconnect websocket
  dispatch({
    type: "lobby/disconnect",
  });
}

export function cleanLobbyLocalStorage(localStorage: Storage) {
  localStorage.removeItem(LOBBY_KEY);
}
