import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { Middleware } from "@reduxjs/toolkit";
import { setGame } from "@/lib/features/game";

export const createSocketMiddleware = (): Middleware => {
  let client: Client | null = null;
  let gameID: string;

  return (storeAPI) => (next) => (action: any) => {
    switch (action.type) {
      case "socket/connect":
        if (client) return next(action);

        const url =
          process.env.NEXT_PUBLIC_PROD_API_URL ?? "http://localhost:8080";

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
          client.publish({
            destination: `/app/game/${gameID}/clue`,
            body: JSON.stringify(action.payload),
          });
        }
        break;
      case "socket/guess":
        if (client?.connected && client) {
          client.publish({
            destination: `/app/game/${gameID}/guess`,
            body: JSON.stringify(action.payload),
          });
        }
        break;

      case "socket/skipGuess":
        if (client?.connected && client) {
          client.publish({
            destination: `/app/game/${gameID}/skipGuess`,
            body: action.payload,
          });
        }
        break;

      case "socket/disconnect": {
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
