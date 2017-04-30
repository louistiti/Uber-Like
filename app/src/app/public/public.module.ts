import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';

import { RegisterComponent } from './register/register.component';

import { SignInComponent } from './sign-in/sign-in.component';

import { RiderAddComponent } from '../users/rider-add/rider-add.component';
import { RiderService } from '../users/rider.service';

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule
    ],
    declarations: [
        SignInComponent,
        RegisterComponent,
        RiderAddComponent
    ],
    providers: [
        RiderService
    ]
})
export class PublicModule { }
