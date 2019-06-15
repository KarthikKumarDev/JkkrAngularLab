import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable()
export class StudyTrackerService {
  constructor(private http: Http) {}

  getAllTrackerForm() {
    return this.http
      .get(
        `https://bu94iahit4.execute-api.ap-south-1.amazonaws.com/prod/tracker-form`
      )
      .pipe(map((res: Response) => res.json()));
  }
}
