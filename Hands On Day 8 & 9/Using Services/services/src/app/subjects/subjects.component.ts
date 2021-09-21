import { Component, Input, IterableDiffer, IterableDiffers, OnInit, DoCheck, IterableChanges } from '@angular/core';
import { InteractionService } from '../AppServices/interaction.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, DoCheck {

  userDataSubjects: any;
  percentageSubjects: any;

  map = new Map();

  private _diff: IterableDiffer<any>;

  constructor(private _iterableDiffers: IterableDiffers, private interactionService: InteractionService ) { 
      
     

  }


  public ngOnInit(): void {
    
    this.interactionService.castUserData.subscribe(user => this.userDataSubjects = user);
    

    this._diff = this._iterableDiffers.find(this.userDataSubjects).create();
    this.reArrange();
   
  }

  public ngDoCheck(): void {

    const changes: IterableChanges<any> = this._diff.diff(this.userDataSubjects);

    if (changes) {
      this.reArrange();
    }

  }

  reArrange() {

    console.log('rearrange active');
    

    if (this.userDataSubjects.length > 0) {

      

      let len: number = this.userDataSubjects.length;

      let newStudent: any = this.userDataSubjects[len - 1].subjectSet;
      
      console.log(this.percentageSubjects + 'Realized Percentage');



      var studentDetails = {
        userName: this.userDataSubjects[len - 1].userName,
        joiningDate: this.userDataSubjects[len - 1].joiningDate,
        fees: this.userDataSubjects[len - 1].fees, 
        percentage: this.userDataSubjects[len-1].percentage
      }

     console.log('New Student:' + JSON.stringify(studentDetails));

      for (let subject of newStudent) {


        studentDetails["marks"]  = subject.marks;
        console.log(subject.marks + 'subject marks');

      
        if (this.map.has(subject.subjectName)) {
          
         
          this.map.get(subject.subjectName).push(studentDetails);
                               
        }

        else {

          let allStudents: {}[] = [];

          
          allStudents.push(studentDetails);
         
          this.map.set(subject.subjectName, allStudents);
        }

      }

    }
  }

}



