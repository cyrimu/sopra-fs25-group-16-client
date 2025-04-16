import { RightOutlined } from "@ant-design/icons";
import styles from "./ClueForm.module.css";
import { Select } from "antd";
import { useState } from "react";
import { Clue } from "@/lib/features/game/clue.types";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";

const ClueForm: React.FC = () => {
  const dispatch = useDispatch();

  const playerName = useSelector(selectPlayerName);

  const [hint, setHint] = useState("");
  const [number, setNumber] = useState<number>();

  const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleSendGuess() {
    if (!number) return;

    const clue: Clue = {
      clueText: hint,
      clueNumber: number,
      username: playerName!,
    };

    dispatch({
      type: "socket/sendClue",
      payload: clue,
    });
  }

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputField}
        placeholder="Provide a hint ... "
        onChange={(e) => setHint(e.target.value)}
      />
      <Select
        className={styles.selector}
        value={number}
        onChange={(p) => {
          setNumber(p);
        }}
        style={{ color: "white" }}
      >
        {validValues?.map((number, i) => {
          return (
            <Select.Option key={i} value={number}>
              {number}
            </Select.Option>
          );
        })}
      </Select>
      <button className={styles.regularButton} onClick={handleSendGuess}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default ClueForm;
