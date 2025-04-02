import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import styles from "@/styles/game.module.css";

const gameCard: React.FC<Card> = ({ type, color, content }) => {
  if (type === GAME_TYPE.text) {
    return (
      <div
        className={styles.gameCard}
        style={{
          background: `url("/${CARD_COLOR[color]}_card.png") center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className={styles.gameCardTextContainer}>
          <span>{content.toUpperCase()}</span>
        </div>
      </div>
    );
  }
};

export default gameCard;
