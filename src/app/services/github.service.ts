import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable()
export class GitHubService {
  constructor(private http: Http) {}

  getAllRepos() {
    return this.http
      .get(`https://api.github.com/users/karthikkumar1996/repos`)
      .pipe(map((res: Response) => res.json()));
  }

  getRepoStats(repoName: string) {
    return this.http
      .get(
        `https://api.github.com/repos/karthikkumar1996/` +
          repoName +
          `/stats/contributors`
      )
      .pipe(map((res: Response) => res.json()));
  }

  getLanguageUsage(repoName: string) {
    return this.http
      .get(
        `https://api.github.com/repos/karthikkumar1996/` +
          repoName +
          `/languages`
      )
      .pipe(map((res: Response) => res.json()));
  }

  convertUnixTimeStampToUTC(unixTimeStamp: any): any {
    var date = new Date(unixTimeStamp * 1000);
    return (
      date.toLocaleString('en-us', { month: 'short' }) +
      ' ' +
      date.getDate() +
      ',' +
      date.getFullYear()
    );
  }
}
