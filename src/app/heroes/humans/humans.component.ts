import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { skipWhile } from 'rxjs/operators';
import { Persister } from 'src/app/baseClasses/Persister';
import { FirebaseService } from 'src/app/firebase.service';
import { IHuman } from 'src/app/models/humans.model';

@Component({
  selector: 'app-humans',
  templateUrl: './humans.component.html',
  styleUrls: ['./humans.component.sass']
})
export class HumansComponent extends Persister implements OnInit {
  public humanForm: FormGroup;

  constructor(protected fb: FirebaseService) {
    super(fb, 'Human');

    this.humanForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      sex: new FormControl(null, Validators.required),
      age: new FormControl(null),
      health: new FormControl(null),
      photo: new FormControl(null)
    });
  }

  ngOnInit() {
    this.selectedHero
      .asObservable()
      .pipe(skipWhile(h => !h))
      .subscribe(hero => {
        const human = hero as IHuman;
        this.humanForm.patchValue(human);
        this.humanForm.markAsPristine();
      });
  }

  public cancel(): void {
    this.humanForm.patchValue(this.selectedHero.value);
    this.humanForm.markAsPristine();
  }

  public createNew() {
    let t: IHuman = {
      id: null,
      name: '',
      age: null,
      health: null,
      sex: null,
      photo: ''
    };
    t = this.fb.addId(t) as IHuman;
    this.selectedHero.next(t);
  }
}
