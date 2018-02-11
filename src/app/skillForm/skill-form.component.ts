import {Component} from '@angular/core';
import { ReactiveFormsModule,FormsModule,FormBuilder,FormGroup,FormControl,FormControlName,Validators } from '@angular/forms';
import { Person } from '../entities/person';
import {MatSnackBar,DateAdapter, NativeDateAdapter} from '@angular/material';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'skill-form',
  templateUrl: 'skill-form.component.html',
  styleUrls: ['./skill-form.scss'],
  providers:[ ContactService ],
  
})
export class SkillFormComponent {
  contacts : Person[];
  selectedValue: string;
  skillForm: FormGroup;  
  person = new Person('',0,'','',0,0,0,0);
  constructor(private fb: FormBuilder,private snackBar:MatSnackBar,private ContactService: ContactService ) {
    this.skillForm = this.fb.group({
      'name': [this.person.name], 
      'yearsOfExperience':[this.person.yearsOfExperience],
      'favouriteTech':[this.person.favouriteTech],
      'currentTech':[this.person.currentTech],
      'dotnet':[this.person.dotnet,[Validators.min(0),Validators.max(10)]],
      'java':[this.person.java,[Validators.min(0),Validators.max(10)]],
      'database':[this.person.database,[Validators.min(0),Validators.max(10)]],
      'bigdata':[this.person.bigdata,[Validators.min(0),Validators.max(10)]]
    });
  }

   addContact()
   {

    const newPerson ={
      name: this.person.name,
      yearsOfExperience: this.person.yearsOfExperience,
      favouriteTech: this.person.favouriteTech,
      currentTech: this.person.currentTech,
      dotnet: this.person.dotnet,
      java: this.person.java,
      database: this.person.database,
      bigdata: this.person.bigdata
    }
    this.ContactService.addContacts(newPerson)
    .subscribe(contact =>{
      this.contacts.push(contact);

    })

  }

  techlist = [
    {value: 'dotNet', viewValue: '.Net'},
    {value: 'java', viewValue: 'Java'},
    {value: 'database', viewValue: 'Database'},
    {value: 'bigData', viewValue: 'BigData'},
  ];

ngOnInit(){
 
}



  public onSkillSave() :void {

    this.person=this.skillForm.value;
    console.log(this.person);
    this.addContact();
    localStorage.setItem("person", JSON.stringify(this.person));
    this.snackBar.open("Now Check Out The Charts !!!",'Dismiss', {
  duration: 3000
});
  }
 }
  

