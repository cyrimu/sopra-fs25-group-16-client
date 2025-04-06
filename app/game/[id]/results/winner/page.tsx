"use client";

import styles from '@/styles/page.module.css';
import { useRouter } from 'next/navigation';

export default function Lobby() {
    // temporary until websocket connection
    const router = useRouter();
    const isHost = false;
    const team = "blue";
    const gameId = "abc123";
    const lobbyId = "abc123";

    return (
        <div className={styles.centered}>
            {team === "blue" && <div className={styles.blueOverlay}></div>}
            {team === "red" && <div className={styles.redOverlay}></div>}

            <div className={styles.messageContainer}>
                <div className={styles.landingButton} style={{ fontSize: '100px', textAlign: 'center' }}>
                    Congrats no one can outspy you!
                </div>

                {isHost ? (
                        <>
                          <div className={styles.regularButtonContainer}>
                              <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                                  Play Again
                              </button>
                              <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                                  Return to Lobby
                              </button>
                              <button className={styles.regularButton} onClick={() => router.push(`/game/${gameId}/results`)}>
                                View Results
                              </button>
                            </div>
                        </>
                    ) : (
                      <>
                        <div className={styles.lobbyTitle} style={{ fontSize: '30px', textAlign: 'center'}}>Wait for the host to restart the game...<br />or</div>
                        <div className={styles.regularButtonContainer}>
                          <button className={styles.regularButton} onClick={() => router.push(`/lobby/${lobbyId}`)}>
                            Exit Lobby
                        </button>
                        </div>
                      </>
                    )}
            </div>
        </div>
    );
}