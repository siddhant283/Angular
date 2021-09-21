import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
  }

  toNewPage(){
    this.router.navigate(['/newPage']);
  }

}
