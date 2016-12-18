import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Request, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// for auth cf http://www.adonespitogo.com/articles/angular-2-extending-http-provider/

@Injectable()
export class HttpService extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        options = new RequestOptions({ headers: headers });

        return super.request(url, options)
            .catch(error => Observable.throw(error.json() || 'Erreur serveur'));
    }

}
