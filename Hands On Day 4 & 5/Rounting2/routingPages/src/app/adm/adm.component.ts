import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {

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

    }

  gotoHome(){
    this.router.navigate(['/home/user']);
  }

  }


