import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms'

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {

  skillsForm: FormGroup;
  len: number;
  testFlag: boolean = true;
  userData: any = []; 
  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.skillsForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z ]+$')]],
     
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });
  }

  
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['',Validators.required]
    })
  }

 

  addSkill(){
    (<FormArray>this.skillsForm.get('skills')).push(this.addSkillFormGroup());
    
  }

  checkLength(): number
  {
    return this.len = (<FormArray>this.skillsForm.get('skills')).length;
  }


  removeSkill(skillControlIndex:number):void{
         (<FormArray>this.skillsForm.get('skills')).removeAt(skillControlIndex);  
  }

  onSubmit(): void
  {
     console.log(this.skillsForm.value);

      var user = {
       userName: this.skillsForm.get('name').value,
       skillSet: this.skillsForm.get('skills').value
     }

      this.userData.push(user);
     
  }

}
