import { selectLobbyId } from "@/lib/features/lobby";
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
