import { Card } from "@/lib/features/game/card.types";
import styles from "./Board.module.css";
import GameCard from "./gameCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCards,
  selectSelectedCards,
  setSelectedCard,
} from "@/lib/features/game";

const Board: React.FC = () => {
  const dispatch = useDispatch();

  const cards = useSelector(selectCards);
  const selectedCards = useSelector(selectSelectedCards);

  function handleSelectedCard(card: Card) {
    dispatch(setSelectedCard(card));
  }

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardContainer}>
        <div className={styles.boardGrid}>
          {cards.map((e, i) => {
            return (
              <GameCard
                key={i}
                card={e}
                selected={selectedCards.includes(e)}
                selectedCallback={() => handleSelectedCard(e)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
