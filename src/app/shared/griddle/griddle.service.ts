import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from "../auth";
import { GriddleConstants } from "./griddle.constants";
import { PcDiagnostics } from "../pc-portal";

@Injectable()
export class GriddleService {

    constructor(private authService: AuthService, private http: Http, private router: Router) {
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
                if (res.status === 204) {
                    return {};
                }
                const body = res.json();
                return body.Data || {};
            })
            .catch((err: Response) => {
                if (err.status === GriddleConstants.ResponseStatus.Unauthorized) {
                    this.router.navigate(["/login"]);
                }
                else {
                    PcDiagnostics.Log(
                        PcDiagnostics.LogType.Error,
                        "GriddleService.apiCall",
                        `An error occurred while trying to make a request to '${fullUrl}'.`,
                        err
                    );
                }
                return Observable.empty();
            })
            .publish();

        // Use setTimeout to connect/execute the http request AFTER the observable returns
        // and any interested parties subscribe to it. This is to prevent a possible race
        // condition where we call connect before returning, and the call comes back immediately
        // or before the calling function has a chance to subscribe.
        // TODO: determine if there's a better way to do this
        setTimeout(() => {
            observable.connect();
        });

        return observable;
    }

    private _getAbsoluteUrl(urlPath: string): string {
        const url = GriddleConstants.BaseUrl + urlPath;
        return url;
    }

    private _getRequestHeaders(): Headers {
        const currentAuthToken = this.authService.authToken;
        const headers = new Headers({
            "sh-auth": currentAuthToken
        });
        return headers;
    }
}
