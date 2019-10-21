import React from 'react';
import { PlayerPosition, Player, DetailedPlayer } from '../../entities/player';
import { getPlayers, getPlayerDetails, PlayersByPositions } from '../../api/player.api';
import { PositionSelect } from '../PositionSelect/PositionSelect';
import './TeamDraft.css';
import { Button } from 'antd/lib/radio';
import { capitalizeString } from '../../util/string';
import { message } from 'antd';

type Team = Record<PlayerPosition, DetailedPlayer | null>;

interface Props {
  budgetLimit: number;
}

interface State {
  team: Team;
  players: PlayersByPositions;
}

export class TeamDraft extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      team: {
        lead: null,
        second: null,
        third: null,
        skip: null,
      },
      players: {
        lead: [],
        second: [],
        third: [],
        skip: []
      }
    };
  }

  componentDidMount() {
    this.fetchPlayers();
  }

  async fetchPlayers() {
    const players = await getPlayers();
    this.setState({
      ...this.state,
      players
    });
  }

  async fetchDetailedPlayer(player: Player) {
    const details = await getPlayerDetails(player.id);
    this.setTeamPlayer(details.position, { ...player, ...details });
  }

  setTeamPlayer(position: PlayerPosition, player: DetailedPlayer | null) {
    this.setState({
      ...this.state,
      team: {
        ...this.state.team,
        [position]: player
      }
    });
  }

  createPlayerSelectHandler = (position: PlayerPosition) => (playerId: number) => {
    const player = this.state.players[position].find(player => player.id === playerId)!;
    this.fetchDetailedPlayer(player);
  }

  createPlayerDeselectHandler = (position: PlayerPosition) => () => {
    this.setTeamPlayer(position, null);
  }

  /**
   * Validates current team state
   *
   * @returns either error message or null
   */
  validateTeam(): string | null {
    const areAllPlayersSelected = Object.values(this.state.team).every(player => player !== null);
    if (!areAllPlayersSelected) {
      return 'Players for all the roles should be selected';
    }
    const isBudgetOk = this.props.budgetLimit >= this.computeTeamBudget();
    if (!isBudgetOk) {
      return 'You have exceeded budget';
    }
    return null;
  }

  handleSubmit = () => {
    const error = this.validateTeam();
    if (error === null) {
      // do API call
      message.success('Nice team!');
    } else {
      message.error(error);
    }
  }

  computeTeamBudget(): number {
    let budget = 0;
    for (const key of Object.keys(this.state.team)) {
      const position = key as PlayerPosition;
      const player = this.state.team[position];
      budget += player ? player.price : 0;
    }
    return budget;
  }

  render() {
    const positions: PlayerPosition[] = ['lead', 'second', 'third', 'skip'];
    return (
      <div className="team-draft">
        <div className="budget-info">
          <div>Total budget: {this.props.budgetLimit}</div>
          <div>Budget left: {this.props.budgetLimit - this.computeTeamBudget()}</div>
        </div>
        <div className="submit-area">
          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div className="team-container">
          {positions.map(position => (
            <div className="position-container" key={position}>
              <PositionSelect
                name={capitalizeString(position)}
                players={this.state.players[position]}
                selectedPlayer={this.state.team[position]}
                onPlayerSelect={this.createPlayerSelectHandler(position)}
                onPlayerDeselect={this.createPlayerDeselectHandler(position)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
