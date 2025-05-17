"use client";
import { useGameWsConnect } from "../hooks/game/useGameWsConnect"
import { useLobbyWsConnect } from "../hooks/lobby/useLobbyWsConnect"

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  useGameWsConnect();
  useLobbyWsConnect();

  return <>{children}</>;
};
