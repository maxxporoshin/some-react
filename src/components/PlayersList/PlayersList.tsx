import React from 'react';
import { Player } from '../../entities/player';
import { List } from 'antd';
import './PlayerList.css';

interface Props {
  players: Player[];
  onPlayerSelect: (playerId: number) => void;
}

export const PlayersList: React.FC<Props> = ({players, onPlayerSelect}) => (
  <List
    bordered
    dataSource={players}
    renderItem={player => (
      <List.Item className="player-list-item" onClick={() => onPlayerSelect(player.id)}>
        {player.name} - ${player.price}
      </List.Item>
    )}
  />
);
