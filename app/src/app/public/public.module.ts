import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';

import { RegisterComponent } from './register/register.component';

import { SignInComponent } from './sign-in/sign-in.component';

import { RiderAddComponent } from '../users/rider-add/rider-add.component';
import { RiderService } from '../users/rider.service';
import { RiderAuthComponent } from '../users/rider-auth/rider-auth.component';

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent,
        RiderAddComponent,
        SignInComponent,
        RiderAuthComponent
    ],
    providers: [
        RiderService
    ]
})
export class PublicModule { }
