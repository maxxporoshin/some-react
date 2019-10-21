import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { DetailedPlayer } from '../../entities/player';
import './PlayerDetails.css';

interface Props {
  player: DetailedPlayer | null;
  onPlayerDeselect: (playerId: number) => void;
}

export const PlayerDetails: React.FC<Props> = ({player, onPlayerDeselect}) =>
  player ? (
    <Card
      actions={[
        <Button onClick={() => onPlayerDeselect(player.id)}>Remove</Button>
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={player.image} />}
        title={player.name}
        description={'$' + player.price}
      />
      <div>Weight: {player.weight}</div>
      <div>Height: {player.height}</div>
      <div>Dominant hand: {player.dominantHand}</div>
      <div>Nationality: {player.nationality}</div>
    </Card> ) : (
    <Card>
      Select player...
    </Card>
);