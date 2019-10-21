import React from 'react';
import { Player, DetailedPlayer } from '../../entities/player';
import { PlayerDetails } from '../PlayerDetails/PlayerDetails';
import { PlayersList } from '../PlayersList/PlayersList';

interface Props {
  name: string;
  players: Player[];
  selectedPlayer: DetailedPlayer | null;
  onPlayerSelect: (playerId: number) => void;
  onPlayerDeselect: (playerId: number) => void;
}

export const PositionSelect: React.FC<Props> = (props) => (
  <>
    <h3>{props.name}</h3>
    <PlayerDetails
      player={props.selectedPlayer}
      onPlayerDeselect={props.onPlayerDeselect}
    />
    <PlayersList
      players={props.players}
      onPlayerSelect={props.onPlayerSelect}
    />
  </>
);
