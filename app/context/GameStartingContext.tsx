"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameStartingContextType {
  gameStarting: boolean;
  setGameStarting: (value: boolean) => void;
}

const GameStartingContext = createContext<GameStartingContextType | undefined>(
  undefined
);

export const GameStartingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameStarting, setGameStarting] = useState(false);

  return (
    <GameStartingContext.Provider value={{ gameStarting, setGameStarting }}>
      {children}
    </GameStartingContext.Provider>
  );
};

export const useGameStarting = (): GameStartingContextType => {
  const context = useContext(GameStartingContext);
  if (!context) {
    throw new Error(
      "useGameStarting must be used within a GameStartingProvider"
    );
  }
  return context;
};
