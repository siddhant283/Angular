import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap, Router } from '@angular/router'


@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {


  departmentId;

  constructor( private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {

    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //this.departmentId = id;
    this.route.paramMap.subscribe((params:ParamMap) => {
      let id = parseInt(params.get('id'));
      this.departmentId = id;
    })
  }

  goPrevious(){
    let previousId = this.departmentId -1;
    this.router.navigate(['/departments',previousId]);
   
  }

  goNext(){
    let nextId = this.departmentId +1;
    this.router.navigate(['/departments',nextId]);
    
  }

  gotoDepartments()
  {
    let selectId = this.departmentId ? this.departmentId: null;
    // this.router.navigate(['/departments',{id: selectId}])
    this.router.navigate(['../' , {id: selectId}], {relativeTo: this.route})
  }

  showOverview(){
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

  showContact(){
    this.router.navigate(['contact'], {relativeTo: this.route});
  }

}
