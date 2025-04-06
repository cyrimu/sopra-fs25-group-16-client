"use client";

import styles from '@/styles/page.module.css';

export default function Lobby() {
    // temporary until websocket connection
    const isHost = true;

    return (
        <div className={styles.centered}>

            <div className={styles.messageContainer}>
                <div className={styles.landingButton} style={{ fontSize: '100px', textAlign: 'center' }}>
                    Better luck next time...
                </div>

                
                    {isHost ? (
                        <>
                          <div className={styles.regularButtonContainer}>
                              <button className={styles.regularButton}>
                                  Play Again
                              </button>
                              <button className={styles.regularButton}>
                                  Return to Lobby
                              </button>
                              <button className={styles.regularButton}>
                                  Delete Lobby
                              </button>
                            </div>
                        </>
                    ) : (
                      <>
                        <div className={styles.lobbyTitle} style={{ fontSize: '30px', textAlign: 'center'}}>Wait for the host to restart the game...<br />or</div>
                        <div className={styles.regularButtonContainer}>
                          <button className={styles.regularButton}>
                            Exit Lobby
                        </button>
                        </div>
                      </>
                    )}
            </div>
        </div>
    );
}