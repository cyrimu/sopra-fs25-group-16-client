"use client";
import "@ant-design/v5-patch-for-react-19";
import {useSelector} from "react-redux";
import {selectPlayerName} from "@/lib/features/player";
import {selectHost, selectLobbyId} from "@/lib/features/lobby";
import {Player, PLAYER_ROLES} from "@/lib/features/player/player.types";
import {TEAM_COLOR} from "@/lib/features/lobby/team.types";
import styles from "@/styles/page.module.css";
import {useRouter} from "next/navigation";
import {Modal, Popconfirm} from "antd";
import ConfigurationPanel from "@/components/configurationPanel";
import {useState} from "react";
import GetReadyScreen from "@/components/getReady";
import PlayerTable from "@/components/playerTable";
import {GAME_TYPE} from "@/lib/features/game/game.types";

export default function Lobby() {
    const router = useRouter();

    const id = useSelector(selectLobbyId);
    const playerName = useSelector(selectPlayerName);
    const hostName = useSelector(selectHost);
    const isHost = playerName === hostName;

    const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState(false);
    const [gameType, setGameType] = useState(GAME_TYPE.text);
    const [isGameStarting, setGameStarting] = useState(false);

    const showConfigurationPanelOpen = () => {
        setConfigurationPanelOpen(true);
    };

    const handleOk = () => {
        setConfigurationPanelOpen(false);
    };

    const handleCancel = () => {
        setConfigurationPanelOpen(false);
    };

    const handleStartGame = () => {
        setGameStarting(true);
        setTimeout(() => {
            router.push(`/game/${id}`);
        }, 3000); // Redirect to the game after 3 seconds
    };

    const confirmDeleteLobby = () => {
        router.replace('/create');
    };

    const cancelDeleteLobby = () => {
        // Do nothing
    };

    const players: Player[] = [
        { playerName: 'Red1', team: TEAM_COLOR.red, role: PLAYER_ROLES.operative },
        { playerName: 'Red2', team: TEAM_COLOR.red, role: PLAYER_ROLES.spymaster },
        { playerName: 'Blue1', team: TEAM_COLOR.blue, role: PLAYER_ROLES.spymaster },
        { playerName: 'Blue2', team: TEAM_COLOR.blue, role: PLAYER_ROLES.operative },
    ];

    if (isGameStarting) {
        return <GetReadyScreen />;
    }

    return (
        <div className={styles.centered}>
            <div className={styles.redBlueOverlay}></div>
            <div className={styles.messageContainer}>
                {!isConfigurationPanelOpen && (
                    <>
                        <div className={styles.lobbyTitle}>Game Lobby</div>
                        <PlayerTable players={players} gameType={gameType} />
                    </>
                )}
                {isHost && (
                    <div className={styles.regularButtonContainer}>
                        <button className={styles.regularButton} onClick={showConfigurationPanelOpen}>
                            Change Setup
                        </button>
                        <Modal
                            styles={{
                                content: {
                                    display: 'contents',
                                    backgroundColor: '#2f2f2f',
                                    fontFamily: 'Special Elite',
                                },
                                body: {
                                    backgroundColor: '#2f2f2f',
                                    outline: '1px dashed white',
                                    outlineOffset: '-10px',
                                    fontFamily: 'Special Elite',
                                    color: 'white',
                                    borderRadius: '20px',
                                    padding: '20px',
                                },
                                header: {
                                    backgroundColor: '#2f2f2f',
                                    outline: '1px dashed white',
                                    outlineOffset: '-10px',
                                    fontFamily: 'Special Elite',
                                    color: 'white',
                                    borderRadius: '20px',
                                    padding: '20px',
                                },
                                footer: {
                                    textAlign: 'center',
                                    backgroundColor: '#2f2f2f',
                                    outline: '1px dashed white',
                                    outlineOffset: '-10px',
                                    fontFamily: 'Special Elite',
                                    color: 'white',
                                    borderRadius: '20px',
                                    padding: '20px',
                                },
                            }}
                            title="Configuration Panel"
                            open={isConfigurationPanelOpen}
                            onOk={handleOk}
                            okButtonProps={{ style: { fontFamily: 'Gabarito', fontSize: '20px' } }}
                            okText="Save"
                            onCancel={handleCancel}
                            cancelButtonProps={{ style: { fontFamily: 'Gabarito', fontSize: '20px' } }}
                            cancelText="Cancel"
                        >
                            <ConfigurationPanel setGameType={setGameType} />
                        </Modal>
                        <button className={styles.regularButton} onClick={handleStartGame}>
                            Start Game
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
                    </div>
                )}
            </div>
        </div>
    );
}