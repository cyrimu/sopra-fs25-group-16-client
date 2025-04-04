import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { selectPlayer } from "@/lib/features/player";
import styles from "@/styles/game.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

const gameCard: React.FC<Card> = ({ type, color, content }) => {
  const { role } = useSelector(selectPlayer);
  const [isFlipped, setIsFlipped] = useState(false);

  if (type !== GAME_TYPE.text) {
    return (
      <motion.div
        className={styles.gameCard}
        style={
          {
            "--bg-image": isFlipped
              ? `url("/grey_card.png")`
              : `url("/${CARD_COLOR[color]}_card.png")`,
          } as React.CSSProperties
        }
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {!isFlipped && (
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
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Zebra_%2824694097565%29.jpg/1200px-Zebra_%2824694097565%29.jpg" />
      </motion.div>
    );
  }
};

export default gameCard;
