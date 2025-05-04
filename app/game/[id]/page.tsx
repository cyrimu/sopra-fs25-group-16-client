"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import MakeGuess from "@/components/buttons/MakeGuess";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import LogDialog from "@/components/logDialog";
import Board from "@/components/Board";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import { selectPlayers, selectWinner, selectLastClueString } from "@/lib/features/game";
import {
  PLAYER_ROLES,
  playerRoleToTeamColor,
} from "@/lib/features/player/player.types";
import { selectGameId, selectTurn } from "@/lib/features/game";
import HintForm from "@/components/ClueForm";
import SkipGuess from "@/components/buttons/SkipGuess";
import { useRouter } from "next/navigation";

export default function Game() {
  const dispatch = useDispatch();

  const router = useRouter();

  const gameID = useSelector(selectGameId);
  const winner = useSelector(selectWinner);

  const [isLog, setIsLog] = useState(false);
  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  const player = players?.find((e) => e.playerName === playerName);

  const role = player?.role;
  const team = player?.team;
  const isGlobalSpymasterTurn =
    turn === PLAYER_ROLES.RED_SPYMASTER || turn === PLAYER_ROLES.BLUE_SPYMASTER;

  const lastClueString = useSelector(selectLastClueString);
  let displayedClue: { word: string; number: number } | null = null;
  if (lastClueString) {
    const match = lastClueString.match(/provided the Clue: (.+?) ?: ?(\d+)/);
    if (match) {
      displayedClue = {
        word: match[1],
        number: parseInt(match[2]),
      };
    }
  }

  const [showTurnMessage, setShowTurnMessage] = useState(false);
  const [visible, setVisible] = useState(false);
  const prevTurnRef = useRef<PLAYER_ROLES | null>(null);

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
      type: "socket/connect",
      payload: { gameID: gameID },
    });
  }, [dispatch, gameID]);

  useEffect(() => {
    const isNowMyTurn = turn === role;
    const wasMyTurn = prevTurnRef.current === role;
  
    if (isNowMyTurn && !wasMyTurn) {
      setShowTurnMessage(true);
      setVisible(true);
  
      // Fade out after 2.5s
      setTimeout(() => setVisible(false), 2500);
      // Hide completely after 3s
      setTimeout(() => setShowTurnMessage(false), 3000);
    }
  
    prevTurnRef.current = turn;
  }, [turn, role]);

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
    if (!turn || !team) return waitNextTurn;

    const color = playerRoleToTeamColor(turn);
  
    if (!color || color !== team) {
      return waitNextTurn;
    }
  
    if (color === team && role !== turn) {
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
        return (
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <MakeGuess /> <SkipGuess />
          </div>
        );
      case PLAYER_ROLES.BLUE_SPYMASTER:
      case PLAYER_ROLES.RED_SPYMASTER:
        return <HintForm />;
      default:
        return waitNextTurn;
    }
  }

  return (
    <div className={styles.centered}>
      <div className={styles.gameBackground}>
        {!isLog && <LogButton callback={() => setIsLog(true)} />}
        {isLog && <LogDialog callback={() => setIsLog(false)} />}
  
        <div className={styles.gameContainer}>

        {showTurnMessage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px 50px",
                borderRadius: "16px",
                fontSize: "28px",
                fontFamily: "Special Elite",
                color: "#000",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                textAlign: "center",
              }}
            >
            It’s your turn now!
            </div>
          </div>
        )}

          <Board />
          
          {displayedClue && !isGlobalSpymasterTurn && (
            <div
              style={{
                backgroundColor: "#444",
                color: "white",
                fontSize: "24px",
                margin: "20px auto",
                padding: "10px 20px",
                borderRadius: "8px",
                fontFamily: "Special Elite",
                textAlign: "center",
                width: "fit-content",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
               Clue: <strong>{displayedClue.word}</strong> ({displayedClue.number})
            </div>
          )}
  
          <ActionElement />
          <Scoreboard />
        </div>
      </div>
    </div>
  );