import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { JwtHelper } from 'angular2-jwt';

import { Cookie } from 'ng2-cookies';

import config from '../core/config';
import { HttpService } from '../core/http.service';

@Injectable()
export class AuthService {

    private authUrl: string = config.apiUrl + '/auth';

    constructor(
        private http: HttpService,
        private jwtHelper: JwtHelper
    ) { }

    authenticate(o: Object): Observable<any> {
        return this.http
            .post(`${this.authUrl}/token`, o)
            .map(res => res.json());
    }

    isAuthenticated(): boolean {
        const accessToken = Cookie.get('access_token');
        return !!(accessToken && this.jwtHelper.isTokenExpired(accessToken) === false);
    }

}
