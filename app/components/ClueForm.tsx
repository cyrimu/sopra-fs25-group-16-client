import { CheckOutlined } from "@ant-design/icons";
import styles from "./ClueForm.module.css";
import { InputNumber } from "antd";
import React, { useState } from "react";
import { Clue } from "@/lib/features/game/clue.types";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";

const ClueForm: React.FC = () => {
  const dispatch = useDispatch();

  const playerName = useSelector(selectPlayerName);

  const [hint, setHint] = useState<string | undefined>();
  const [number, setNumber] = useState<number | undefined>();

  function handleSendGuess() {
    if (!number) throw new Error("A number must be provided");
    if (!hint) throw new Error("A hint must be provided");
    if (!playerName) throw new Error("The playerName is undefined");

    const clue: Clue = {
      clueText: hint,
      clueNumber: number,
      username: playerName,
    };

    dispatch({
      type: "game/sendClue",
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
        <InputNumber
            className={styles.numberInputField}
            size={"large"}
            value={number}
            onChange={(p) => {
                setNumber(p ?? undefined);
            }}
            style={{ backgroundColor: "white"}}
            min={1}
            max={9}
        />
      <button className={styles.regularButton} onClick={handleSendGuess}>
        <CheckOutlined />
      </button>
    </div>
  );
};

export default ClueForm;
