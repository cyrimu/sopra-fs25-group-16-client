import { GAME_TYPE } from "@/lib/features/game/game.types";
import { selectGameType, setGameType } from "@/lib/features/lobby";
import { Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";

const GameTypeConfiguration: React.FC = () => {
  const dispatch = useDispatch();

  const gameType = useSelector(selectGameType);

  const handleGameTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGameType = e.target.value as GAME_TYPE;
    dispatch(setGameType(newGameType));
  };

  return (
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
  );
};

export default GameTypeConfiguration;
