import {
  Component, Input, ElementRef, QueryList, ViewChildren, OnInit, AfterViewInit
  , ViewChild, Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';


import { InteractionService } from '../AppServices/interaction.service';




@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  userDataStudents: any;
  constructor(private cd: ChangeDetectorRef, private interactionService: InteractionService) { }
 

 
  @Output() percentageEvent = new EventEmitter();

  @ViewChild('length') length;

  @ViewChildren('somecontent', { read: ElementRef })
  public somecontent: QueryList<ElementRef>
 

  percentage: number[] = [];
  percentageFlag: boolean = false;

  ngOnInit(): void {
    this.interactionService.castUserData.subscribe(user => this.userDataStudents = user);
  }

  ngAfterViewInit() {
    let i = 0;
    this.somecontent.changes.subscribe(() => {
      let sum: number = 0;
      let marks: any[] = this.somecontent.toArray();
      let subjectCount = marks.length - i;
      for (let j = i; j < marks.length; j++) {
        console.log(parseInt(marks[j].nativeElement.innerHTML));
        sum = sum + parseInt(marks[j].nativeElement.innerHTML);
        console.log(sum);
        i++;
      }
      let result = (sum / (subjectCount * 100)) * 100;


      setTimeout(() => {
        this.percentage.push(result);
        this.percentageFlag = true;
      }, 0)

      // this.percentage.push(result);
      // this.percentageFlag = true;
      // this.percentageEvent.emit(this.percentage);

      console.log(this.percentage);

      // this.cd.detectChanges();

    });


  }





}
