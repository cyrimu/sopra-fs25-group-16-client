import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, {useEffect, useMemo, useState} from "react";
import { setSelectedCard } from "@/lib/features/game";
import { selectMyPlayerInGame } from "../../utils/helpers";
import { useErrorModal } from "@/context/ErrorModalContext";
import { FlagFilled, FlagOutlined } from "@ant-design/icons";
import { selectTurn } from "@/lib/features/game";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();
  const { showError } = useErrorModal();
  const [isFlagged, setIsFlagged] = useState(false);

  const { color, content, isRevealed } = card;
  const myPlayerInGame = useSelector(selectMyPlayerInGame);
  const turn = useSelector(selectTurn);
  const isMyTurn = myPlayerInGame?.role === turn;

  useEffect(() => {
    setIsFlagged(false);
  }, [turn]);

  const animation = useMemo(
      () => ({ rotateY: isRevealed ? 180 : 0 }),
      [isRevealed]
  );

  const backgroundImage = useMemo(() => {
    const role = myPlayerInGame?.role;

    if (!role) {
      showError("The role of the player in game is null");
      return CARD_COLOR.WHITE;
    }

    if (
        (role === PLAYER_ROLES.BLUE_OPERATIVE ||
            role === PLAYER_ROLES.RED_OPERATIVE) &&
        !isRevealed
    ) {
      return CARD_COLOR.WHITE;
    }
    return color;
  }, [myPlayerInGame, isRevealed, color, showError]);

  function handleSelectCard() {
    const role = myPlayerInGame?.role;

    if (!role) {
      showError("The role of the player in game is null");
      return;
    }

    if (
        role === PLAYER_ROLES.RED_SPYMASTER ||
        role === PLAYER_ROLES.BLUE_SPYMASTER
    )
      return;

    dispatch(setSelectedCard(card.id));
  }

  function toggleFlag() {
    if (isMyTurn &&
        (myPlayerInGame?.role === PLAYER_ROLES.RED_OPERATIVE ||
            myPlayerInGame?.role === PLAYER_ROLES.BLUE_OPERATIVE)) {
      setIsFlagged((prev) => !prev);
    }
  }

  return (
      <motion.div
          className={selected ? styles.cardSelected : styles.card}
          style={{
            "--bg-image": `url("/${CARD_COLOR[backgroundImage].toLowerCase()}_card.png")`,
          } as React.CSSProperties}
          animate={animation}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleSelectCard}
      >
        {!isRevealed &&
            (myPlayerInGame?.role === PLAYER_ROLES.RED_OPERATIVE ||
                myPlayerInGame?.role === PLAYER_ROLES.BLUE_OPERATIVE) && (
                <div
                    className={styles.flagContainer}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlag();
                    }}
                >
                  {isFlagged ? (
                      <FlagFilled style={{ fontSize: 20, color: "white" }} />
                  ) : (
                      <FlagOutlined style={{ fontSize: 20, color: "white" }} />
                  )}
                </div>
            )}

        {!isRevealed && (
            <div className={styles.cardTextContainer}>
              <span>{content.toUpperCase()}</span>
            </div>
        )}
      </motion.div>
  );
};

export default GameCard;