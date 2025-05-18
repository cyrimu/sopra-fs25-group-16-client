import { selectLobbyId, selectLobbyStatus } from "@/lib/features/lobby";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useLobbySuccessHandler = (endpoint: string) => {
  const lobbyId = useSelector(selectLobbyId);
  const lobbyStatus = useSelector(selectLobbyStatus);
  const router = useRouter();

  useEffect(() => {
    if (lobbyStatus === "succeeded" && lobbyId)
      // Lobby status succeeded and redirect to the lobby
      router.push(`${endpoint}/${lobbyId}`);
  }, [endpoint, lobbyId, lobbyStatus, router]);
};
