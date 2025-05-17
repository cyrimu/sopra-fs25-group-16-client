import { selectPlayers, selectWinner } from "@/lib/features/game";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import styles from "@/styles/page.module.css";
import { useSelector } from "react-redux";
import React from "react";
import Modal from "antd/es/modal";

interface ResultsModalProps {
  visible: boolean;
  onClose: () => void;
}

const ResultsTable: React.FC<ResultsModalProps> = ({ visible, onClose }) => {
  const winner = useSelector(selectWinner);
  const players = useSelector(selectPlayers);

  const capitalize = (s: string | undefined) =>
    !s ? "" : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return (
    <Modal title="Results" open={visible} onCancel={onClose}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <div className={styles.resultsTeam}>
            Winner: {capitalize(winner ?? "")}
          </div>
          <div className={styles.resultsTeam}>
            Loser:{" "}
            {capitalize(
              winner === TEAM_COLOR.RED ? TEAM_COLOR.BLUE : TEAM_COLOR.RED
            )}
          </div>
        </div>

        <table className={styles.tableField} style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th>codename</th>
              <th>team</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {players?.map(({ playerName, team, role }, i) => {
              const roleString = role?.split("_")[1];
              return (
                <tr key={i}>
                  <td>{playerName}</td>
                  <td>{capitalize(team)}</td>
                  <td>{capitalize(roleString)}</td>
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
