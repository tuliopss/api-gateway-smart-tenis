import { Category } from 'src/categories/interfaces/categories.interface';

export interface Player {
  readonly _id: string;
  readonly phone: string;
  readonly email: string;
  category: Category;
  name: string;
  ranking: string;
  positionRanking: number;
  urlPlayerPhoto: string;
}
