import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import styles from "./ClueForm.module.css";
import { Clue } from "@/lib/features/game/clue.types";
import { selectPlayerName } from "@/lib/features/player";
import ErrorModal from "@/components/errorModal";

const ClueForm: React.FC = () => {
    const dispatch = useDispatch();
    const playerName = useSelector(selectPlayerName);

    const [hint, setHint] = useState<string>("");
    const [number, setNumber] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSendClue = () => {

        if (!hint.trim()) {
            setErrorMessage("A hint must be provided");
            setIsModalVisible(true);
            return;
        }
        if (!number) {
            setErrorMessage("A number must be provided");
            setIsModalVisible(true);
            return;
        }
        if (!playerName) {
            setErrorMessage("The playerName is undefined");
            setIsModalVisible(true);
            return;
        }

        const clue: Clue = {
            clueText: hint,
            clueNumber: number,
            username: playerName,
        };

        dispatch({ type: "game/sendClue", payload: clue });
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                className={styles.inputField}
                placeholder="Provide a hint..."
                value={hint}
                onChange={(e) => setHint(e.target.value)}
            />
            <InputNumber
                className={styles.numberInputField}
                size="large"
                value={number}
                onChange={(value) => setNumber(value)}
                min={1}
                max={9}
                style={{ backgroundColor: "white" }}
            />
            <button className={styles.regularButton} onClick={handleSendClue}>
                <CheckOutlined />
            </button>
            <ErrorModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                message={errorMessage}
            />
        </div>
    );
};

export default ClueForm;