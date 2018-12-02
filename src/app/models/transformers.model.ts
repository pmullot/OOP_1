import { IHero } from './hero.model';

export interface ITransformer extends IHero {
  wheels: number;
  wings: number;
  clan: string;
}
