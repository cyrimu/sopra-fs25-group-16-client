import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import styles from "./ClueForm.module.css";
import { Clue } from "@/lib/features/game/clue.types";
import { selectUsername } from "@/lib/features/player";
import { useErrorModal } from "@/context/ErrorModalContext";

const ClueForm: React.FC = () => {
  const dispatch = useDispatch();
  const { showError } = useErrorModal();

  const [hint, setHint] = useState<string | undefined>();
  const [number, setNumber] = useState<number | null>();
  const username = useSelector(selectUsername);

  const handleSendClue = () => {
    // The hint is not provided
    if (!hint) {
      showError("A hint must be provided");
      return;
    }

    // The number is not provided
    if (!number) {
      showError("A number must be provided");
      return;
    }

    const _hint = hint.trim();

    const clue: Clue = {
      clueText: _hint,
      clueNumber: number,
      username: username,
    };

    // Send the clue object via websockets
    dispatch({ type: "game/sendClue", payload: clue });
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Provide a hint..."
        onChange={(e) => setHint(e.target.value)}
      />
      <InputNumber
          style={{
            fontSize: "16px",
            borderRadius: "30px",
            fontFamily: "Gabarito",
            color: "black"

          }}
          className={styles.numberInputField}
          size="large"
          value={number}
          onChange={(value) => setNumber(value)}
          min={1}
          max={9}
          placeholder="# cards"
      />
      <button className={styles.regularButton}
      onClick={handleSendClue}>
        Submit
      </button>
    </div>
  );
};

export default ClueForm;
