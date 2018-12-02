import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { Persister } from '../../baseClasses/Persister';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.sass']
})
export class TransformersComponent extends Persister implements OnInit {
  constructor(protected fb: FirebaseService) {
    super(fb, 'Transformer');
  }

  ngOnInit() {}
}
