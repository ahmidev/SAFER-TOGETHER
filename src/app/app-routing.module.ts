import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MessageComponent } from './message/message.component';
import { ProfilComponent } from './profil/profil.component';
import { SaferListComponent } from './safer-list/safer-list.component';


const routes: Routes = [
  {path:'', component: ConnexionComponent},
  {path:'connexion', component: ConnexionComponent},
  {path:'inscription', component: InscriptionComponent},
  {path:'home', component: HomeComponent},
  {path:'message', component: MessageComponent},
  {path:'profil', component: ProfilComponent},
  {path:'discussion', component: DiscussionComponent},
  { path: "safer-list", component: SaferListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
