import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  model: any = {};
  

  constructor() { }

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

      



  }

}
