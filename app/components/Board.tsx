"use client";
import styles from "./Board.module.css";
import GameCard from "./gameCard";
import { useSelector } from "react-redux";
import { selectCards, selectTurn } from "@/lib/features/game";
import React, { useEffect, useRef, useState } from "react";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";


const Board: React.FC = () => {
    const cards = useSelector(selectCards);
    const turn = useSelector(selectTurn);
    const previousTurn = useRef(turn); // Store the previous turn value
    const [isTurnEndPopupVisible, setTurnEndPopupVisible] = useState(false);

    useEffect(() => {
        if (
            previousTurn.current !== undefined &&
            previousTurn.current !== turn &&
            (previousTurn.current === PLAYER_ROLES.RED_OPERATIVE || previousTurn.current === PLAYER_ROLES.BLUE_OPERATIVE)
        ) {
            setTurnEndPopupVisible(true);
            setTimeout(() => {
                setTurnEndPopupVisible(false);
            }, 2300);
        }
        previousTurn.current = turn;
    }, [turn]);

    return (
        <div className={styles.boardWrapper}>
            <div className={styles.boardContainer}>
                <div className={styles.boardGrid}>
                    {cards?.map((e, i) => (
                        <GameCard key={i} selected={e.isSelected} card={e} />
                    ))}
                </div>
            </div>
            {isTurnEndPopupVisible && (
                <div className={styles.overlay}>
                    <div className={styles.popUpContent}>
                        <h2 style={{color: "white", fontFamily: "Special Elite", fontSize: "50px"}}>You are out of guesses</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board;