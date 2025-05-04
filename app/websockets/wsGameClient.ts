import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { Middleware } from "@reduxjs/toolkit";
import { setGame } from "@/lib/features/game";
import { isSocketAction } from "./wsGameActions";
import { getApiDomain } from "../../utils/domain";

export const createGameSocketMiddleware = (): Middleware => {
  let client: Client | null = null;
  let gameID: string;

  return (storeAPI) => (next) => (action) => {
    if (!isSocketAction(action)) {
      return next(action); // Skip unhandled actions
    }

    switch (action.type) {
      case "game/connect":
        if (client) return next(action);

        const url = getApiDomain();

        const socket = new SockJS(`${url}/live`);

        gameID = action.payload.gameID;

        const newClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => console.log("[STOMP]", str),
          onConnect: () => {
            newClient.subscribe(
              `/topic/game/${gameID}`,
              (message: IMessage) => {
                const data = JSON.parse(message.body);
                console.log("Received:", data);

                storeAPI.dispatch(setGame(data));
              }
            );
          },
        });

        newClient.activate();
        client = newClient;
        break;

      case "socket/sendClue":
        if (client?.connected && client) {
          console.log("Clue sent", action.payload);
          client.publish({
            destination: `/app/game/${gameID}/clue`,
            body: JSON.stringify(action.payload),
          });
        }
        break;
      case "socket/guess":
        if (client?.connected && client) {
          console.log("Guess sent", action.payload);
          client.publish({
            destination: `/app/game/${gameID}/guess`,
            body: JSON.stringify(action.payload),
          });
        }
        break;

      case "socket/skipGuess":
        if (client?.connected && client) {
          console.log("Skip guess sent", action.payload);
          client.publish({
            destination: `/app/game/${gameID}/skipGuess`,
            body: action.payload,
          });
        }
        break;

      case "game/disconnect": {
        client?.deactivate();
        client = null;
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
