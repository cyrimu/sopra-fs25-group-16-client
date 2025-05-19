type SocketActions =
  | SocketConnectAction
  | SocketOldGameAction
  | SocketReturnLobbyAction;

interface SocketConnectAction {
  type: "lobby/connect";
  payload: string;
}

interface SocketOldGameAction {
  type: "lobby/oldGame";
  payload: { username: string; gameId: string };
}

interface SocketReturnLobbyAction {
  type: "lobby/returnLobby";
  payload: { username: string; gameId: string };
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "lobby/connect",
    "lobby/oldGame",
    "lobby/returnLobby",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
