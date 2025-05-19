import { setLobby } from "@/lib/features/lobby";
import { Client, IMessage } from "@stomp/stompjs";
import { isSocketAction } from "./wsLobbyActions";
import { getApiDomain } from "../../utils/domain";
import { getGame } from "@/lib/features/game/api";
import { Middleware } from "@reduxjs/toolkit";
import { AppDispatch } from "@/lib/store";
import SockJS from "sockjs-client";
import {
  setDeleteLobby,
  setReturnLobby,
  setStartGame,
} from "@/lib/features/flags";

export const createLobbySocketMiddleware = (): Middleware => {
  let client: Client | null = null;
  let lobbyId: string;

  async function _disconnect() {
    console.log("Disconnect from the lobby websocket");
    client?.deactivate();
    client = null;
  }

  return (storeAPI) => (next) => (action) => {
    if (!isSocketAction(action)) {
      return next(action); // Skip unhandled actions
    }

    switch (action.type) {
      case "lobby/connect":
        // Subscribe to an initial lobby or to a new lobby
        if (!client || lobbyId !== action.payload) {
          // Disconnect from the old one
          if (client) _disconnect();

          const url = getApiDomain();

          lobbyId = action.payload;

          const newClient = new Client({
            webSocketFactory: () => new SockJS(`${url}/live`),
            reconnectDelay: 5000,
            debug: (str) => console.log("[STOMP]", str),
            onConnect: () => {
              newClient.subscribe(
                `/topic/lobby/${lobbyId}`,
                (message: IMessage) => {
                  const data = JSON.parse(message.body);

                  if (data.type === "delete") {
                    console.log("Received delete", data);
                    storeAPI.dispatch(setDeleteLobby(true));
                    return;
                  } else if (data.type === "returnLobby") {
                    console.log("Received returnLobby", data);
                    storeAPI.dispatch(setReturnLobby(true));
                    return;
                  } else if (data.type === "game") {
                    console.log("Received game", data);
                    const dispatch: AppDispatch = storeAPI.dispatch;
                    dispatch(
                      getGame({
                        username: data.username,
                        gameId: data.gameId,
                      })
                    );
                    dispatch(setStartGame(true));
                    return;
                  }

                  storeAPI.dispatch(setLobby(data.lobby));
                }
              );
            },
          });

          newClient.activate();
          client = newClient;
        }
        break;

      case "lobby/oldGame":
        if (client?.connected && client) {
          console.log("Ready sent", action.payload);
          client.publish({
            destination: `/app/lobby/${lobbyId}/oldGame`,
            body: JSON.stringify(action.payload),
          });
        }
        break;

      case "lobby/returnLobby":
        if (client?.connected && client) {
          client.publish({
            destination: `/app/lobby/${lobbyId}/returnLobby`,
          });
        }
        break;
    }

    return next(action);
  };
};
