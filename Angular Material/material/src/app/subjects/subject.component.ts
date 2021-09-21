import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { InteractionService } from '../AppServices/interaction.service';
import { HttpClient } from '@angular/common/http';
import {ViewChild, AfterContentInit, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-database-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, AfterContentInit, AfterViewInit {

 
  userInfo:any = [];
  subjectArray: any = [];
  userUpdateFlag:boolean = false;
  subjectList = new Map();

  constructor(private fb: FormBuilder,private interationService: InteractionService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['subject','students'];
  dataSource =  new MatTableDataSource(this.userInfo);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentInit() {
    this.userInfo = JSON.parse(localStorage.getItem("users"));
    for(let user of this.userInfo){
        let userDetails = { firstname: user['firstname'],
                            lastname: user['lastname'],
                            email: user['email'],
                            username: user['username']
                          }
        for(let subject of user['subjects']){
          if(this.subjectList.has(subject)){
            this.subjectList.get(subject).push(userDetails);
          }
          else{
            let allStudents: {}[] = [];
            allStudents.push(userDetails);
            this.subjectList.set(subject, allStudents);
          }
        }                  
    }
    this.subjectArray = Array.from(this.subjectList, ([subjectName, studentList]) => ({ subjectName, studentList}));
    this.dataSource.data = this.subjectArray;
    console.log(this.dataSource.data);
  }
}
