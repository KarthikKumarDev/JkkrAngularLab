import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GitHubService {
  constructor (
    private http: Http
  ) {}

  getAllRepos() {
    return this.http.get(`https://api.github.com/users/karthikkumar1996/repos`).pipe(map((res:Response) => res.json()));
  }
}