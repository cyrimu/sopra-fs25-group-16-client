import { Form, Radio, Select } from "antd";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGameType,
  selectLanguage,
  selectPlayers,
  setGameType,
  setLanguage,
} from "@/lib/features/lobby";
import React, { useState } from "react";

const ConfigurationPanel: React.FC = () => {
  const dispatch = useDispatch();

  const gameType = useSelector(selectGameType);
  const language = useSelector(selectLanguage);
  const players = useSelector(selectPlayers);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(
    Array(4).fill(undefined)
  );

  const handleGameTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGameType = e.target.value as GAME_TYPE;
    dispatch(setGameType(newGameType));
  };

  const handleLanguageChange = (language: LANGUAGES) => {
    dispatch(setLanguage(language));
  };

  const handlePlayerChange = (index: number, value: string) => {
    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers[index] = value;
    setSelectedPlayers(newSelectedPlayers);
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item
          label={
            <span style={{ fontFamily: "Special Elite", color: "white" }}>
              Game Mode
            </span>
          }
        >
          <div style={{ textAlign: "center" }}>
            <Radio.Group
              value={gameType}
              onChange={(e) =>
                handleGameTypeChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                )
              }
              style={{ width: "100%" }}
            >
              <Radio.Button
                value={GAME_TYPE.text}
                style={{
                  width: "50%",
                  color: gameType === GAME_TYPE.text ? "black" : "white",
                  backgroundColor:
                    gameType === GAME_TYPE.text ? "white" : "#2f2f2f",
                }}
              >
                Word
              </Radio.Button>
              <Radio.Button
                value={GAME_TYPE.image}
                style={{
                  width: "50%",
                  color: gameType === GAME_TYPE.image ? "black" : "white",
                  backgroundColor:
                    gameType === GAME_TYPE.image ? "white" : "#2f2f2f",
                }}
              >
                Picture
              </Radio.Button>
            </Radio.Group>
          </div>
        </Form.Item>
        {gameType === GAME_TYPE.text && (
          <Form.Item
            label={
              <span style={{ fontFamily: "Special Elite", color: "white" }}>
                Language
              </span>
            }
          >
            <Select value={language} onChange={handleLanguageChange}>
              {Object.values(LANGUAGES).map((lang) => (
                <Select.Option key={lang} value={lang}>
                  {lang}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {[
          ["Red Spymaster", "Blue Spymaster"],
          ["Red Operative", "Blue Operative"],
        ].map((pair, rowIndex) => (
          <Form.Item key={rowIndex} label="">
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
              {pair.map((label, colIndex) => (
                <div key={colIndex} style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontFamily: "Special Elite",
                      color: "white",
                    }}
                  >
                    {label}
                  </label>
                  <Select
                    value={selectedPlayers[rowIndex * 2 + colIndex]}
                    onChange={(value) =>
                      handlePlayerChange(rowIndex * 2 + colIndex, value)
                    }
                    style={{ color: "white" }}
                  >
                    {players.map((player) => (
                      <Select.Option
                        key={player.playerName}
                        value={player.playerName}
                      >
                        {player.playerName}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default ConfigurationPanel;
