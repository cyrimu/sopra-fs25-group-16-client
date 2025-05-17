import { useErrorModal } from "@/context/ErrorModalContext";
import {
  selectLobbyStatus,
  restartLobby,
  selectLobbyError,
} from "@/lib/features/lobby";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLobbyErrorHandler = () => {
  const { showError } = useErrorModal();

  const dispatch = useDispatch<AppDispatch>();
  const lobbyStatus = useSelector(selectLobbyStatus);
  const lobbyErrorString = useSelector(selectLobbyError);

  useEffect(() => {
    if (lobbyStatus === "failed" && lobbyErrorString) {
      // Display the error that is stored inside the provider
      showError(lobbyErrorString);
      // Restart the lobby and let the users try again
      dispatch(restartLobby());
    }
  }, [dispatch, lobbyStatus, lobbyErrorString]);
};
