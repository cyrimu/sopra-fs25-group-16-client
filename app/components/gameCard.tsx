import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { setSelectedCard } from "@/lib/features/game";
import Image from "next/image";
import { selectMyPlayerInGame } from "../../utils/helpers";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();

  const { color, type, content, isRevealed } = card;

  const myPlayerInGame = useSelector(selectMyPlayerInGame);

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  function determineBackgroundImage(): CARD_COLOR {
    const role = myPlayerInGame?.role;

    //if (!role) throw new Error("The role of the player in game is null");

    if (
      (role === PLAYER_ROLES.BLUE_OPERATIVE ||
        role === PLAYER_ROLES.RED_OPERATIVE) &&
      !isRevealed
    ) {
      // The only case where the card will be forced to grey
      return CARD_COLOR.WHITE;
    }
    return color;
  }

  const cardColor = determineBackgroundImage();

  function handleSelectCard() {
    const role = myPlayerInGame?.role;

    if (!role) throw new Error("The role of the player in game is null");

    if (
      role === PLAYER_ROLES.RED_SPYMASTER ||
      role === PLAYER_ROLES.BLUE_SPYMASTER
    )
      return;

    dispatch(setSelectedCard(card.id));
  }

  if (type !== GAME_TYPE.TEXT) {
    const showImage = !isRevealed;
  
    return (
      <motion.div
        className={styles.card}
        style={
          {
            "--bg-image": showImage
              ? `url("/white_card.png")` // unrevealed gets white card back
              : `url("/${CARD_COLOR[cardColor].toLowerCase()}_card.png")`,
            aspectRatio: "1 / 1", // enforce square shape
          } as React.CSSProperties
        }
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {showImage && (
          <div className={styles.imageWrapper}>
            <Image
              src="/test.jpg"
              alt="Card Image"
              width={999}
              height={999}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "3px",
              }}
            />
          </div>
        )}
      </motion.div>
    );
  }else {
    return (
      <motion.div
        className={selected ? styles.cardSelected : styles.card}
        style={
          {
            "--bg-image": `url("/${CARD_COLOR[
              cardColor
            ].toLowerCase()}_card.png")`,
          } as React.CSSProperties
        }
        animate={animation}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleSelectCard}
      >
        {!isRevealed && (
          <div className={styles.cardTextContainer}>
            <span>{content.toUpperCase()}</span>
          </div>
        )}
      </motion.div>
    );
  }
};

export default GameCard;
