import {
  restartLobby,
  setDeletedLobby,
  setLobby,
  setPlayersReady,
} from "@/lib/features/lobby";
import { Client, IMessage } from "@stomp/stompjs";
import { isSocketAction } from "./wsLobbyActions";
import { getApiDomain } from "../../utils/domain";
import { getGame } from "@/lib/features/game/api";
import { Middleware } from "@reduxjs/toolkit";
import { AppDispatch } from "@/lib/store";
import SockJS from "sockjs-client";

export const createLobbySocketMiddleware = (): Middleware => {
  let client: Client | null = null;
  let lobbyID: string;

  return (storeAPI) => (next) => (action) => {
    if (!isSocketAction(action)) {
      return next(action); // Skip unhandled actions
    }

    switch (action.type) {
      case "lobby/connect":
        if (client) return next(action);

        const url = getApiDomain();

        const socket = new SockJS(`${url}/live`);

        lobbyID = action.payload.lobbyID;

        const newClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => console.log("[STOMP]", str),
          onConnect: () => {
            newClient.subscribe(
              `/topic/lobby/${lobbyID}`,
              (message: IMessage) => {
                const data = JSON.parse(message.body);

                if (data.type === "delete") {
                  console.log("Received delete", data);
                  storeAPI.dispatch(setDeletedLobby());
                  return;
                } else if (data.type === "ready") {
                  console.log("Received ready", data);
                  storeAPI.dispatch(setPlayersReady(data.readyPlayers));
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
                  return;
                }
                storeAPI.dispatch(setLobby(data.lobby));
              }
            );
          },
        });

        newClient.activate();
        client = newClient;
        break;

      case "lobby/ready":
        if (client?.connected && client) {
          console.log("Ready sent", action.payload);
          client.publish({
            destination: `/app/lobby/${lobbyID}/ready`,
            body: action.payload,
          });
        }
        break;

      case "lobby/disconnect": {
        client?.deactivate();
        client = null;
        break;
      }

      case "lobby/oldGame": {
        if (client?.connected && client) {
          console.log("Ready sent", action.payload);
          client.publish({
            destination: `/app/lobby/${lobbyID}/oldGame`,
            body: JSON.stringify(action.payload),
          });
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
