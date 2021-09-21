import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SubjectsComponent } from './subjects/subjects.component';
import { InteractionService } from './AppServices/interaction.service';
import { FetchDataComponent } from './fetch-data/fetch-data.component';





@NgModule({
  declarations: [
    AppComponent,
    SubjectsComponent,
    FetchDataComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [InteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
