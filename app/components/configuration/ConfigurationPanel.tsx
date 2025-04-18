import { Form } from "antd";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { useSelector } from "react-redux";
import { selectGameType } from "@/lib/features/lobby";
import React from "react";
import TeamsConfiguration from "./TeamsConfiguration";
import LanguageConfiguration from "./LanguageConfiguration";
import GameTypeConfiguration from "./GameTypeConfiguration";

const ConfigurationPanel: React.FC = () => {
  const gameType = useSelector(selectGameType);

  return (
    <Form layout="vertical">
      <GameTypeConfiguration />
      {gameType === GAME_TYPE.TEXT && <LanguageConfiguration />}
      <TeamsConfiguration />
    </Form>
  );
};

export default ConfigurationPanel;
