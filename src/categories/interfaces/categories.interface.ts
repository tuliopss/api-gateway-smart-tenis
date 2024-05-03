import { Document } from 'mongoose';
// import { Player } from 'src/players/interfaces/Player.interface';

export interface Category {
  readonly _id: string;
  category: string;
  description: string;
  events: Array<Evento>;
}

export interface Evento {
  name: string;
  operation: string;
  value: number;
}
