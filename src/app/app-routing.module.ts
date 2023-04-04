import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MessageComponent } from './message/message.component';
import { ProfilComponent } from './profil/profil.component';
import { UserProfilComponent } from './user-profil/user-profil.component';


const routes: Routes = [
  {path:'', component: ConnexionComponent},
  {path:'connexion', component: ConnexionComponent},
  {path:'inscription', component: InscriptionComponent},
  {path:'home', component: HomeComponent},
  {path:'message', component: MessageComponent},
  {path:'profil', component: ProfilComponent},
  {path:'discussion', component: DiscussionComponent},
  {path:'userprofil', component: UserProfilComponent},
  {path:'user/:id', component:UserProfilComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
