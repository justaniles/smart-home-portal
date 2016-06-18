import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class GriddleService {

    constructor(private http: Http) {
    }

    apiCall(method: RequestMethod, url: string, body?: string): Observable<any> {
        let options = new RequestOptions({
            method: method,
            headers: this.getRequestHeaders(),
            body: body
        });
        let observable = this.http.request(url, options)
            .map((res: Response) => {
                let body = res.json();
                return body.data || {};
            });
        return observable;
    }

    private getRequestHeaders(): Headers {
        let headers = new Headers({
            "sh-name": "YxNgFJQ3SK19o0s//LD4IfNHnjlE7ZjS3hs+QWkp3AF6k9UkO+f+SM/gxFe9Ib3CiyHmZbxOlmOh3jbeBPgWPg=="
        });
        return headers;
    }
}
