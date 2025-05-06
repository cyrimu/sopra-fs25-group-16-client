type SocketActions =
  | SocketConnectAction
  | SocketReadyAction
  | SocketDisconnectAction
  | SocketOldGameAction;

interface SocketConnectAction {
  type: "lobby/connect";
  payload: { lobbyID: string };
}

interface SocketDisconnectAction {
  type: "lobby/disconnect";
}

interface SocketReadyAction {
  type: "lobby/ready";
  payload: string;
}

interface SocketOldGameAction {
  type: "lobby/oldGame";
  payload: { username: string; gameId: string };
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "lobby/connect",
    "lobby/disconnect",
    "lobby/ready",
    "lobby/oldGame",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
