import { Clue } from "@/lib/features/game/clue.types";
import { Guess } from "@/lib/features/game/guess.types";

type SocketActions =
  | SocketConnectAction
  | SocketSendClueAction
  | SocketGuessAction
  | SocketSkipGuessAction
  | SocketDisconnectAction;

interface SocketConnectAction {
  type: "game/connect";
  payload: {
    gameID: string;
  };
}

interface SocketDisconnectAction {
  type: "game/disconnect";
}

interface SocketSendClueAction {
  type: "game/sendClue";
  payload: {
    clue: Clue;
  };
}

interface SocketGuessAction {
  type: "game/guess";
  payload: {
    guess: Guess;
  };
}

interface SocketSkipGuessAction {
  type: "game/skipGuess";
  payload: string;
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "game/connect",
    "game/disconnect",
    "game/sendClue",
    "game/guess",
    "game/skipGuess",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
