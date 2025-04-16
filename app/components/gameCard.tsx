import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { selectPlayerName } from "@/lib/features/player";
import { selectPlayers } from "@/lib/features/lobby";
import { selectSelectedCards, setSelectedCard } from "@/lib/features/game";

interface GameCardProps {
  card: Card;
}

const GameCard: React.FC<GameCardProps> = ({ card }) => {
  const dispatch = useDispatch();

  const { color, type, content, isRevealed } = card;
  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);

  const { role } = players?.find((e) => e.playerName === playerName)!;

  const selectedCards = useSelector(selectSelectedCards);

  const selected = selectedCards?.includes(card);

  function handleSelectedCard() {
    dispatch(setSelectedCard(card));
  }

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  function determineBackgroundImage(): CARD_COLOR {
    if (
      role === PLAYER_ROLES.BLUE_OPERATIVE ||
      (role === PLAYER_ROLES.RED_OPERATIVE && !isRevealed)
    ) {
      // The only case where the card will be forced to grey
      return CARD_COLOR.grey;
    }
    return color;
  }

  const cardColor = determineBackgroundImage();

  if (type === GAME_TYPE.text) {
    return (
      <motion.div
        className={selected ? styles.cardSelected : styles.card}
        style={
          {
            "--bg-image": `url("/${CARD_COLOR[cardColor]}_card.png")`,
          } as React.CSSProperties
        }
        animate={animation}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleSelectedCard}
      >
        {!isRevealed && (
          <div className={styles.cardTextContainer}>
            <span>{content.toUpperCase()}</span>
          </div>
        )}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className={styles.card}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Zebra_%2824694097565%29.jpg/1200px-Zebra_%2824694097565%29.jpg" />
      </motion.div>
    );
  }
};

export default GameCard;
