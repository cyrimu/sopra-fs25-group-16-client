import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import styles from "@/styles/game.module.css";

const gameCard: React.FC<Card> = ({ type, color, content }) => {
  if (type === GAME_TYPE.text) {
    switch (color) {
      case CARD_COLOR.grey:
        return (
          <div className={styles.gameGreyCardTextWrapper}>
            <div className={styles.gameCardTextContainer}>
              <div className={styles.gameCardText}>{content.toUpperCase()}</div>
            </div>
          </div>
        );
      case CARD_COLOR.black:
        return (
          <div className={styles.gameBlackCardTextWrapper}>
            <div className={styles.gameCardTextContainer}>
              <div className={styles.gameCardText}>{content.toUpperCase()}</div>
            </div>
          </div>
        );
      case CARD_COLOR.blue:
        return (
          <div className={styles.gameBlueCardTextWrapper}>
            <div className={styles.gameCardTextContainer}>
              <div className={styles.gameCardText}>{content.toUpperCase()}</div>
            </div>
          </div>
        );
        break;
      case CARD_COLOR.red:
        return (
          <div className={styles.gameRedCardTextWrapper}>
            <div className={styles.gameCardTextContainer}>
              <div className={styles.gameCardText}>{content.toUpperCase()}</div>
            </div>
          </div>
        );
      default:
        break;
    }
  }
};

export default gameCard;
