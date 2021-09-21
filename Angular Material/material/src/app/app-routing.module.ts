import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DatabaseComponent } from './database/database.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ServerdbComponent } from './serverdb/serverdb.component';

import { LoginGuard } from './AppGuards/login.guard';
import { AdminGuard } from './AppGuards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'serverdb', component: ServerdbComponent, canActivate: [AdminGuard] },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
