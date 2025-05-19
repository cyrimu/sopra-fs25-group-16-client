import { selectDeleteLobby, setDeleteLobby } from "@/lib/features/flags";
import { selectIsHostInLobby } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export const useLobbyDeleteHandler = () => {
  const deleteLobby = useSelector(selectDeleteLobby);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isHost = useSelector(selectIsHostInLobby);

  useEffect(() => {
    if (deleteLobby) {
      if (isHost) {
        // Navigate to the home page
        router.replace("/");
      } else {
        // Navigate to the join page
        router.replace("/join");
      }
      // Clear flag after redirect
      dispatch(setDeleteLobby(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router, deleteLobby]);
};
