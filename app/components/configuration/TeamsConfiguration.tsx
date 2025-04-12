import { selectPlayers, setPlayer } from "@/lib/features/lobby";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

interface ColorAndRole {
  teamColor: TEAM_COLOR;
  role: PLAYER_ROLES;
}

const TeamsConfiguration: React.FC = () => {
  const dispatch = useDispatch();

  const players = useSelector(selectPlayers);

  function findPlayerFromColorAndRole(
    teamColor: TEAM_COLOR,
    role: PLAYER_ROLES
  ): Player | undefined {
    return players?.find((p) => p.role === role && p.team === teamColor);
  }

  return [
    [
      { teamColor: TEAM_COLOR.RED, role: PLAYER_ROLES.RED_SPYMASTER },
      { teamColor: TEAM_COLOR.BLUE, role: PLAYER_ROLES.BLUE_SPYMASTER },
    ],

    [
      { teamColor: TEAM_COLOR.RED, role: PLAYER_ROLES.RED_OPERATIVE },
      { teamColor: TEAM_COLOR.BLUE, role: PLAYER_ROLES.BLUE_OPERATIVE },
    ],
  ].map((colorAndRole, i) => (
    <Form.Item key={i}>
      <div style={{ display: "flex", width: "100%", gap: "10px" }}>
        {colorAndRole.map(({ teamColor, role }: ColorAndRole, i) => {
          const value = findPlayerFromColorAndRole(teamColor, role);
          const splittedRole = role.split("_");

          return (
            <div key={i} style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontFamily: "Special Elite",
                  color: "white",
                }}
              >
                {splittedRole[0][0] +
                  splittedRole[0].substring(1).toLowerCase()}{" "}
                {splittedRole[1][0] +
                  splittedRole[1].substring(1).toLowerCase()}
              </label>
              <Select
                value={value?.playerName}
                onChange={(p) => {
                  const newPlayer: Player = {
                    playerName: p,
                    role: role,
                    team: teamColor,
                  };
                  dispatch(setPlayer(newPlayer));
                }}
                style={{ color: "white" }}
              >
                {players?.map((player) => {
                  return (
                    <Select.Option
                      key={player.playerName}
                      value={player.playerName}
                    >
                      {player.playerName}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          );
        })}
      </div>
    </Form.Item>
  ));
};

export default TeamsConfiguration;
