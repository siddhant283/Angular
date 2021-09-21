import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomersModule { 
  constructor(){
    console.log('Customer Module Loaded')
  }
 }
