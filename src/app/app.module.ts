import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { MapComponent } from './map/map.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { MessageComponent } from './message/message.component';
import { SaferListComponent } from './safer-list/safer-list.component';
import { environment } from 'src/environnements/environnement';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfilComponent } from './user-profil/user-profil.component';

@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    HomeComponent,
    ConnexionComponent,
    InscriptionComponent,
    ProfilComponent,
    MapComponent,
    DiscussionComponent,
    MessageComponent,
    SaferListComponent,
    UserProfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AgmCoreModule.forRoot({apiKey: environment.googleApiKey}), FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
