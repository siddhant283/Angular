import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  model: any = {};
  alreadyRegisteredUsername: boolean = false;
  alreadyRegisteredEmail: boolean = false;
  alreadyRegisteredPhone: boolean = false;
  successfulRegistration: boolean = false;

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
    this.addUser();

  }

  constructor() { }

  ngOnInit(): void {
  }


  addUser() {

    this.alreadyRegisteredEmail = false;
    this.alreadyRegisteredUsername = false;
    this.alreadyRegisteredPhone=false;
    this.successfulRegistration=false;
    
    if (localStorage.getItem("users") === null) {

      var allUsers = [];
      allUsers.push(this.model);
      localStorage.setItem("users", JSON.stringify(allUsers));
      this.successfulRegistration = true;
    }

    else {
      {
        var allUsers: any[] = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].username == this.model.username) {

            this.alreadyRegisteredUsername = true;

          }

          if (allUsers[i].email == this.model.email) {


            this.alreadyRegisteredEmail = true;


          }

          
          if (allUsers[i].phone == this.model.phone) {


            this.alreadyRegisteredPhone = true;

           
          }
        }

        if(this.alreadyRegisteredUsername || this.alreadyRegisteredEmail || this.alreadyRegisteredPhone){
          return;
        }

        else{
          allUsers.push(this.model);
          localStorage.setItem("users", JSON.stringify(allUsers));
          this.successfulRegistration = true;
         
        }
      }

    }
  }
}
