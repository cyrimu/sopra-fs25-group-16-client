"use client";

import styles from '@/styles/page.module.css';

export default function Lobby() {
    // temporary until websocket connection
    const isHost = true;
    const team = "blue";

    return (
        <div className={styles.centered}>
            {team === "blue" && <div className={styles.blueOverlay}></div>}
            {team === "red" && <div className={styles.redOverlay}></div>}

            <div className={styles.messageContainer}>
                <div className={styles.landingButton} style={{ fontSize: '100px', textAlign: 'center' }}>
                    Congrats no one can outspy you!
                </div>

                <div className={styles.regularButtonContainer}>
                    {isHost ? (
                        <>
                            <button className={styles.regularButton}>
                                Play Again
                            </button>
                            <button className={styles.regularButton}>
                                Return to Lobby
                            </button>
                            <button className={styles.regularButton}>
                                Delete Lobby
                            </button>
                        </>
                    ) : (
                        <button className={styles.regularButton}>
                            Exit Lobby
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}