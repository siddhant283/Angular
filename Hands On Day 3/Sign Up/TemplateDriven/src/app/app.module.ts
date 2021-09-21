import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MustMatchDirective } from './_helpers/must-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
