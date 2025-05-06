import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { RootState } from "@/lib/store";

export const selectMyPlayerInLobby = (state: RootState) => {
  const { playerName } = state.player;
  return state.lobby?.lobby?.players?.find(
    (player) => player.playerName === playerName
  );
};

export const selectIsHost = (state: RootState) => {
  const { playerName } = state.player;
  return state.lobby.lobby?.host === playerName;
};

export const selectMyPlayerInGame = (state: RootState) => {
  const { playerName } = state.player;  

  return  state.game?.game?.players.find(
    (player) => player.playerName === playerName
  );
};

export const selectPlayerFromGameByRole =
  (role: PLAYER_ROLES) => (state: RootState) => {
    return state.game.game?.players.find((e) => e.role === role);
  };
