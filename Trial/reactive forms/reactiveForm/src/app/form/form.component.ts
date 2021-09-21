import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [''],

      skills: this.fb.array([
        this.addSkillFormGroup()
      ])


    });
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['kuntal']
    })
  }

  addSkill(){
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  onSubmit(): void
  {
     console.log(this.employeeForm.value);
  }

}
