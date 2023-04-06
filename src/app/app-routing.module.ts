import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MessageComponent } from './message/message.component';
import { ParentMapComponent } from './parent-map/parent-map.component';
import { ProfilComponent } from './profil/profil.component';
import { SaferListComponent } from './safer-list/safer-list.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'inscription', component: InscriptionComponent},
  {path:'connexion', component: ConnexionComponent},
  {path:'register', component: ConfirmRegistrationComponent},
  {path:'parentmap', component: ParentMapComponent},
  {path:'message', component: MessageComponent,canActivate: [AuthGuard]},
  {path:'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path:'discussion', component: DiscussionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
