type SocketActions =
  | SocketConnectAction
  | SocketReadyAction
  | SocketDisconnectAction;

interface SocketConnectAction {
  type: "lobby/connect";
  payload: {
    lobbyID: string;
  };
}

interface SocketDisconnectAction {
  type: "lobby/disconnect";
}

interface SocketReadyAction {
  type: "socket/ready";
  payload: string;
}

export const isSocketAction = (action: unknown): action is SocketActions => {
  if (typeof action !== "object" || action === null || !("type" in action)) {
    return false;
  }

  const socketActionTypes = [
    "lobby/connect",
    "lobby/disconnect",
    "socket/ready",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return socketActionTypes.includes((action as any).type);
};
