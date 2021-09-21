import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { InteractionServiceService } from '../AppServices/interaction-service.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit, OnDestroy {

  
  studentsForm: FormGroup;
  userForm: FormGroup;
  len:number;
  userInfo:any = [];
  userUpdateFlag:boolean = false;
  updateFlag: boolean = false;
  updateIndex:number;
  serverFlag:boolean = false;
  serversMessage:string;
  changingValue:any;
  subscriberData:any;

  updateUserData:any = {
    id: 2,
    name:'name1',
    username: 'username1',
    email: 'test mail',
    company: 'test comapny'
  }
  


  constructor(private fb: FormBuilder, private interationService: InteractionServiceService, private http: HttpClient) { }

  ngOnInit(): void {

    this.subscriberData = this.interationService.castUserData.subscribe(user => {this.userInfo = user;
                                                                                 console.log('Component1 Data Subscription');} );

    this.studentsForm = this.fb.group({
      URL: ['testing URL', [Validators.required, Validators.minLength(2), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    });


    this.userForm = this.fb.group({
        
      users: this.fb.array([
      ]),
      update: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        company: ['',Validators.required]
      })
    });  

  }

  subscriber = this.interationService.changingData.subscribe(value => {
    this.changingValue = value+1;
    console.log('Value from component1: '+ (value+1));
    this.checkLimit();
  },
  error => {
    console.log(error);
  })

  checkLimit(){
    if(this.changingValue>9){
      this.subscriber.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    this.subscriberData.unsubscribe();
  
}

  
  addUserFormGroup(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
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
      
  }

  updateUser(index: number){
      
      this.serverFlag = false;
      this.updateUserData.id = this.userInfo[index].id;
      this.updateUserData.name = this.userInfo[index].name;
      this.updateUserData.username = this.userInfo[index].username;
      this.updateUserData.email = this.userInfo[index].email;
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


  
  onSubmit(): void {
  

    this.interationService.url = this.studentsForm.get('URL').value;
    console.log(this.interationService.url);

    this.interationService.userFetch().subscribe(userData => {
      this.userInfo = userData;
      this.userUpdateFlag = true;
    })

   
  }


 onSave():void{

  console.log('onSave Active')

  for(let user of (this.userForm.get('users').value)){
     
    var newUser = {
 
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      company: {
        name: user.company
      }   
     
    }
     
    this.userInfo.push(newUser);

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

    this.interationService.editUser(this.userInfo);
}


}
