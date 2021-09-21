import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormGroupDirective,NgForm, FormBuilder, Validators, FormArray} from '@angular/forms';
import { InteractionService } from '../AppServices/interaction.service';
import { HttpClient } from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';




/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit, AfterViewInit {

  fetchForm: FormGroup;
  userInfo:any = [];
  userUpdateFlag:boolean = false;

  constructor(private fb: FormBuilder,private interationService: InteractionService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchForm = this.fb.group({
      URL: ['testing URL', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    });
  }

  matcher = new MyErrorStateMatcher();
  value = 'Clear me';

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'company'];
  dataSource =  new MatTableDataSource(this.userInfo);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
  onSubmit(): void {
  

    this.interationService.url = this.fetchForm.get('URL').value;
    console.log(this.interationService.url);

    this.interationService.userFetch().subscribe(userData => {
      this.userInfo = userData;
      this.dataSource.data = this.userInfo;
      console.log(this.userInfo);
      this.userUpdateFlag = true;
    })

   
  }


}
