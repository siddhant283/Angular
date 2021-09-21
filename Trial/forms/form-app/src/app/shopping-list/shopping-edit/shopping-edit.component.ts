import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  userName: string = 'Siddhant';
  passwordCheck: string;
  passwordMatch:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f);  
    console.log(this.userName);
  }

  checkPassword(event: Event)
  {
    console.log(this.passwordCheck);
    console.log(this.passwordMatch);
    
    if(this.passwordCheck==(<HTMLInputElement>event.target).value)
    {
      this.passwordMatch=true;
    }
  }
 
}
