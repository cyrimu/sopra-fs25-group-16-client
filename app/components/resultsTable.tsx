"use client";
import { selectWinner, selectPlayers } from "@/lib/features/game";
import { CrownOutlined, UserOutlined } from "@ant-design/icons";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import styles from "./resultsTable.module.css";
import { useSelector } from "react-redux";
import { Modal } from "antd";

interface ResultsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ResultsTable: React.FC<ResultsModalProps> = ({ visible, onClose }) => {
  const winner = useSelector(selectWinner);
  const players = useSelector(selectPlayers);

  const capitalize = (s: string | undefined) =>
    !s ? "" : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const loser = winner === TEAM_COLOR.RED ? TEAM_COLOR.BLUE : TEAM_COLOR.RED;

  if (!winner)
    return (
      <Modal
        title="🎉 Game Results"
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <div className={styles.resultsContainer}>
          <div className={styles.winnerSection}>
            <h2>The game still has no winner</h2>
          </div>
        </div>
      </Modal>
    );

  return (
    <Modal
      title="🎉 Game Results"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className={styles.resultsContainer}>
        <div className={styles.winnerSection}>
          <h2>
            <CrownOutlined style={{ color: "#facc15", marginRight: 8 }} />
            {capitalize(winner)} Team Wins!
          </h2>
          <p>
            Congratulations to all players on the {capitalize(winner)} team!
          </p>
        </div>

        <div className={styles.teamInfo}>
          <div className={`${styles.resultsTeam} ${styles[winner]}`}>
            🏆 Winner: {capitalize(winner)}
          </div>
          <div className={`${styles.resultsTeam} ${styles[loser]}`}>
            ❌ Loser: {capitalize(loser)}
          </div>
        </div>

        <table className={styles.tableField}>
          <thead>
            <tr>
              <th>Codename</th>
              <th>Team</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {players?.map(({ playerName, team, role }, i) => {
              const roleLabel = role?.split("_")[1];
              const isWinner = team === winner;
              return (
                <tr key={i} className={isWinner ? styles.winningRow : ""}>
                  <td>{playerName}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        styles[team?.toLowerCase() ?? "black"]
                      }`}
                    >
                      {capitalize(team)}
                    </span>
                  </td>
                  <td>
                    {roleLabel?.includes("SPYMASTER") ? (
                      <>
                        <CrownOutlined style={{ marginRight: 6 }} />
                        Spymaster
                      </>
                    ) : (
                      <>
                        <UserOutlined style={{ marginRight: 6 }} />
                        Operative
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ResultsTable;
