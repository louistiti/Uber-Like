// https://angular.io/docs/ts/latest/guide/router.html#the-heroes-app-code

import { NgModule } from '@angular/core';

import { HttpService } from '../core/http.service';

import { SharedModule } from '../shared/shared.module';

import { RiderComponent } from './rider/rider.component';
import { RiderRoutingModule } from './riders-routing.module';
import { RiderService } from './rider.service';

@NgModule({
    imports: [
        SharedModule,
        RiderRoutingModule
    ],
    declarations: [
        RiderComponent
    ],
    providers: [
        HttpService,
        RiderService
    ]
})
export class RidersModule { }
