import {
  selectBlueTeam,
  selectRedTeam,
  selectPlayers,
  setRedTeam,
  setBlueTeam,
} from "@/lib/features/lobby";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

const TeamsConfiguration: React.FC = () => {
  const dispatch = useDispatch();

  const blueTeam = useSelector(selectBlueTeam);
  const redTeam = useSelector(selectRedTeam);

  const players = useSelector(selectPlayers);

  return [
    [redTeam?.spymaster, blueTeam?.spymaster],
    [redTeam?.operative, blueTeam?.operative],
  ].map((sameRolePlayers, rowIndex) => (
    <Form.Item key={rowIndex}>
      <div style={{ display: "flex", width: "100%", gap: "10px" }}>
        {sameRolePlayers.map((player, i) => (
          <div key={i} style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontFamily: "Special Elite",
                color: "white",
              }}
            >
              {player?.team === TEAM_COLOR.red ? "Red" : "Blue"}{" "}
              {player?.role === PLAYER_ROLES.spymaster
                ? "Spymaster"
                : "Operative"}
            </label>
            <Select
              value={player}
              onChange={(newPlayer) => {
                if (player?.role === PLAYER_ROLES.spymaster) {
                  dispatch(setRedTeam(newPlayer));
                } else {
                  dispatch(setBlueTeam(newPlayer));
                }
              }}
              style={{ color: "white" }}
            >
              {players.map((player) => (
                <Select.Option
                  key={player.playerName}
                  value={player.playerName}
                >
                  {player.playerName}
                </Select.Option>
              ))}
            </Select>
          </div>
        ))}
      </div>
    </Form.Item>
  ));
};

export default TeamsConfiguration;
