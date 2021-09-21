import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  pageName: string = 'User Form';
  inputFlag = true;
  age: any;
  voteAllowed = false;
  voteDisplay: string ='';
  userName : string;
  buttonValue: string = 'Save Details'
  profileURL: string;

  onUpdateAge(event:Event)
  {
    
    this.age = (<HTMLInputElement>event.target).value;
   
    if(this.age!=="" && this.age!=null){
      this.voteDisplay = this.age>=18 ? 'You are eligible to Vote!' : 'You are Not eligible to Vote !';
    }

    else{
      this.voteDisplay = '';
    }
    
    
  }

  onWelcomeUser()
  {
    if(this.inputFlag)
    {
      this.pageName = 'User Details';
      this.inputFlag = false;
      this.buttonValue = 'Reset Details'
    }

    else{
      this.pageName = 'User Form';
      this.inputFlag = true;
      this.buttonValue = 'Save Details';
      this.userName='';
      this.profileURL='';
      this.voteDisplay='';
    }
     
  }

  headingColor()
  {
    return this.inputFlag === true ? '#276678' : '#ff5e78';
  }

  constructor() { }

  ngOnInit(): void {
  }

  
 

}
