import { selectTurn } from "@/lib/features/game";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { useSelector } from "react-redux";
import { selectMyPlayerInGame } from "../../utils/helpers";
import MakeGuess from "./buttons/MakeGuess";
import SkipGuess from "./buttons/SkipGuess";
import HintForm from "@/components/ClueForm";
import { TEAM_COLOR } from "@/lib/features/game/team.types";

// Message to display when is not your turn
const waitMessage = (text: string) => (
  <span
    style={{
      fontFamily: "Special Elite",
      color: "white",
      fontSize: "20px",
    }}
  >
    {text}
  </span>
);

// Method that converts a role to a team color
function playerRoleToTeamColor(playerRole: PLAYER_ROLES): TEAM_COLOR {
  if (playerRole.startsWith("RED")) return TEAM_COLOR.RED;
  else if (playerRole.startsWith("BLUE")) return TEAM_COLOR.BLUE;
  throw new Error(`Unknown player role: ${playerRole}`);
}

// Helpers
const isOperative = (role: PLAYER_ROLES) =>
  role === PLAYER_ROLES.RED_OPERATIVE || role === PLAYER_ROLES.BLUE_OPERATIVE;

const isSpymaster = (role: PLAYER_ROLES) =>
  role === PLAYER_ROLES.RED_SPYMASTER || role === PLAYER_ROLES.BLUE_SPYMASTER;

export const ActionElement = () => {
  const myPlayer = useSelector(selectMyPlayerInGame);
  const turn = useSelector(selectTurn);

  // Validate necessary state
  if (!myPlayer || !turn || !myPlayer?.role || !myPlayer?.team) {
    return null;
  }

  const currentTeamColor = playerRoleToTeamColor(turn);
  const isMyTurn = currentTeamColor === myPlayer?.team;
  const isMyRoleTurn = myPlayer?.role === turn;

  if (!isMyTurn) return waitMessage("Waiting for the next turn...");
  if (isMyTurn && !isMyRoleTurn) {
    if (isOperative(myPlayer.role)) return waitMessage("Wait for the clue...");
    if (isSpymaster(myPlayer.role)) return waitMessage("Wait for the guess...");
  }

  // It is my turn and role matches
  if (isOperative(myPlayer.role)) {
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <MakeGuess /> <SkipGuess />
      </div>
    );
  }

  if (isSpymaster(myPlayer.role)) {
    return <HintForm />;
  }

  return null;
};
