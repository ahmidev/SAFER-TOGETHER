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
import { UserProfilComponent } from './user-profil/user-profil.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'admin', component: AdminComponent, canActivate: [AdminGuard] },
  {path:'inscription', component: InscriptionComponent},
  {path:'connexion', component: ConnexionComponent},
  { path: 'request-reset-password', component: RequestResetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path:'register', component: ConfirmRegistrationComponent},
  {path:'userprofil', component: UserProfilComponent,canActivate: [AuthGuard]},
  {path:'parentmap', component: ParentMapComponent,canActivate: [AuthGuard]},
  {path:'message', component: MessageComponent,canActivate: [AuthGuard]},
  {path:'profil/:id', component: ProfilComponent, canActivate: [AuthGuard]},
  {path:'discussion/:id', component: DiscussionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
