import { selectReturnLobby, setReturnLobby } from "@/lib/features/flags";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";
import { selectLobbyId } from "@/lib/features/lobby";

export const useResultReturnLobby = () => {
  const returnLobby = useSelector(selectReturnLobby);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const lobbyId = useSelector(selectLobbyId);

  useEffect(() => {
    if (returnLobby) {
      router.push(`/lobby/${lobbyId}`);
      // Clear flag after redirect
      dispatch(setReturnLobby(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router, returnLobby, lobbyId]);
};
