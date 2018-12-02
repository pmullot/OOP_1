import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { skipWhile } from 'rxjs/operators';
import { Persister } from 'src/app/baseClasses/Persister';
import { FirebaseService } from 'src/app/firebase.service';
import { ITransformer } from 'src/app/models/transformers.model';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.sass']
})
export class TransformersComponent extends Persister implements OnInit {
  public transformerForm: FormGroup;

  constructor(protected fb: FirebaseService) {
    super(fb, 'Transformer');

    this.transformerForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      wheels: new FormControl(null, Validators.required),
      wings: new FormControl(null),
      clan: new FormControl(null),
      photo: new FormControl(null)
    });
  }

  ngOnInit() {
    this.selectedHero
      .asObservable()
      .pipe(skipWhile(h => !h))
      .subscribe(hero => {
        const transformer = hero as ITransformer;
        this.transformerForm.patchValue(transformer);
        this.transformerForm.markAsPristine();
      });
  }

  public cancel(): void {
    this.transformerForm.patchValue(this.selectedHero.value);
    this.transformerForm.markAsPristine();
  }

  public createNew() {
    let t: ITransformer = {
      id: null,
      name: '',
      clan: '',
      wheels: null,
      wings: null,
      photo: ''
    };
    t = this.fb.addId(t) as ITransformer;
    this.selectedHero.next(t);
  }
}
