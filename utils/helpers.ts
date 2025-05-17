import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { RootState } from "@/lib/store";

export const selectMyPlayerInLobby = (state: RootState) => {
  const { username } = state.player;
  return state.lobby?.lobby?.players?.find(
    (player) => player.playerName === username
  );
};

export const selectIsHostInLobby = (state: RootState) => {
  const { username } = state.player;
  return state.lobby.lobby?.host === username;
};

export const selectIsHostInGame = (state: RootState) => {
  const {username} = state.player
  return state.game.game?.host === username
}

export const selectMyPlayerInGame = (state: RootState) => {
  const { username } = state.player;

  return state.game?.game?.players.find(
    (player) => player.playerName === username
  );
};

export const selectPlayerFromGameByRole =
  (role: PLAYER_ROLES) => (state: RootState) => {
    return state.game.game?.players.find((e) => e.role === role);
  };
