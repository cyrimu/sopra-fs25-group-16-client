import React from 'react';
import { Player, PLAYER_ROLES } from '@/lib/features/player/player.types';
import { TEAM_COLOR } from '@/lib/features/lobby/team.types';
import styles from '@/styles/page.module.css';

interface PlayerTableProps {
    players: Player[];
    gameType: string;
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, gameType }) => {
    return (
        <>
            <div className={styles.messageField} style={{ width: '100%', padding: '30px', height: 'auto', fontSize: '20px' }}>
                Mode: {gameType}
            </div>
            <br />
            <table className={styles.tableField}>
                <thead>
                <tr>
                    <th>codename</th>
                    <th>team</th>
                    <th>role</th>
                </tr>
                </thead>
                <tbody>
                {players.map(({ playerName, team, role }, index) => (
                    <tr key={index}>
                        <td>{playerName}</td>
                        <td>
                            {team ? TEAM_COLOR[team].charAt(0).toUpperCase() + TEAM_COLOR[team].slice(1) : 'N/A'}
                        </td>
                        <td>
                            {role ? PLAYER_ROLES[role].charAt(0).toUpperCase() + PLAYER_ROLES[role].slice(1) : 'N/A'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default PlayerTable;