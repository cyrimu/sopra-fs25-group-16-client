import { Clue } from "@/lib/features/game/clue.types";
import { Guess } from "@/lib/features/game/guess.types";

type SocketActions =
  | SocketConnectAction
  | SocketSendClueAction
  | SocketGuessAction
  | SocketSkipGuessAction
  | SocketSaveAction;

interface SocketConnectAction {
  type: "game/connect";
  payload: string;
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

interface SocketSaveAction {
  type: "game/saveAction";
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "game/connect",
    "game/sendClue",
    "game/guess",
    "game/skipGuess",
    "game/saveAction",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
