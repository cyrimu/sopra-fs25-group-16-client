"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import MakeGuess from "@/components/buttons/MakeGuess";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import Board from "@/components/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import { selectLogs, selectPlayers, selectWinner } from "@/lib/features/game";
import {
  PLAYER_ROLES,
  playerRoleToTeamColor,
} from "@/lib/features/player/player.types";
import { selectGameId, selectTurn } from "@/lib/features/game";
import HintForm from "@/components/ClueForm";
import SkipGuess from "@/components/buttons/SkipGuess";
import { useRouter } from "next/navigation";
import Modal from "antd/es/modal/Modal";
import { CloseOutlined } from "@ant-design/icons";
import FullScreenPopup from "@/components/FullScreenPopup";

export default function Game() {
  const dispatch = useDispatch();

  const router = useRouter();

  const logs = useSelector(selectLogs);

  const gameID = useSelector(selectGameId);
  const winner = useSelector(selectWinner);

  const [isLog, setIsLog] = useState(false);
  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  const player = players?.find((e) => e.playerName === playerName);
  const role = player!.role;
  const team = player!.team;

  useEffect(() => {
    if (winner) {
      if (winner == player?.team) {
        router.push(`/game/${gameID}/results/winner`);
      } else {
        router.push(`/game/${gameID}/results/looser`);
      }
    }
  }, [router, turn, winner, gameID, player?.team]);

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
    const color = playerRoleToTeamColor(turn!);

    if (color != team) {
      return waitNextTurn;
    } else if (color === team && role !== turn) {
      if (
        role == PLAYER_ROLES.RED_OPERATIVE ||
        role == PLAYER_ROLES.BLUE_OPERATIVE
      ) {
        return waitClue;
      } else if (
        role == PLAYER_ROLES.RED_SPYMASTER ||
        role == PLAYER_ROLES.BLUE_SPYMASTER
      ) {
        return waitGuess;
      }
    }

    switch (role) {
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
      <Modal
        title={
          <span
            style={{
              color: "white",
              fontFamily: "Special Elite",
              fontSize: "20px",
              textDecoration: "underline",
            }}
          >
            Logs
          </span>
        }
        open={isLog}
        onCancel={() => setIsLog(false)}
        footer={null}
        closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
        styles={modalStyles}
      >
        <ul
          style={{
            paddingTop: "10px",
            fontSize: 16,
            textAlign: "center",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {logs?.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </Modal>
      <div className={styles.gameBackground}>
        <LogButton callback={() => setIsLog(true)} />
        <div className={styles.gameContainer}>
          <Board />
          <ActionElement />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  content: {
    backgroundColor: "#000000cc",
    fontFamily: "Special Elite",
  },
  header: {
    backgroundColor: "#000000cc",
    fontFamily: "Special Elite",
    borderRadius: "20px",
    padding: "20px",
  },
  body: {
    backgroundColor: "#000000cc",
    color: "white",
    padding: "20px",
  },
};
