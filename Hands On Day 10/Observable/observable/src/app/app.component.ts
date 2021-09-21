import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observable';

  constructor(private router: Router, private route: ActivatedRoute) { }
  
  toNewPage(){
    this.router.navigate(['/newPage']);
  }

}
