"use client";
import "@ant-design/v5-patch-for-react-19";
import { useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import { selectGameType, selectHost, selectLobbyId, selectLanguage } from "@/lib/features/lobby";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Button, Popconfirm } from "antd";

export default function Lobby() {
    const router = useRouter();

    const id = useSelector(selectLobbyId);
    const playerName = useSelector(selectPlayerName);
    const hostName = useSelector(selectHost);
    const isHost = playerName === hostName;

    function handleStartGame() {
        router.push(`/game/${id}`);
    }

    function confirmDeleteLobby() {
        router.replace("/create");
    }

    function cancelDeleteLobby() {
        // Do nothing
    }

    // Setup mockup data
    const players: Player[] = [
        { playerName: "Sergi", team: TEAM_COLOR.red, role: PLAYER_ROLES.operative },
        { playerName: "Pio", team: TEAM_COLOR.red, role: PLAYER_ROLES.spymaster },
        { playerName: "Rashmi", team: TEAM_COLOR.blue, role: PLAYER_ROLES.spymaster },
        { playerName: "Calvin", team: TEAM_COLOR.blue, role: PLAYER_ROLES.operative },
        { playerName: "Cyril", team: TEAM_COLOR.blue, role: PLAYER_ROLES.operative },
    ];

    return (
        <div className={styles.centered}>
            <div className={styles.redBlueOverlay}></div>
            <div className={styles.lobbyTitle}>Game Lobby</div>
            <div className={styles.messageContainer}>
                <br />
                <table className={styles.tableField}>
                    <thead>
                    <tr>
                        <th>codename</th>
                        <th>team</th>
                        <th>role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(({ playerName, team, role }, index) => (
                        <tr key={index}>
                            <td>{playerName}</td>
                            <td>
                                {team
                                    ? TEAM_COLOR[team].charAt(0).toUpperCase() +
                                    TEAM_COLOR[team].slice(1)
                                    : "N/A"}
                            </td>
                            <td>
                                {role
                                    ? PLAYER_ROLES[role].charAt(0).toUpperCase() +
                                    PLAYER_ROLES[role].slice(1)
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br />
                {isHost && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <button className={styles.regularButton} onClick={handleStartGame}>
                            Change Setup
                        </button>
                        <button className={styles.regularButton} onClick={handleStartGame}>
                            Start Game
                        </button>
                        <Popconfirm
                            title={<span style={{ color: "black" }}>Are you sure if you want to delete the lobby?</span>}
                            onConfirm={confirmDeleteLobby}
                            onCancel={cancelDeleteLobby}
                            okText="Yes"
                            cancelText="No"
                            icon={false}
                        >
                            <button className={styles.regularButton}>
                                Delete Lobby
                            </button>
                        </Popconfirm>
                    </div>
                )}
            </div>
        </div>
    );
}