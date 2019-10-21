import { Player, PlayerPosition } from '../entities/player';
import { PlayerDetails } from "../entities/player";

interface RawPlayer {
  player: string,
  price: number,
  id: number
}
export type PlayersResponse = Record<
  PlayerPosition,
  RawPlayer[]
>[];

export interface PlayerDetailsResponse {
  weight: string;
  height: string;
  image: string;
  'dominant-hand': 'RHD' | 'LHD';
  position: 'lead' | 'second' | 'third' | 'skip';
  nationality: string;
}

export type PlayersByPositions = Record<PlayerPosition, Player[]>;

export async function getPlayers(): Promise<PlayersByPositions> {
  const res = await fetch(`/playerList.json`);
  const json = JSON.parse(await res.text());
  const rawPlayers = json as PlayersResponse;
  return rawPlayers.reduce<PlayersByPositions>(
    (players, data) => {
      for (const key of Object.keys(data)) {
        const position = key as PlayerPosition;
        players[position].push(...mapPlayers(data[position]));
      }
      return players;
    },
    { lead: [], second: [], third: [], skip: [] }
  );
}

export async function getPlayerDetails(playerId: number): Promise<PlayerDetails> {
  const res = await fetch(`/playerDetail/${playerId}.json`);
  const rawPlayerDetails = await res.json() as PlayerDetailsResponse;
  return convertDetails(rawPlayerDetails);
}

function convertDetails(rawDetails: PlayerDetailsResponse): PlayerDetails {
  const {image, nationality, position, 'dominant-hand': dominantHand} = rawDetails;
  const weight = parseFloat(rawDetails.weight);
  const height = parseFloat(rawDetails.height);
  return {
    image,
    nationality,
    position,
    weight,
    height,
    dominantHand
  };
}


function mapPlayers(rawPlayers: RawPlayer[]): Player[] {
  return rawPlayers.map(({id, player, price}) => ({
    id,
    price,
    name: player
  }));
}
