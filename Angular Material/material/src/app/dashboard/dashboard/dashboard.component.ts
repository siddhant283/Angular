import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InteractionService } from "../../AppServices/interaction.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  model: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private validationService: InteractionService) { }

  ngOnInit(): void {
    console.log('user class active');
    this.model = JSON.parse(localStorage.getItem("userLoggedIn"));
  }

  toAdminPage(){
    this.router.navigate(['/dashboard/admin']);
  }

  

}
