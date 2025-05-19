import { useErrorModal } from "@/context/ErrorModalContext";
import { selectLobbyStatus, selectLobbyError } from "@/lib/features/lobby";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export const useLobbyErrorHandler = () => {
  const { showError } = useErrorModal();

  const dispatch = useDispatch<AppDispatch>();
  const lobbyStatus = useSelector(selectLobbyStatus);
  const lobbyErrorString = useSelector(selectLobbyError);

  useEffect(() => {
    if (lobbyStatus === "failed" && lobbyErrorString) {
      // Display the error that is stored inside the provider
      showError(lobbyErrorString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, lobbyStatus, lobbyErrorString]);
};
