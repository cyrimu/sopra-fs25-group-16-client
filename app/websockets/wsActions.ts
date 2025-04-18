import { Clue } from "@/lib/features/game/clue.types";
import { Guess } from "@/lib/features/game/guess.types";

type SocketActions =
  | SocketConnectAction
  | SocketSendClueAction
  | SocketGuessAction
  | SocketSkipGuessAction
  | SocketDisconnectAction;

interface SocketConnectAction {
  type: "socket/connect";
  payload: {
    gameID: string;
  };
}

interface SocketSendClueAction {
  type: "socket/sendClue";
  payload: {
    clue: Clue;
  };
}

interface SocketGuessAction {
  type: "socket/guess";
  payload: {
    guess: Guess;
  };
}

interface SocketSkipGuessAction {
  type: "socket/skipGuess";
  payload: string;
}

interface SocketDisconnectAction {
  type: "socket/disconnect";
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "socket/connect",
    "socket/sendClue",
    "socket/guess",
    "socket/skipGuess",
    "socket/disconnect",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
