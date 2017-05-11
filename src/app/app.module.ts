import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddlistingComponent } from './components/addlisting/addlisting.component';
import { EditlistingComponent } from './components/editlisting/editlisting.component';
import { ListingComponent } from './components/listing/listing.component';

// export const firebaseConfig = {
//     apiKey: "AIzaSyBCtP6io3YvqIrfjOgXmFxN8YfUjxxVxzE",
//     authDomain: "kadap-1ec3a.firebaseapp.com",
//     databaseURL: "https://kadap-1ec3a.firebaseio.com",
//     projectId: "kadap-1ec3a",
//     storageBucket: "kadap-1ec3a.appspot.com",
//     messagingSenderId: "279721323291"  
// };

// const firebaseAuthConfig = {
//   provider: AuthProviders.Google,
//   method: AuthMethods.Popup
// };

const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'listings', component:ListingsComponent},
  {path: 'listing/:id', component:ListingComponent},
  {path: 'addlistings', component:AddlistingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    AddlistingComponent,
    EditlistingComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
