import "@ant-design/v5-patch-for-react-19";
import React, { useEffect } from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getLobbyResults } from "@/lib/features/results/api";
import { RootState } from "@/lib/store";
import { AppDispatch } from "@/lib/store";

const ResultsTable: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const lobbyId = "12f96965"; // TODO: Replace logic
    const username = "yourUsername"; // TODO: Replace logic
    const isHost = true;

    const { lobby, status, error } = useSelector((state: RootState) => state.results);

    useEffect(() => {
        dispatch(getLobbyResults({ lobbyId, username }));
    }, [dispatch, lobbyId, username]);

    if (status === "loading") return <div>Loading results...</div>;
    if (status === "failed") return <div>Error loading results: {error}</div>;
    if (!lobby || !lobby.currentGame) return <div>No game data available.</div>;

    const winner = lobby?.currentGame?.winner;
    const players = lobby?.players;

    const confirmDeleteLobby = () => {
        router.replace("/create");
    };

    const cancelDeleteLobby = () => {};

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '30px' }}>
                <div className={styles.messageField} style={{ width: '100%', padding: '30px', height: 'auto', fontSize: '26px', textAlign: 'center', marginRight: '30px' }}>
                    Winner: Red
                </div>
                <div className={styles.messageField} style={{ width: '100%', padding: '30px', height: 'auto', fontSize: '26px', textAlign: 'center' }}>
                    Loser: Blue
                </div>
            </div>

            <table className={styles.tableField} style={{ minWidth: '600px' }}>
                <thead>
                    <tr>
                        <th>codename</th>
                        <th>team</th>
                        <th>points</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player.codename}</td>
                            <td>{player.team}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.regularButtonContainer}>
                {isHost ? (
                    <>
                        <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                            Play Again
                        </button>
                        <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                            Return to Lobby
                        </button>
                        <Popconfirm
                            title={<span style={{ color: 'black' }}>Are you sure if you want to delete the lobby?</span>}
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

                    </>
                ) : (
                    <>
                        <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                            Exit Lobby
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default ResultsTable;