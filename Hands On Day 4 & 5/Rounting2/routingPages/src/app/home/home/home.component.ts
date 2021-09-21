import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Service1Service } from '../../service1.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  model: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private validationService: Service1Service) { }

  ngOnInit(): void {
    console.log('user class active');
    this.model = JSON.parse(localStorage.getItem("userLoggedIn"));
   
  }

  toAdminPage(){
    this.router.navigate(['/home/admin']);
  }

  

}
