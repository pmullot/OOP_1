import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { IHuman } from './models/humans.model';
import { ITransformer } from './models/transformers.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(protected _afs: AngularFirestore) {}

  //#region TRANSFORMERS

  public getTransformers$(): Observable<ITransformer[]> {
    return this._afs
      .collection<ITransformer>('transformers')
      .valueChanges()
      .pipe(share());
  }

  public getOneTransformer(id: string): Observable<ITransformer> {
    return this._afs
      .doc<ITransformer>(`transformers/${id}`)
      .valueChanges()
      .pipe(share());
  }

  public saveTransformer(transformer: ITransformer, isNew: boolean): Promise<void> {
    transformer = this.addId(transformer) as ITransformer;
    return this._afs.doc(`transformers/${transformer.id}`).set(transformer, { merge: !isNew });
  }

  public deleteTransformer(id: string): Promise<void> {
    return this._afs.doc(`transformers/${id}`).delete();
  }

  //#endregion TRANSFORMERS

  //#region HUMANS

  public getHumans$(): Observable<IHuman[]> {
    return this._afs
      .collection<IHuman>('humans')
      .valueChanges()
      .pipe(share());
  }

  public getOneHuman(id: string): Observable<IHuman> {
    return this._afs
      .doc<IHuman>(`humans/${id}`)
      .valueChanges()
      .pipe(share());
  }

  public saveHuman(human: IHuman, isNew: boolean): Promise<void> {
    human = this.addId(human) as IHuman;
    return this._afs.doc(`humans/${human.id}`).set(human, { merge: !isNew });
  }

  public deleteHuman(id: string): Promise<void> {
    return this._afs.doc(`humans/${id}`).delete();
  }

  //#endregion TRANSFORMERS

  //#region HELPER FUNCTIONS
  public addId(actor: ITransformer | IHuman): ITransformer | IHuman {
    if (!actor.id) {
      actor.id = this._afs.createId();
    }
    return { ...actor };
  }

  //#endregion HELPER FUNCTIONS
}
