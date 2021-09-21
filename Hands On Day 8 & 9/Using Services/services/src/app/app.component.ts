import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { InteractionService } from '../app/AppServices/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'services';
 
  
  studentsForm: FormGroup;
  len: number;
  testFlag: boolean = true;
  userData: any = [];
  percentage: any;
  


  constructor(private fb: FormBuilder, private interationService: InteractionService) { }

  ngOnInit(): void {
    this.studentsForm = this.fb.group({
      name: ['testing name', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      date: ['', [Validators.required]],
      fees: ['', [Validators.required, Validators.pattern('[0-9]*')]],


      subjects: this.fb.array([
        this.addSubjectFormGroup()
      ])
    });


  }


  addSubjectFormGroup(): FormGroup {
    return this.fb.group({
      subjectName: ['', Validators.required],
      marks: ['', Validators.required]
    })
  }



  addSubject() {
    (<FormArray>this.studentsForm.get('subjects')).push(this.addSubjectFormGroup());

  }

  checkLength(): number {
    return this.len = (<FormArray>this.studentsForm.get('subjects')).length;
  }


  removeSubject(subjectControlIndex: number): void {
    (<FormArray>this.studentsForm.get('subjects')).removeAt(subjectControlIndex);
  }

  onSubmit(): void {
  

    let sum = 0;
    let result = 0;
    let subjectLength = this.studentsForm.get('subjects').value.length;
   

    for(let subject of (this.studentsForm.get('subjects').value)){
         sum = sum + parseInt(subject.marks);
       }

    result = (sum/(subjectLength*100)*100);   

     console.log('Display Marks: ' + result);  

    var user = {
      userName: this.studentsForm.get('name').value,
      joiningDate: this.studentsForm.get('date').value,
      fees: this.studentsForm.get('fees').value,
      subjectSet: this.studentsForm.get('subjects').value,
      percentage: result
  
    }
   
    this.userData.push(user);
    this.interationService.editUser(this.userData);
   
  }

 



}
