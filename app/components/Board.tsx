import styles from "./Board.module.css";
import GameCard from "./GameCard";
import { useSelector } from "react-redux";
import { selectCards } from "@/lib/features/game";

const Board: React.FC = () => {
  const cards = useSelector(selectCards);

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.boardContainer}>
        <div className={styles.boardGrid}>
          {cards?.map((e, i) => {
            return <GameCard key={i} card={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
