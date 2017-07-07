import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { ItqComponent } from './itq/itq.component';
import { ItqListComponent } from './itq/list.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: ItqListComponent, canActivate: [AuthGuardLogin] },
  { path: 'help', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'itqs', component: ItqListComponent , canActivate: [AuthGuardLogin]},
  { path: 'itq/:id', component: ItqComponent , canActivate: [AuthGuardLogin]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardAdmin]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardLogin]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardAdmin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
