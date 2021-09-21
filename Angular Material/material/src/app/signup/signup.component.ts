import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder,FormGroupDirective,NgForm,FormControl, Validators, FormArray,ValidatorFn, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';
import {AfterViewInit,ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CustomValidators} from "../shared/custom.validator";



export interface Subject {
  name: string;
}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit, AfterViewInit {

  personalForm: FormGroup;
  contactForm: FormGroup;
  loginForm: FormGroup;
  isLinear = true;
  gender:any;
  hide:boolean = true;
  successfulRegistration: boolean = true;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  subjects: Subject[] = [
    {name: 'Mathematics'},
    {name: 'Physics'},
    {name: 'Chemistry'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our subject
    if ((value || '').trim()) {
      this.personalForm.get('subject').value.push({name: value.trim()});
      this.personalForm.get('subject').updateValueAndValidity();
    }
   
    // Reset the input value
    if (input) {
      input.value = '';
    }
    
  }

  remove(subject: Subject): void {
    const index = this.personalForm.get('subject').value.indexOf(subject);

    if (index >= 0) {
      this.personalForm.get('subject').value.splice(index, 1);
      this.personalForm.get('subject').updateValueAndValidity();
    }
 
    console.log(this.personalForm.get('subject').value.length);

  }
  

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,public vc: ViewContainerRef, private Validators: CustomValidators) { }

  addUser() {

    this.successfulRegistration=false;
    
    var user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      firstname: this.personalForm.get('firstname').value,
      lastname: this.personalForm.get('lastname').value,
      age: this.personalForm.get('age').value,
      subjects: this.personalForm.get('subject').value,
      phone: this.contactForm.get('phone').value,
      email: this.contactForm.get('email').value,
    }

    var allUsers: any[] = JSON.parse(localStorage.getItem("users")) ?? [];
    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers));
    this.successfulRegistration = true;
         
  }

  openSnackBar(message: string, action: string) { 

    let snackBarRef =  this._snackBar.open(message, action, {
      duration: 2000,
    });
 
    snackBarRef.onAction().subscribe(()=> this.doSomething());

    setTimeout(() => { if(this.loginForm.get('username').value !== ''){ this.addUser(); } },3000);

  }

  @ViewChild('stepper') stepper: MatStepper;

  ngAfterViewInit() {
    
  }

  doSomething(){
    this.intializeForms();
    console.log(Object.keys(this.personalForm.controls));
    Object.keys(this.personalForm.controls).forEach(key => {
      this.personalForm.get(key).setErrors(null);
    });
    this.stepper.reset();
    Object.keys(this.personalForm.controls).forEach(key => {
      console.log(this.personalForm.get(key).errors);
    });
    console.log(this.personalForm.get('firstname').hasError('required'));
    console.log(this.personalForm.get('firstname'));
  }

  intializeForms(){
    this.personalForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[ A-Za-z]*$'), Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.pattern('^[ A-Za-z]*$'), Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      gender: ['Male',[Validators.required]],
      subject: [[], [Validators.required]]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.Validators.existingEmailValidator()]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')], [this.Validators.existingPhoneValidator()]],
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')], [this.Validators.existingUsernameValidator()]],
      password: ['', [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')]],
    });

  }

  ngOnInit(): void {
    console.log("testing component intialized");
    this.intializeForms();
  }

  
  getEmailErrorMessage() {
    if (this.contactForm.get('email').hasError('required')) {
      return 'Email is required';
    }
    else if(this.contactForm.get('email').hasError('existingEmail')){
      return 'This Email is already Registered';
    }

    return this.contactForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    if (this.contactForm.get('phone').hasError('required')) {
      return 'Phone is required';
    }
    else if(this.contactForm.get('phone').hasError('existingPhone')){
      return 'This Phone is already Registered';
    }

    return this.contactForm.get('phone').hasError('pattern') ? 'Enter a Valid Phone Number' : '';
  }


}


