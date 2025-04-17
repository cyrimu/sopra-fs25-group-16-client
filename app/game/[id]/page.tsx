"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import MakeGuess from "@/components/buttons/MakeGuess";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import LogDialog from "@/components/logDialog";
import Board from "@/components/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import { selectPlayers } from "@/lib/features/lobby";
import {
  PLAYER_ROLES,
  playerRoleToTeamColor,
} from "@/lib/features/player/player.types";
import { selectGameId, selectTurn } from "@/lib/features/game";
import HintForm from "@/components/ClueForm";

export default function Game() {
  const dispatch = useDispatch();

  const gameID = useSelector(selectGameId);

  const [isLog, setIsLog] = useState(false);
  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  const player = players?.find((e) => e.playerName === playerName);
  const role = player!.role;
  const team = player!.team;

  useEffect(() => {
    dispatch({
      type: "socket/connect",
      payload: { gameID: gameID },
    });
  }, []);

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
    const color = playerRoleToTeamColor(role!);

    if (turn !== role) {
      return waitNextTurn;
    } else if (color === team && role !== turn) {
      if (
        role === PLAYER_ROLES.RED_OPERATIVE ||
        role === PLAYER_ROLES.BLUE_OPERATIVE
      ) {
        return waitClue;
      } else if (
        role === PLAYER_ROLES.RED_SPYMASTER ||
        role === PLAYER_ROLES.BLUE_SPYMASTER
      ) {
        return waitGuess;
      }
    }

    switch (role) {
      case PLAYER_ROLES.BLUE_OPERATIVE:
      case PLAYER_ROLES.RED_OPERATIVE:
        return <MakeGuess />;
      case PLAYER_ROLES.BLUE_SPYMASTER:
      case PLAYER_ROLES.RED_SPYMASTER:
        return <HintForm />;
      default:
        break;
    }
  }

  return (
    <div className={styles.centered}>
      <div className={styles.gameBackground}>
        {!isLog && <LogButton callback={() => setIsLog(true)} />}
        {isLog && <LogDialog callback={() => setIsLog(false)} />}
        <div className={styles.gameContainer}>
          <Board />
          <ActionElement />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}
