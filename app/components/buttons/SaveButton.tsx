"use client";
import React from "react";
import { Button as AntButton, Popconfirm } from "antd";
import styles from "./SaveButton.module.css";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  selectGameId,
  selectGameTypeFromGame,
  selectLanguageFromGame,
  selectPlayers,
} from "@/lib/features/game";
import { Old } from "@/lib/features/old/old.types";

const OLD_IDS_KEY = "OLD_IDS_KEY";

const SaveButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const gameId = useSelector(selectGameId);
  const players = useSelector(selectPlayers);
  const gameType = useSelector(selectGameTypeFromGame);
  const language = useSelector(selectLanguageFromGame);

  function handleSaveGame() {
    // Save the current game inside the local storage
    saveCurrentGame();
    // Send the save action to the other players
    dispatch({
      type: "game/saveAction",
    });
  }

  function saveCurrentGame() {
    if (!gameId) throw new Error("The gameId is undefined");
    if (!players) throw new Error("The players are undefined");
    if (!gameType) throw new Error("The gameType is undefined");
    if (!language) throw new Error("The language is undefined");

    // Fetch old games
    const oldIds = localStorage.getItem(OLD_IDS_KEY)?.split(",") ?? [];
    // Insert the new game id
    oldIds.push(gameId);
    // Store the old game ids with the current one
    const uniqueIds = Array.from(new Set(oldIds));
    localStorage.setItem(OLD_IDS_KEY, uniqueIds.join(","));

    // Create the oldGame object
    const oldGame: Old = {
      gameID: gameId,
      players: players,
      type: gameType,
      language: language,
    };
    // Set the old game to the local storage
    localStorage.setItem(gameId, JSON.stringify(oldGame));
  }

  return (
    <div className={styles.rulesButton}>
      <Popconfirm
        title={
          <span style={{ color: "black" }}>
            Do you want to save and quit the game?
          </span>
        }
        onConfirm={handleSaveGame}
        okText="Yes"
        cancelText="No"
        icon={false}

      >
        <AntButton
          icon={
            <div style={{ fontSize: "30px" }}>
              <SaveOutlined />
            </div>
          }
          type="primary"
          shape="circle"
          style={{ width: 50, height: 50 }}
        />
      </Popconfirm>
    </div>
  );
};

export default SaveButton;
