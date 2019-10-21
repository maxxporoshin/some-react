export type DominantHand = 'RHD' | 'LHD';

export type PlayerPosition = 'lead' | 'second' | 'third' | 'skip';

export interface Player {
  id: number;
  name: string;
  price: number;
}

export interface PlayerDetails {
  weight: number;
  height: number;
  image: string;
  position: PlayerPosition;
  dominantHand: DominantHand;
  nationality: string;
}

export interface DetailedPlayer extends Player, PlayerDetails {}
