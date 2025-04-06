"use client";
import "@ant-design/v5-patch-for-react-19";
import styles from "@/styles/game.module.css";
import LogButton from "@/components/logButton";
import GameCard from "@/components/gameCard";
import { useState } from "react";
import LogDialog from "@/components/logDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectCards } from "@/lib/features/game";
import SubmitButton from "@/components/submitButton";
import {
  setRedTeam,
  setBlueTeam,
  selectBlueTeam,
  selectRedTeam,
} from "@/lib/features/game";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import {
  selectPlayer,
  setPlayerRole,
  setPlayerTeam,
} from "@/lib/features/player";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";

export default function Game() {
  const [isLog, setIsLog] = useState(false);

  const cards = useSelector(selectCards);
  const blueTeam = useSelector(selectBlueTeam);
  const redTeam = useSelector(selectRedTeam);

  const player = useSelector(selectPlayer);

  const dispatch = useDispatch();

  function handleJoinTeamAndRole(team: TEAM_COLOR, role: PLAYER_ROLES) {
    // Update the player itself
    dispatch(setPlayerRole(role));
    dispatch(setPlayerTeam(team));

    // Update the game with the new player
    const newPlayer: Player = {
      playerName: player.playerName,
      role: role,
      team: team,
    };

    if (team == TEAM_COLOR.red) {
      dispatch(setRedTeam(newPlayer));
    } else {
      dispatch(setBlueTeam(newPlayer));
    }
  }

  return (
    <div className={styles.centered}>
      <div style={{ background: "#A79C8B", width: "100%", height: "100%" }}>
        {!isLog && <LogButton callback={() => setIsLog(true)} />}
        {isLog && <LogDialog callback={() => setIsLog(false)} />}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div className={styles.gameWrapper}>
            <div className={styles.gameContainer}>
              {cards.map((e, i) => {
                return (
                  <GameCard
                    key={i}
                    type={e.type}
                    content={e.content}
                    isRevealed={e.isRevealed}
                    color={e.color}
                  />
                );
              })}
            </div>
          </div>
          <SubmitButton />
          <div className={styles.scoreboardWrapper}>
            <div
              className={styles.scoreboardContainer}
              style={{ backgroundColor: "#651C25", paddingRight: "150px" }}
            >
              <div className={styles.scoreboardContent}>
                <div className={styles.scoreboardTeamContainer}>
                  <span>Operative</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {redTeam?.operative ? (
                      <div className={styles.scoreboardPlayer}>
                        {redTeam.operative.playerName}
                      </div>
                    ) : (
                      <div
                        style={{ marginLeft: redTeam?.operative ? "20px" : 0 }}
                        className={styles.joinTeamContainer}
                        onClick={() =>
                          handleJoinTeamAndRole(
                            TEAM_COLOR.red,
                            PLAYER_ROLES.operative
                          )
                        }
                      >
                        <span>+ Join Operative</span>
                      </div>
                    )}
                  </div>
                  <span>Spymaster</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {redTeam?.spymaster ? (
                      <div className={styles.scoreboardPlayer}>
                        {redTeam.spymaster.playerName}
                      </div>
                    ) : (
                      <div
                        className={styles.joinTeamContainer}
                        onClick={() =>
                          handleJoinTeamAndRole(
                            TEAM_COLOR.red,
                            PLAYER_ROLES.spymaster
                          )
                        }
                        style={{ marginLeft: redTeam?.spymaster ? "20px" : 0 }}
                      >
                        <span>+ Join Spymaster</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className={styles.scoreboardScore}>8</span>
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
                <span className={styles.scoreboardScore}>8</span>
                <div className={styles.scoreboardTeamContainer}>
                  <span>Operative</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {blueTeam?.operative ? (
                      <div className={styles.scoreboardPlayer}>
                        {blueTeam.operative.playerName}
                      </div>
                    ) : (
                      <div
                        className={styles.joinTeamContainer}
                        onClick={() =>
                          handleJoinTeamAndRole(
                            TEAM_COLOR.blue,
                            PLAYER_ROLES.operative
                          )
                        }
                        style={{ marginLeft: blueTeam?.operative ? "20px" : 0 }}
                      >
                        <span>+ Join Operative</span>
                      </div>
                    )}
                  </div>
                  <span>Spymaster</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {blueTeam?.spymaster ? (
                      <div className={styles.scoreboardPlayer}>
                        {blueTeam.spymaster.playerName}
                      </div>
                    ) : (
                      <div
                        className={styles.joinTeamContainer}
                        onClick={() =>
                          handleJoinTeamAndRole(
                            TEAM_COLOR.blue,
                            PLAYER_ROLES.spymaster
                          )
                        }
                        style={{ marginLeft: blueTeam?.spymaster ? "20px" : 0 }}
                      >
                        <span>+ Join Spymaster</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
