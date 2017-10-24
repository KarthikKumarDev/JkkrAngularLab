import {Component} from '@angular/core';
import { ReactiveFormsModule,FormsModule,FormBuilder,FormGroup,FormControl,FormControlName } from '@angular/forms';
import { Person } from '../entities/person';
import {MatSnackBar,DateAdapter, NativeDateAdapter} from '@angular/material';
@Component({
  selector: 'skill-form',
  templateUrl: 'skill-form.component.html',
  styleUrls: ['./skill-form.scss'],
  providers:[],  
  
})
export class SkillFormComponent {
  selectedValue: string;
  skillForm: FormGroup;  
  person = new Person('',0,'','',0,0,0,0);
  constructor(private fb: FormBuilder,private snackBar:MatSnackBar) {
    this.skillForm = this.fb.group({
      'name': [this.person.name], 
      'yearsOfExperience':[this.person.yearsOfExperience],
      'favouriteTech':[this.person.favouriteTech],
      'currentTech':[this.person.currentTech],
      'dotnet':[this.person.dotnet],
      'java':[this.person.java],
      'database':[this.person.database],
      'bigdata':[this.person.bigdata]
    });
  }

  techlist = [
    {value: 'dotNet', viewValue: '.Net'},
    {value: 'java', viewValue: 'Java'},
    {value: 'database', viewValue: 'Database'},
    {value: 'bigData', viewValue: 'BigData'},
  ];
  public onSkillSave() :void {
    this.person=this.skillForm.value;
    console.log(this.person);
    localStorage.setItem("person", JSON.stringify(this.person));
    this.snackBar.open("Now Check Out The Charts !!!",'Dismiss', {
  duration: 3000
});
  }
 }
  

