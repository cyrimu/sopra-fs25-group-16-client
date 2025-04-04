import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { selectPlayer } from "@/lib/features/player";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "@/styles/game.module.css";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface GameCardProps {
  card: Card;
  selected: boolean;
  selectedCallback: (selected: boolean) => void;
}

const gameCard: React.FC<GameCardProps> = ({
  card,
  selected,
  selectedCallback,
}) => {
  const { color, type, content, isRevealed } = card;
  const { role } = useSelector(selectPlayer);
  const setSelected = () => selectedCallback(!selected);

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  function determineBackgroundImage(): CARD_COLOR {
    if (role === PLAYER_ROLES.operative && !isRevealed) {
      // The only case where the card will be forced to grey
      return CARD_COLOR.grey;
    }
    return color;
  }

  const cardColor = determineBackgroundImage();

  if (type === GAME_TYPE.text) {
    return (
      <motion.div
        className={selected ? styles.gameCardSelected : styles.gameCard}
        style={
          {
            "--bg-image": `url("/${CARD_COLOR[cardColor]}_card.png")`,
          } as React.CSSProperties
        }
        animate={animation}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={setSelected}
      >
        {!isRevealed && (
          <div className={styles.gameCardTextContainer}>
            <span>{content.toUpperCase()}</span>
          </div>
        )}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className={styles.gameCard}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Zebra_%2824694097565%29.jpg/1200px-Zebra_%2824694097565%29.jpg" />
      </motion.div>
    );
  }
};

export default gameCard;
