import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { GriddleConstants } from "./griddle.constants";
import { Observable } from "rxjs/Observable";

import PcDiagnostics = PcPortal.Diagnostics;

@Injectable()
export class GriddleService {

    constructor(private http: Http) {
    }

    apiCall(method: RequestMethod, urlPath: string, body?: string): Observable<any> {
        const options = new RequestOptions({
            method: method,
            headers: this.getRequestHeaders(),
            body: body
        });
        const fullUrl = this.formatUrl(urlPath);

        const observable = this.http.request(fullUrl, options)
            .map((res: Response) => {
                let body = res.json();
                return body.Data || {};
            })
            .catch((err: any) => {
                PcDiagnostics.Log(
                    PcDiagnostics.LogType.Error,
                    "GriddleService.apiCall",
                    `An error occurred while trying to make a request to '${fullUrl}'.`,
                    err
                );
                return Observable.throw(err);
            });
        return observable;
    }

    private formatUrl(urlPath: string): string {
        const url = GriddleConstants.BaseUrl + urlPath;
        return url;
    }

    private getRequestHeaders(): Headers {
        const headers = new Headers({
            "sh-auth": "YxNgFJQ3SK19o0s//LD4IfNHnjlE7ZjS3hs+QWkp3AF6k9UkO+f+SM/gxFe9Ib3CiyHmZbxOlmOh3jbeBPgWPg=="
        });
        return headers;
    }
}
