// https://angular.io/docs/ts/latest/guide/router.html#the-heroes-app-code

import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';

import { RiderDetailComponent } from './rider-detail/rider-detail.component';
import { RiderRoutingModule } from './riders-routing.module';
// import { RiderService } from './rider.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RiderRoutingModule
    ],
    declarations: [
        RiderDetailComponent
    ],
    providers: [
        // HeroService
    ]
})
export class RidersModule { }
