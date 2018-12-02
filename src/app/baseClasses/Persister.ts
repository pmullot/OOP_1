import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { IHero } from '../models/hero.model';
import { IHuman } from '../models/humans.model';
import { ITransformer } from '../models/transformers.model';

export class Persister implements OnDestroy {
  public heroes$: Observable<ITransformer[] | IHuman[]>;
  public selectedHero: BehaviorSubject<ITransformer | IHuman> = new BehaviorSubject(null);

  protected getOneSub: Subscription;

  constructor(protected fb: FirebaseService, protected race: 'Transformer' | 'Human') {
    this.heroes$ = this.race === 'Transformer' ? this.fb.getTransformers$() : this.fb.getHumans$();
  }

  ngOnDestroy(): void {
    if (this.getOneSub && !this.getOneSub.closed) {
      this.getOneSub.unsubscribe();
    }
  }

  public delete(actor: ITransformer | IHuman): Promise<void> {
    return this.race === 'Transformer' ? this.fb.deleteTransformer(actor.id) : this.fb.deleteHuman(actor.id);
  }

  public add(actor: ITransformer | IHuman): Promise<void> {
    return this.race === 'Transformer'
      ? this.fb.saveTransformer(actor as ITransformer, true)
      : this.fb.saveHuman(actor as IHuman, true);
  }

  public save(actor: ITransformer | IHuman): Promise<void> {
    return this.race === 'Transformer'
      ? this.fb.saveTransformer(actor as ITransformer, false)
      : this.fb.saveHuman(actor as IHuman, false);
  }

  public getOne$(id: string): Observable<ITransformer | IHuman> {
    return this.race === 'Transformer' ? this.fb.getOneTransformer(id) : this.fb.getOneHuman(id);
  }

  public selectHero(hero: IHero): void {
    this.getOneSub = this.getOne$(hero.id).subscribe(h => this.selectedHero.next(h));
  }
}
