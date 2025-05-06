import { CARD_COLOR } from "@/lib/features/game/card.types";
import styles from "./Scoreboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "@/lib/features/game";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { selectPlayerName, setPlayerName } from "@/lib/features/player";
import { isProduction } from "../../utils/environment";
import { selectPlayerFromGameByRole } from "../../utils/helpers";

const Scoreboard: React.FC = () => {
  const dispatch = useDispatch();

  const cards = useSelector(selectCards);
  const playerName = useSelector(selectPlayerName);

  const production = isProduction();

  function calculateTeamCardsLeft(cardColor: CARD_COLOR) {
    // Number of cards for each team still to reveal
    return cards?.filter((e) => e.color === cardColor && !e.isRevealed).length;
  }

  const redCardsNumber = calculateTeamCardsLeft(CARD_COLOR.RED);
  const blueCardsNumber = calculateTeamCardsLeft(CARD_COLOR.BLUE);

  const blueOperative = useSelector(
    selectPlayerFromGameByRole(PLAYER_ROLES.BLUE_OPERATIVE)
  );
  const blueSpymaster = useSelector(
    selectPlayerFromGameByRole(PLAYER_ROLES.BLUE_SPYMASTER)
  );
  const redOperative = useSelector(
    selectPlayerFromGameByRole(PLAYER_ROLES.RED_OPERATIVE)
  );
  const redSpymaster = useSelector(
    selectPlayerFromGameByRole(PLAYER_ROLES.RED_SPYMASTER)
  );

  function changeTeam(playerName: string | undefined) {
    if (!playerName) throw new Error("The player name is not defined")
      
    dispatch(setPlayerName(playerName));
  }

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
              <div
                className={
                  redOperative?.playerName === playerName
                    ? styles.scoreboardMyPlayer
                    : styles.scoreboardPlayer
                }
              >
                {redOperative?.playerName ?? "Empty"}
              </div>
              {!production && (
                <button onClick={() => changeTeam(redOperative?.playerName)}>
                  Join Team
                </button>
              )}
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div
                className={
                  redSpymaster?.playerName === playerName
                    ? styles.scoreboardMyPlayer
                    : styles.scoreboardPlayer
                }
              >
                {redSpymaster?.playerName ?? "Empty"}
              </div>
              {!production && (
                <button onClick={() => changeTeam(redSpymaster?.playerName)}>
                  Join Team
                </button>
              )}
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
              <div
                className={
                  blueOperative?.playerName === playerName
                    ? styles.scoreboardMyPlayer
                    : styles.scoreboardPlayer
                }
              >
                {blueOperative?.playerName ?? "Empty"}
              </div>
              {!production && (
                <button onClick={() => changeTeam(blueOperative?.playerName)}>
                  Join Team
                </button>
              )}
            </div>
            <span>Spymaster</span>
            <div className={styles.scoreboardPlayersContainer}>
              <div
                className={
                  blueSpymaster?.playerName === playerName
                    ? styles.scoreboardMyPlayer
                    : styles.scoreboardPlayer
                }
              >
                {blueSpymaster?.playerName ?? "Empty"}
              </div>
              {!production && (
                <button onClick={() => changeTeam(blueSpymaster?.playerName)}>
                  Join Team
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
