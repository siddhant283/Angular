import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewpageComponent } from './newpage/newpage.component';
import { ParentComponent} from './parent/parent.component'

const routes: Routes = [
  { path: '' , redirectTo: '/home' , pathMatch:'full'},
  { path: 'home' , component: ParentComponent },
  { path: 'newPage' , component: NewpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
