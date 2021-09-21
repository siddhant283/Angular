import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';

const MaterialComponenets = [ MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatMenuModule, MatFormFieldModule];



@NgModule({
  declarations: [],
  imports: [MaterialComponenets],
  exports: [MaterialComponenets]
})
export class MaterialModuleModule { }
