import {
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
    let lobbyId: string;
    let lastFetchedGameId: string | null = null;
    let lastFetchTimestamp = 0;

    return (storeAPI) => (next) => async (action) => {
        if (!isSocketAction(action)) {
            return next(action);
        }

        switch (action.type) {
            case "lobby/connect": {
                if (client) return next(action);

                const url = getApiDomain();
                lobbyId = action.payload;

                const newClient = new Client({
                    webSocketFactory: () => new SockJS(`${url}/live`),
                    reconnectDelay: 5000,
                    debug: (str) => console.log("[STOMP]", str),

                    onConnect: () => {
                        console.log(`[STOMP] Connected to lobby ${lobbyId}`);

                        newClient.subscribe(
                            `/topic/lobby/${lobbyId}`,
                            (message: IMessage) => {
                                const data = JSON.parse(message.body);
                                const dispatch: AppDispatch = storeAPI.dispatch;

                                if (data.type === "delete") {
                                    console.log("[WS] Received delete message");
                                    dispatch(setDeletedLobby());
                                    return;
                                }

                                if (data.type === "ready") {
                                    console.log("[WS] Received ready message", data.readyPlayers);
                                    dispatch(setPlayersReady(data.readyPlayers));
                                    return;
                                }

                                if (data.type === "game") {
                                    console.log("[WS] Received game message");

                                    const now = Date.now();
                                    const currentGameId = storeAPI.getState().game.gameId;

                                    const isNewGame =
                                        data.gameId &&
                                        data.gameId !== lastFetchedGameId &&
                                        data.gameId !== currentGameId;

                                    const enoughTimePassed = now - lastFetchTimestamp > 3000;

                                    if (isNewGame && enoughTimePassed) {
                                        lastFetchedGameId = data.gameId;
                                        lastFetchTimestamp = now;

                                        dispatch(
                                            getGame({
                                                username: data.username,
                                                gameId: data.gameId,
                                            })
                                        );
                                    } else {
                                        console.log(
                                            "[WS] Ignored duplicate or throttled game fetch"
                                        );
                                    }

                                    return;
                                }

                                // Default: lobby update
                                console.log("[WS] Received lobby update", data.lobby);
                                dispatch(setLobby(data.lobby));
                            }
                        );
                    },
                });

                newClient.activate();
                client = newClient;
                break;
            }

            case "lobby/ready": {
                if (client?.connected) {
                    console.log("[WS] Sending ready message", action.payload);
                    client.publish({
                        destination: `/app/lobby/${lobbyId}/ready`,
                        body: action.payload,
                    });
                }
                break;
            }

            case "lobby/oldGame": {
                if (client?.connected) {
                    console.log("[WS] Sending oldGame message", action.payload);
                    client.publish({
                        destination: `/app/lobby/${lobbyId}/oldGame`,
                        body: JSON.stringify(action.payload),
                    });
                }
                break;
            }

            case "lobby/disconnect": {
                console.log("[WS] Disconnecting from the lobby websocket");
                if (client) {
                    await client.deactivate(); // Ensure the Promise resolves before proceeding
                    client = null;
                }
                lastFetchedGameId = null;
                break;
            }

            default:
                break;
        }

        return next(action);
    };
};
