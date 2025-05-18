import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { Middleware } from "@reduxjs/toolkit";
import { setGame, setSavedGame } from "@/lib/features/game";
import { isSocketAction } from "./wsGameActions";
import { getApiDomain } from "../../utils/domain";

export const createGameSocketMiddleware = (): Middleware => {
  let client: Client | null = null;
  let subscription: { unsubscribe: () => void } | null = null;
  let gameId: string;

  return (storeAPI) => (next) => (action) => {
    if (!isSocketAction(action)) {
      return next(action);
    }

    switch (action.type) {
      case "game/connect":
        if (client) return next(action);

        const url = getApiDomain();
        const currentGameId = action.payload;

        const newClient = new Client({
          webSocketFactory: () => new SockJS(`${url}/live`),
          reconnectDelay: 5000,
          debug: (str) => console.log("[STOMP]", str),
          onConnect: () => {
            subscription = newClient.subscribe(
                `/topic/game/${currentGameId}`,
                (message: IMessage) => {
                  const data = JSON.parse(message.body);
                  console.log("Received:", data);

                  if (data.type === "save") {
                    console.log("Received save", data);
                    storeAPI.dispatch(setSavedGame());
                    return;
                  }
                  storeAPI.dispatch(setGame(data));
                }
            );
          },
        });

        newClient.activate();
        client = newClient;
        gameId = currentGameId;
        break;

      case "game/sendClue":
        if (!client?.connected) {
          console.warn("Cannot send clue, game websocket not connected");
          break;
        }
        console.log("Clue sent", action.payload);
        client.publish({
          destination: `/app/game/${gameId}/clue`,
          body: JSON.stringify(action.payload),
        });
        break;

      case "game/guess":
        if (!client?.connected) {
          console.warn("Cannot send guess, game websocket not connected");
          break;
        }
        console.log("Guess sent", action.payload);
        client.publish({
          destination: `/app/game/${gameId}/guess`,
          body: JSON.stringify(action.payload),
        });
        break;

      case "game/skipGuess":
        if (!client?.connected) {
          console.warn("Cannot skip guess, game websocket not connected");
          break;
        }
        console.log("Skip guess sent", action.payload);
        client.publish({
          destination: `/app/game/${gameId}/skipGuess`,
          body: action.payload,
        });
        break;

      case "game/saveAction":
        if (!client?.connected) {
          console.warn("Cannot send save action, game websocket not connected");
          break;
        }
        console.log("Save action sent");
        client.publish({
          destination: `/app/game/${gameId}/save`,
        });
        break;

      case "game/disconnect":
        console.log("Disconnect from the game websocket");
        if (subscription) {
          subscription.unsubscribe();
          subscription = null;
        }
        if (client) {
          client.deactivate().then(() => {
            console.log("WebSocket client deactivated");
            client = null;
          }).catch((error) => {
            console.error("Error deactivating WebSocket client", error);
            client = null;
          });
        }
        break;
    }

    return next(action);
  };
};
