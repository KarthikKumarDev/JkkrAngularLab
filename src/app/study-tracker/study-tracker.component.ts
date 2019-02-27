import { Component, OnInit, ViewChild } from '@angular/core';
import { StudyTrackerService } from '../services/study-tracker.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'study-tracker',
  templateUrl: 'study-tracker.component.html',
  styleUrls: ['study-tracker.scss'],
})
export class StudyTrackerComponent implements OnInit {
  HeaderKeys: any[];
  displayedColumns: any[];
  dataSource: any;
  isFormsDataLoaded: boolean;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort)
  set content(content: MatSort) {
    this.sort = content;

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(private studyTrackerServices: StudyTrackerService) {
  }

  ngOnInit(): void {
    this.studyTrackerServices
        .getAllTrackerForm()
        .subscribe(data => {
          if (Object.keys(data).length !==0) {
            this.HeaderKeys = []; // Reset the keys Array
            for (let key in data.Items[0]) {
              //if(this.HeaderKeys)
              this.HeaderKeys.push(key);
            }

            // Set the columns to be displayed in the List page mat-table
            this.displayedColumns = [
              this.HeaderKeys[1],
              this.HeaderKeys[3],
              this.HeaderKeys[2],
              this.HeaderKeys[4],
              this.HeaderKeys[5]
            ];

            this.dataSource = new MatTableDataSource(data.Items);
            this.dataSource.paginator = this.paginator;
            this.isFormsDataLoaded = true;
          }
        });
  }
}
