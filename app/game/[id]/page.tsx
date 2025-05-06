"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import MakeGuess from "@/components/buttons/MakeGuess";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import Board from "@/components/Board";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWinner } from "@/lib/features/game";
import {
  PLAYER_ROLES,
  playerRoleToTeamColor,
} from "@/lib/features/player/player.types";
import { selectGameId, selectTurn } from "@/lib/features/game";
import HintForm from "@/components/ClueForm";
import SkipGuess from "@/components/buttons/SkipGuess";
import { useRouter } from "next/navigation";
import FullScreenPopup from "@/components/FullScreenPopup";
import { selectMyPlayerInGame } from "../../../utils/helpers";
import SaveButton from "@/components/buttons/SaveButton";

export default function Game() {
  const dispatch = useDispatch();

  const router = useRouter();

  const gameID = useSelector(selectGameId);
  const winner = useSelector(selectWinner);

  const turn = useSelector(selectTurn);

  const myPlayerInGame = useSelector(selectMyPlayerInGame);

  useEffect(() => {
    if (winner) {
      if (winner == myPlayerInGame?.team) {
        router.push(`/game/${gameID}/results/winner`);
      } else {
        router.push(`/game/${gameID}/results/looser`);
      }
    }
  }, [router, turn, winner, gameID, myPlayerInGame?.team]);

  useEffect(() => {
    dispatch({
      type: "game/connect",
      payload: { gameID: gameID },
    });
  }, [dispatch, gameID]);

  const waitNextTurn = (
    <span
      style={{
        fontFamily: "Special Elite",
        color: "white",
        fontSize: "20px",
      }}
    >
      Waiting for the next turn...
    </span>
  );

  const waitClue = (
    <span
      style={{
        fontFamily: "Special Elite",
        color: "white",
        fontSize: "20px",
      }}
    >
      Wait for the clue...
    </span>
  );

  const waitGuess = (
    <span
      style={{
        fontFamily: "Special Elite",
        color: "white",
        fontSize: "20px",
      }}
    >
      Wait for the guess...
    </span>
  );

  function ActionElement() {
    if (!myPlayerInGame) {
      throw new Error("The player is undefined");
    } else if (!turn) {
      throw new Error("The turn is undefined");
    } else if (!myPlayerInGame.role) {
      throw new Error("The role is undefined");
    } else if (!myPlayerInGame.team) {
      throw new Error("The role is undefined");
    }

    const color = playerRoleToTeamColor(turn);

    if (color != myPlayerInGame.team) {
      return waitNextTurn;
    } else if (color === myPlayerInGame.team && myPlayerInGame.role !== turn) {
      if (
        myPlayerInGame.role === PLAYER_ROLES.RED_OPERATIVE ||
        myPlayerInGame.role === PLAYER_ROLES.BLUE_OPERATIVE
      ) {
        return waitClue;
      } else if (
        myPlayerInGame.role === PLAYER_ROLES.RED_SPYMASTER ||
        myPlayerInGame.role === PLAYER_ROLES.BLUE_SPYMASTER
      ) {
        return waitGuess;
      }
    }

    switch (myPlayerInGame.role) {
      case PLAYER_ROLES.BLUE_OPERATIVE:
      case PLAYER_ROLES.RED_OPERATIVE:
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <MakeGuess /> <SkipGuess />
          </div>
        );
      case PLAYER_ROLES.BLUE_SPYMASTER:
      case PLAYER_ROLES.RED_SPYMASTER:
        return <HintForm />;
      default:
        break;
    }
  }

  return (
    <div className={styles.centered}>
      <FullScreenPopup />
      <div className={styles.gameBackground}>
        <div className={styles.gameLogController}>
          <LogButton />
        </div>
        <div className={styles.gameSaveController}>
          <SaveButton />
        </div>
        <div className={styles.gameContainer}>
          <Board />
          <ActionElement />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}
