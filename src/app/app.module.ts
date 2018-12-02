import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { FirebaseService } from './firebase.service';
import { HumansComponent } from './heroes/humans/humans.component';
import { TransformersComponent } from './heroes/transformers/transformers.component';

@NgModule({
  declarations: [AppComponent, TransformersComponent, HumansComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fb),
    AngularFirestoreModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
