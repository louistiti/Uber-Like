import { Injectable } from '@angular/core';

import { HttpService } from '../core/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { config } from '../core/config';

import { Rider } from './rider.model';

@Injectable()
export class RiderService {

    private ridersUrl: string = config.baseUrl + '/riders';

    constructor(private http: HttpService) { }

    addRider(rider: Rider): Observable<any> {
        return this.http
            .post(this.ridersUrl, rider)
            .map(res => res.json());
    }

}
