import { restartLobby, selectLobbyDeleted } from "@/lib/features/lobby";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disconnectLobby, cleanLobbyLocalStorage } from "./useLobbyWsConnect";

export const useLobbyDeleteHandler = () => {
  const deleted = useSelector(selectLobbyDeleted);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (deleted === true) {
      // Restart the lobby
      dispatch(restartLobby());
      // Disconnect the WS from the lobby
      disconnectLobby(dispatch);
      // Clean the lobby from the local storage
      cleanLobbyLocalStorage(localStorage);
      // Navigate to the previous screen
      router.back();
    }
  }, [deleted]);
};
