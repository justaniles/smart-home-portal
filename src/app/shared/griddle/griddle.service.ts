import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { GriddleConstants } from "./griddle.constants";
import { Observable } from "rxjs/Observable";

import { PcDiagnostics } from "../pc-portal";

@Injectable()
export class GriddleService {

    constructor(private http: Http) {
    }

    apiCall(method: RequestMethod, urlPath: string, searchParams?: URLSearchParams, body?: any): Observable<any> {
        const options = new RequestOptions({
            method: method,
            headers: this._getRequestHeaders(),
            body: body,
            search: searchParams
        });
        const fullUrl = this._getAbsoluteUrl(urlPath);

        const observable = this.http.request(fullUrl, options)
            .map((res: Response) => {
                try {
                    let body = res.json();
                    return body.Data || {};
                } catch (e) {
                    // For now assume we get here when there's no body json to parse
                    return {};
                }
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
        observable.subscribe();
        return observable;
    }

    private _getAbsoluteUrl(urlPath: string): string {
        const url = GriddleConstants.BaseUrl + urlPath;
        return url;
    }

    private _getRequestHeaders(): Headers {
        const headers = new Headers({
            "sh-auth": "YxNgFJQ3SK19o0s//LD4IfNHnjlE7ZjS3hs+QWkp3AF6k9UkO+f+SM/gxFe9Ib3CiyHmZbxOlmOh3jbeBPgWPg=="
        });
        return headers;
    }
}
