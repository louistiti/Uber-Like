import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import config from '../core/config';
import { HttpService } from '../core/http.service';

@Injectable()
export class AuthService {

    private authUrl: string = config.apiUrl + '/auth';

    constructor(private http: HttpService) { }

    authenticate(o: Object): Observable<any> {
        return this.http
            .post(`${this.authUrl}/token`, o)
            .map(res => res.json());
    }

}
