import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogElementsExampleDialog } from './app.component';
import { AdminLoginDialog } from './AppGuards/admin.guard';
import { UserLoginDialog } from './AppGuards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { DatabaseComponent } from './database/database.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { SignupComponent } from './signup/signup.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminComponent } from './admin/admin.component';
import { SubjectComponent } from './subjects/subject.component';
import { ServerdbComponent } from './serverdb/serverdb.component';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DatabaseComponent,
    SignupComponent,
    DialogElementsExampleDialog,
    AdminLoginDialog,
    UserLoginDialog,
    AdminComponent,
    SubjectComponent,
    ServerdbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    NbThemeModule.forRoot()
  ],
  entryComponents: [
    DialogElementsExampleDialog,
    AdminLoginDialog,
    UserLoginDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
