import { IHero } from './hero.model';

type Sex = 'Male' | 'Female';

export interface IHuman extends IHero {
  sex: Sex;
  age: number;
  health: number;
}
