import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { selectPlayer } from "@/lib/features/player";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "@/styles/game.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

const gameCard: React.FC<Card> = ({ type, color, content, isRevealed }) => {
  const { role } = useSelector(selectPlayer);
  const [revealed, setRevealed] = useState(isRevealed);
  const [selected, setSelected] = useState(false);

  function determineBackgroundImage(): CARD_COLOR {
    if (role === PLAYER_ROLES.operative && !revealed) {
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
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setSelected(!selected)}
      >
        {!revealed && (
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
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setRevealed(!revealed)}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Zebra_%2824694097565%29.jpg/1200px-Zebra_%2824694097565%29.jpg" />
      </motion.div>
    );
  }
};

export default gameCard;
