import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TextAnalysisService {
    constructor(
        private http: Http
    ) {

    }

    callTextAnalysisAPI(textToAnalysis: any): any {
        var data = { "text": textToAnalysis };
        var options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        return this.http.post(`https://us-central1-jkkr-cloud-functions.cloudfunctions.net/textAnalysis`, JSON.stringify(data), options).pipe(
            map((res: Response) => res.json())
        );
    }
}

