"use client";
import { selectGameStatus } from "@/lib/features/game";
import { selectLobbyStatus } from "@/lib/features/lobby";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LoaderContext = createContext<{ loading: boolean }>({ loading: false });

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const gameStatus = useSelector(selectGameStatus);
  const lobbyStatus = useSelector(selectLobbyStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(gameStatus === "pending" || lobbyStatus === "pending");
  }, [gameStatus, lobbyStatus]);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useGlobalLoader = () => useContext(LoaderContext);
