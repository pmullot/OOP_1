import { Component, OnInit } from '@angular/core';
import { Persister } from 'src/app/baseClasses/Persister';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-humans',
  templateUrl: './humans.component.html',
  styleUrls: ['./humans.component.sass']
})
export class HumansComponent extends Persister implements OnInit {
  constructor(protected fb: FirebaseService) {
    super(fb, 'Human');
  }

  ngOnInit() {}
}
