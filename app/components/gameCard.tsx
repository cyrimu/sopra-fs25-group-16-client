import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectLogs,
  selectPlayers,
  selectSelectedCards,
} from "@/lib/features/game";
import { setSelectedCard } from "@/lib/features/game";
import Image from "next/image";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();

  const { color, type, content, isRevealed } = card;
  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);

  const role = players?.find((e) => e.playerName === playerName)?.role;

  const selectedCards = useSelector(selectSelectedCards);

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  const logs = useSelector(selectLogs);

  function lastProvidedClue(): number {
    const lastClue = logs?.findLast((e) => e.includes("provided the Clue"));
    const numArr = lastClue!.split(" : ");
    return Number(numArr[numArr.length - 1]);
  }

  function determineBackgroundImage(): CARD_COLOR {
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
    if (
      role === PLAYER_ROLES.RED_SPYMASTER ||
      role === PLAYER_ROLES.BLUE_SPYMASTER
    )
      return;

    // Number of selected cars < clue
    const providedClue = lastProvidedClue();
    if (selectedCards && selectedCards.length < providedClue) {
      dispatch(setSelectedCard(card.id));
    }
  }

  if (type !== GAME_TYPE.TEXT) {
    return (
      <motion.div
        className={styles.card}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Zebra_%2824694097565%29.jpg/1200px-Zebra_%2824694097565%29.jpg"
          }
          alt=""
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
};

export default GameCard;
