import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormGroupDirective,NgForm, FormBuilder, Validators, FormArray} from '@angular/forms';
import { InteractionService } from '../AppServices/interaction.service';
import { HttpClient } from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import {AfterViewInit,ViewChild, AfterContentInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit, AfterContentInit {

 
  userInfo:any = [];
  userUpdateFlag:boolean = false;

  constructor(private fb: FormBuilder,private interationService: InteractionService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['name','email', 'phone', 'username', 'subjects'];
  dataSource =  new MatTableDataSource(this.userInfo);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterContentInit() {
    this.userInfo = JSON.parse(localStorage.getItem("users"));
    this.dataSource.data = this.userInfo;
  }

}
