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

@Component({
  selector: 'app-serverdb',
  templateUrl: './serverdb.component.html',
  styleUrls: ['./serverdb.component.css']
})
export class ServerdbComponent implements OnInit, AfterViewInit {

  fetchForm: FormGroup;
  userInfo:any = [];
  userUpdateFlag:boolean = false;
  userForm: FormGroup;
  len:number;
  updateFlag: boolean = false;
  updateIndex:number;
  serverFlag:boolean = false;
  serversMessage:string;

  updateUserData:any = {
    id: 2,
    name:'name1',
    username: 'username1',
    email: 'test mail',
    phone: 'test phone',
    company: 'test comapny'
  }

  constructor(private fb: FormBuilder,private interationService: InteractionService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchForm = this.fb.group({
      URL: ['testing URL', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    });

    this.userForm = this.fb.group({
        
      users: this.fb.array([
      ]),
      update: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        company: ['',Validators.required]
      })
    });  
  }

  matcher = new MyErrorStateMatcher();
  value = 'Clear me';

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'company', 'delete', 'update'];
  dataSource =  new MatTableDataSource(this.userInfo);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addUserFormGroup(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['',Validators.required]
    })
  }

  addUser() {
    this.serverFlag = false;
    (<FormArray>this.userForm.get('users')).push(this.addUserFormGroup());

  }

  checkLength(): number {
    return this.len = (<FormArray>this.userForm.get('users')).length;
  }


 
  removeUser(userControlIndex: number): void {
    (<FormArray>this.userForm.get('users')).removeAt(userControlIndex);
  }


  deleteUser(index: number){
       
       this.serverFlag = false;
       this.userInfo.splice(index,1);
       this.dataSource.data = this.userInfo;
       console.log(this.userInfo);
      
  }

  updateUser(index: number){
      
      this.serverFlag = false;
      this.updateUserData.id = this.userInfo[index].id;
      this.updateUserData.name = this.userInfo[index].name;
      this.updateUserData.username = this.userInfo[index].username;
      this.updateUserData.email = this.userInfo[index].email;
      this.updateUserData.phone = this.userInfo[index].phone;
      this.updateUserData.company = this.userInfo[index].company.name;
      this.updateIndex = index;
      this.updateFlag = true;
  }

  updateChanges(){
     
      let index = this.updateIndex;

      this.userInfo[index].id = this.updateUserData.id ;
      this.userInfo[index].name = this.updateUserData.name ;
      this.userInfo[index].username = this.updateUserData.username ;
      this.userInfo[index].email = this.updateUserData.email ;
      this.userInfo[index].phone = this.updateUserData.phone ;
      this.userInfo[index].company.name = this.updateUserData.company ;
     
      this.updateFlag = false;
      this.updateIndex = null;

  }

  deleteDisabled(index: number): boolean{
      if(index == this.updateIndex){
        return true;
      }

      else{
        return false;
      }
  }

 onSave():void{

  console.log('onSave Active')

  for(let user of (this.userForm.get('users').value)){
     
    var newUser = {
 
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      company: {
        name: user.company
      }   
     
    }
     
    this.userInfo.push(newUser);
    this.dataSource.data = this.userInfo;
    console.log(this.dataSource.data);
    
  }

 }


 postData(){

    this.serverFlag = true;
    
    let url = 'http://httpbin.org/post';

    this.http.post(url, {
      userData: this.userInfo
    }).toPromise().then((data:any) => {
      console.log('Response From the Server')
      console.log(data); 
      console.log(JSON.stringify(data.json.userData));
      this.serversMessage = 'Changes Made Successfully on the Server!';
    })
    .catch((err:any) => {
      console.log(err.message);
      this.serversMessage = err.message;
    } )
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
