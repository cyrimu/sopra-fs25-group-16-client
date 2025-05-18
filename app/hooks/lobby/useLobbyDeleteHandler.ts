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
      dispatch(restartLobby());
      disconnectLobby(dispatch);
      cleanLobbyLocalStorage(localStorage);
      router.back();
    }
  }, [deleted, dispatch, router]);
};
