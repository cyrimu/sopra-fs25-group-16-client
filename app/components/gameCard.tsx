import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { setSelectedCard } from "@/lib/features/game";
import Image from "next/image";
import { selectMyPlayerInGame } from "../../utils/helpers";
import { GAME_TYPE } from "@/lib/features/game/game.types";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();
  const { color, content, isRevealed, type } = card;

  const myPlayerInGame = useSelector(selectMyPlayerInGame);
  const role = myPlayerInGame?.role;

  const isSpymaster =
    role === PLAYER_ROLES.RED_SPYMASTER || role === PLAYER_ROLES.BLUE_SPYMASTER;

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  const isImage = content?.startsWith("data:image/");
  const shouldShowContent = !isRevealed && (isImage || !isImage);
  const shouldRenderImage = shouldShowContent && isImage;
  const shouldRenderText = shouldShowContent && !isImage;

  function determineBackgroundImage(): CARD_COLOR {
    const role = myPlayerInGame?.role;

    //if (!role) throw new Error("The role of the player in game is null");

    if (
      (role === PLAYER_ROLES.BLUE_OPERATIVE || role === PLAYER_ROLES.RED_OPERATIVE) &&
      !isRevealed
    ) {
      return CARD_COLOR.WHITE;
    }
    return color;
  }

  const cardColor = determineBackgroundImage();

  function handleSelectCard() {
    if (!role) throw new Error("The role of the player in game is null");
    if (role === PLAYER_ROLES.RED_SPYMASTER || role === PLAYER_ROLES.BLUE_SPYMASTER)
      return;

    dispatch(setSelectedCard(card.id));
  }

  if (type !== GAME_TYPE.TEXT) {
    return (
      <motion.div
        className={styles.card}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Image
          src="/test.jpg"
          alt="Test Image"
          width={300}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </motion.div>
    );
  } else {
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
  return (
    <motion.div
      className={selected ? styles.cardSelected : styles.card}
      style={
        {
          "--bg-image": isRevealed || isSpymaster
            ? `url("/${CARD_COLOR[cardColor].toLowerCase()}_card.png")`
            : `url("/white_card.png")`,
          aspectRatio: type === GAME_TYPE.PICTURE ? "1 / 1" : "2.15",
        } as React.CSSProperties
      }
      animate={animation}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={handleSelectCard}
    >
      {shouldRenderImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={content}
            alt="Card Image"
            width={300}
            height={300}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "3px",
            }}
          />
        </div>
      )}

      {shouldRenderText && (
        <div className={styles.cardTextContainer}>
          <span>{content.toUpperCase()}</span>
        </div>
      )}
    </motion.div>
  );
};

export default GameCard;