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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { ParentMapComponent } from './parent-map/parent-map.component';
import { AuthInterceptor } from './Services/auth.interceptor';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AdminComponent } from './admin/admin.component';


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
    ConfirmRegistrationComponent,
    RgpdComponent,
    SaferListComponent,
    ParentMapComponent,
    MapComponent,
    AdminComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AgmCoreModule.forRoot({apiKey: environment.googleApiKey}), FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, 
    },Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
