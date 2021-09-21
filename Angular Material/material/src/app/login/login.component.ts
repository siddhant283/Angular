import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormGroupDirective,NgForm,FormControl, Validators, FormArray} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { InteractionService } from "../AppServices/interaction.service";
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  loginForm: FormGroup;
  public model: any = {};
  public admin: any ={};
  invalidCredentials: boolean = false;
  loginSuccessful: boolean = false;

   constructor(private fb: FormBuilder, private userService: InteractionService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  verifyUser()
  {

    this.model = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }
    
    if(this.model.username=="ankit.patel" && this.model.password=="ankit1212"){
  
      this.loginSuccessful=true;
  
      this.admin = {
            firstname: 'Ankit',
            lastname: 'Patel',
            username: 'ankit.patel',
            email: 'ankit.patel@gmail.com',
            phone: '9672805641',
            subjects: [{name: 'System Administrator'}],
            password: 'ankit1212',
            age: 23
            }
  
            localStorage.setItem("userLoggedIn", JSON.stringify(this.admin));
  
            this.userService.verifyUser = true;
            this.userService.verifyAdmin = true;
            this.userService.toggleLogoutButton();
  
            setTimeout(()=>{
              this.router.navigate(['/dashboard/user'])
            },1000)
            return;
     
    }
  
  
    else if (localStorage.getItem("users") === null) {
  
  
        this.invalidCredentials = true;
        this.loginSuccessful = false;
  
    }
  
    else {
        console.log("I am here.");
        var allUsers = JSON.parse(localStorage.getItem("users"));
       
         for(let i=0;i<allUsers.length;i++)
         {
           
           if((allUsers[i].username == this.model.username && allUsers[i].password == this.model.password)
               )
           {
            console.log("I am passed");
             this.loginSuccessful=true;
             this.userService.verifyUser=true;
             this.userService.toggleLogoutButton();
            
             this.model = allUsers[i];
             localStorage.setItem("userLoggedIn", JSON.stringify(this.model));
  
             setTimeout(()=>{
               this.router.navigate(['/dashboard/user'])
             },1000)
             return;
  
  
             
           }
  
         }
        
        
         this.invalidCredentials = true;
         this.loginSuccessful = false;
  
  }
  
  }

  matcher = new MyErrorStateMatcher();

}
