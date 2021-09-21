import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home/home.component';
import { AdmComponent } from './adm/adm.component';
import { ErrorComponent } from './error/error.component';

import { LoginGuard } from './login.guard';
import { AdminGuard } from './admin.guard';




const routes: Routes = [
  { path: '' , redirectTo: '/login' , pathMatch:'full'},
  { path: 'login' , component: LoginComponent },

  {path: 'signup',
  loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },

  {path: 'home/admin', canActivate: [AdminGuard],
    component: AdmComponent},

    

  { path: 'home', component: HomeComponent, canActivate: [LoginGuard],
  children:[
    
    {path: 'user',
     loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
   
    
  ] },

  { path: '**', component: ErrorComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
