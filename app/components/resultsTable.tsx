"use client";
import { selectWinner, selectPlayers } from "@/lib/features/game";
import {CloseOutlined, MehOutlined, SearchOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import styles from "./resultsTable.module.css";

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

    // Sort players: winners first, losers second
    const sortedPlayers = players?.slice().sort((a, b) => {
        if (a.team === winner && b.team !== winner) return -1;
        if (a.team !== winner && b.team === winner) return 1;
        return 0;
    });

    const getRowBackgroundColor = (team: string) => {
        if (team === TEAM_COLOR.RED) return "#651C25";
        if (team === TEAM_COLOR.BLUE) return "#294C61";
        return "#f9f9f9"; // Default background color
    };

    return (
        <Modal
            title={
                <span
                    style={{
                        fontFamily: "Gabarito",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                >
                    Game Results
                </span>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={
                <CloseOutlined
                    style={{ fontSize: 20, color: "#555" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                />
            }
            styles={modalStyles}
        >
            <div
                style={{
                    padding: "20px",
                    fontSize: 16,
                    fontFamily: "Gabarito, sans-serif",
                    lineHeight: "1.6",
                    background: "linear-gradient(to bottom, #f9f9f9, #eaeaea)",
                    borderRadius: "10px",
                }}
            >
                {!winner ? (
                    <div className={styles.resultsContainer}>
                        <div className={styles.winnerSection}>
                            <h2 style={{ color: "#555" }}>The game still has no winner</h2>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.resultsContainer}>
                            <div className={styles.winnerSection}>
                                <h2 style={{ color: "#333" }}>
                                    {capitalize(winner)} Team Wins!
                                </h2>
                                <p style={{ color: "#666" }}>
                                    Congratulations to all players on the {capitalize(winner)} team!
                                </p>
                            </div>

                            <div className={styles.teamInfo}>
                                <div
                                    className={`${styles.resultsTeam} ${styles[winner]}`}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "30px",
                                        backgroundColor: winner === TEAM_COLOR.RED ? "#651C25" : "#294C61",
                                        color: "#fff",
                                    }}
                                >
                                    <SmileOutlined /> Winner: {capitalize(winner)}
                                </div>
                                <div
                                    className={`${styles.resultsTeam} ${styles[loser]}`}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "20px",
                                        backgroundColor: loser === TEAM_COLOR.RED ? "#651C25" : "#294C61",
                                        color: "#fff",
                                    }}
                                >
                                    <MehOutlined /> Loser: {capitalize(loser)}
                                </div>
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
                            {sortedPlayers?.map(({ playerName, team, role }, i) => {
                                const roleLabel = role?.split("_")[1];
                                const isWinner = team === winner;
                                return (
                                    <tr
                                        key={i}
                                        className={isWinner ? styles.winningRow : ""}
                                        style={{
                                            backgroundColor: getRowBackgroundColor(team ?? ""),
                                            color: "#fff",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <td>{playerName}</td>
                                        <td>
                                            <span>{capitalize(team)}</span>
                                        </td>
                                        <td>
                                            {roleLabel?.includes("SPYMASTER") ? (
                                                <>
                                                    <SearchOutlined style={{ marginRight: 6 }} />
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
                    </>
                )}
            </div>
        </Modal>
    );
};

const modalStyles = {
    content: {
        fontFamily: "Gabarito",
    },
    header: {
        fontFamily: "Gabarito",
        borderRadius: "20px",
        padding: "20px",
    },
    body: {
        padding: "20px",
        maxHeight: "500px",
        overflowY: "auto" as const,
    },
};

export default ResultsTable;