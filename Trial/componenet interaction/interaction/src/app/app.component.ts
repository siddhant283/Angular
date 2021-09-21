import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  studentsForm: FormGroup;
  len: number;
  testFlag: boolean = true;
  userData: any = [];
  percentage: any = [];
  


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
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
    //  console.log(this.studentsForm.value);

    var user = {
      userName: this.studentsForm.get('name').value,
      joiningDate: this.studentsForm.get('date').value,
      fees: this.studentsForm.get('fees').value,
      subjectSet: this.studentsForm.get('subjects').value
    }

    this.userData.push(user);

  }

  setPercentage(percent: number[] = []) {
    console.log(percent);
    this.percentage = percent;
    console.log(this.percentage);
  }



}
