"use client";
import React from "react";
import { Button as AntButton, Popconfirm, Tooltip, message } from "antd"; // ✅ import message
import styles from "./SaveButton.module.css";
import {InfoCircleOutlined, SaveOutlined} from "@ant-design/icons";
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
    saveCurrentGame();

    message.open({
      content: "The host has saved and quit the game",
      duration: 3,
      icon: <InfoCircleOutlined style={{ color: "black" }} />,
    });

    dispatch({
      type: "game/saveAction",
    });
  }

  function saveCurrentGame() {
    if (!gameId) throw new Error("The gameId is undefined");
    if (!players) throw new Error("The players are undefined");
    if (!gameType) throw new Error("The gameType is undefined");
    if (!language) throw new Error("The language is undefined");

    const oldIds = localStorage.getItem(OLD_IDS_KEY)?.split(",") ?? [];
    oldIds.push(gameId);
    const uniqueIds = Array.from(new Set(oldIds));
    localStorage.setItem(OLD_IDS_KEY, uniqueIds.join(","));

    const oldGame: Old = {
      gameID: gameId,
      players: players,
      type: gameType,
      language: language,
    };
    localStorage.setItem(gameId, JSON.stringify(oldGame));
  }

  return (
      <div className={styles.rulesButton}>
        <Popconfirm
            title={<span style={{ color: "black" }}>Do you want to save and quit the game?</span>}
            onConfirm={handleSaveGame}
            okText="Yes"
            cancelText="No"
            icon={false}
            cancelButtonProps={{
              style: {
                backgroundColor: "#2f2f2f",
                color: "white",
                border: "1px solid #2f2f2f",
              },
            }}
            okButtonProps={{
              style: {
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              },
            }}
        >
          <Tooltip title={"Save and quit the game"}>
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
          </Tooltip>
        </Popconfirm>
      </div>
  );
};

export default SaveButton;
