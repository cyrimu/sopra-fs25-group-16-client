import { CARD_COLOR } from "@/lib/features/game/card.types";
import styles from "./Scoreboard.module.css";
import { useSelector } from "react-redux";
import { selectCards } from "@/lib/features/game";
import { selectPlayers } from "@/lib/features/lobby";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";

const Scoreboard: React.FC = () => {
  const cards = useSelector(selectCards);
  const players = useSelector(selectPlayers);

  function calculateTeamCardsLeft(cardColor: CARD_COLOR) {
    // Number of cards for each team still to reveal
    return cards?.filter((e) => e.color === cardColor && !e.isRevealed).length;
  }

  const redCardsNumber = calculateTeamCardsLeft(CARD_COLOR.RED);
  const blueCardsNumber = calculateTeamCardsLeft(CARD_COLOR.BLUE);

  const blueOperative = players?.find(
    (e) => e.role === PLAYER_ROLES.BLUE_OPERATIVE
  );
  const blueSpymaster = players?.find(
    (e) => e.role === PLAYER_ROLES.BLUE_SPYMASTER
  );
  const redOperative = players?.find(
    (e) => e.role === PLAYER_ROLES.RED_OPERATIVE
  );
  const redSpymaster = players?.find(
    (e) => e.role === PLAYER_ROLES.RED_SPYMASTER
  );

  return (
    <div className={styles.scoreboardWrapper}>
      <div
        className={styles.scoreboardContainer}
        style={{ backgroundColor: "#651C25", paddingRight: "150px" }}
      >
        <div className={styles.scoreboardContent}>
          <div className={styles.scoreboardTeamContainer}>
            <span>Operative</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {redOperative?.playerName ?? "Empty"}
              </div>
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {redSpymaster?.playerName ?? "Empty"}
              </div>
            </div>
          </div>
          <span className={styles.scoreboardScore}>{redCardsNumber}</span>
        </div>
      </div>
      <div
        className={styles.scoreboardContainer}
        style={{
          backgroundColor: "#294C61",
          paddingLeft: "150px",
        }}
      >
        <div className={styles.scoreboardContent}>
          <span className={styles.scoreboardScore}>{blueCardsNumber}</span>
          <div className={styles.scoreboardTeamContainer}>
            <span>Operative</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {blueOperative?.playerName ?? "Empty"}
              </div>
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {blueSpymaster?.playerName ?? "Empty"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
