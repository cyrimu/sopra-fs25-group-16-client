import { CARD_COLOR } from "@/lib/features/game/card.types";
import styles from "./Scoreboard.module.css";
import { useSelector } from "react-redux";
import {
  selectBlueTeam,
  selectCards,
  selectRedTeam,
} from "@/lib/features/game";

const Scoreboard: React.FC = () => {
  const cards = useSelector(selectCards);

  const blueTeam = useSelector(selectBlueTeam);
  const redTeam = useSelector(selectRedTeam);

  function calculateTeamCardsLeft(cardColor: CARD_COLOR) {
    // Number of cards for each team still to reveal
    return cards.filter((e) => e.color === cardColor && !e.isRevealed).length;
  }

  const redCardsNumber = calculateTeamCardsLeft(CARD_COLOR.red);
  const blueCardsNumber = calculateTeamCardsLeft(CARD_COLOR.blue);

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
                {redTeam?.operative?.playerName ?? "Empty"}
              </div>
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {redTeam?.spymaster?.playerName ?? "Empty"}
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
                {blueTeam?.operative?.playerName ?? "Empty"}
              </div>
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div className={styles.scoreboardPlayer}>
                {blueTeam?.spymaster?.playerName ?? "Empty"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
