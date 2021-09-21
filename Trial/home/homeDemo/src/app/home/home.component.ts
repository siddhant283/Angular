import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  model: any = {};
  

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log('admin component class active')

    this.model = {
      firstName: 'Ankit',
      lastName: 'Patel',
      username: 'ankit.patel',
      email: 'ankit.patel@gmail.com',
      phone: '9672805641',
      project: 'GraphQL',
      password: 'ankit1212'
      }

      // if (localStorage.getItem("users") === null) {

      //   var allUsers = [];
      //   allUsers.push(this.model);
      //   localStorage.setItem("users", JSON.stringify(allUsers));
      // }

      // else 
      //   {
      //     var allUsers: any[] = JSON.parse(localStorage.getItem("users"));
      //     allUsers.push(this.model);
      //     localStorage.setItem("users", JSON.stringify(allUsers));
      //   }  



  }

}
