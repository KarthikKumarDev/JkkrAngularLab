import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { Person } from '../entities/person';
import {
    MatSnackBar, DateAdapter, NativeDateAdapter, MatTableModule, MatTabHeader, MatHeaderRow, MatHeaderCell,
    MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef, MatTable,
    _MatCell, _MatCellDef, _MatHeaderCellDef, _MatHeaderRowDef,MatColumnDef
} from '@angular/material';
import { ContactService } from '../services/contact.service';
import { NgModel } from '@angular/forms/src/directives/ng_model';
@NgModule({
    imports: [MatTable, MatTableModule],
    declarations: [
        MatTabHeader, MatHeaderRow, MatHeaderCell,
        MatHeaderCellDef, MatHeaderRowDef, MatSortHeader, MatRow, MatRowDef, MatCell, MatCellDef,
        _MatCell, _MatCellDef, _MatHeaderCellDef, _MatHeaderRowDef,MatColumnDef
    ],

})

@Component({
    selector: 'people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    providers: [ContactService],
})

export class PeopleComponent {

    contacts: Person[];
    displayedColumns = ['name'];
    //datasource = new MatTableDataSource(this.contacts);
    constructor(private ContactService: ContactService) {

    }

    ngOnInit() {
        this.ContactService.getContacts().subscribe(contacts =>
            this.contacts = contacts);
    }



}