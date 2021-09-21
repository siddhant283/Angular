import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Service1Service } from '../service1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: any = {};
  public admin: any ={};
  invalidCredentials: boolean = false;
  loginSuccessful: boolean = false;

  onSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
    this.verifyUser();
  }

  constructor(private router: Router, private route: ActivatedRoute, private validationService: Service1Service) { }

  ngOnInit(): void {

    // this.loadAdmin();
    this.validationService.verifyAdmin=false;
    this.validationService.verifyUser=false;

    
  }


 

 verifyUser()
{
  
  if(this.model.username=="ankit.patel" && this.model.password=="ankit1212"){

    this.loginSuccessful=true;

    this.admin = {
          firstName: 'Ankit',
          lastName: 'Patel',
          username: 'ankit.patel',
          email: 'ankit.patel@gmail.com',
          phone: '9672805641',
          project: 'GraphQL',
          password: 'ankit1212'
          }

          localStorage.setItem("userLoggedIn", JSON.stringify(this.admin));

          this.validationService.verifyUser = true;
          this.validationService.verifyAdmin = true;

          setTimeout(()=>{
            this.router.navigate(['/home/user'])
          },1000)
          return;

          
      
  }


  else if (localStorage.getItem("users") === null) {


      this.invalidCredentials = true;
      this.loginSuccessful = false;

  }

  else {

      var allUsers = JSON.parse(localStorage.getItem("users"));
     
       for(let i=0;i<allUsers.length;i++)
       {
         
         if((allUsers[i].username == this.model.username && allUsers[i].password == this.model.password)
             )
         {
          
           this.loginSuccessful=true;
           this.validationService.verifyUser=true;
          
           this.model = allUsers[i];
           localStorage.setItem("userLoggedIn", JSON.stringify(this.model));



           setTimeout(()=>{
             this.router.navigate(['/home/user'])
           },1000)
           return;


           
         }

         

       }
      
      
       this.invalidCredentials = true;
       this.loginSuccessful = false;




}

}


  onSelect(){

    // this.router.navigate(['/departments', department.id])
    this.router.navigate(['signup'],{relativeTo: this.route})
    
  }


}
