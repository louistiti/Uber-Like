import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpService } from '../core/http.service';
import { ResponseMessageComponent } from '../core/response-message.component';
import { LoaderComponent } from '../core/loader.component';

import { RegisterComponent } from './register.component';
import { RegisterRiderComponent } from './register-rider/register-rider.component';
import { RegisterRoutingModule } from './register-routing.module';

import { RiderService } from '../users/rider.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RegisterRoutingModule
    ],
    declarations: [
        ResponseMessageComponent,
        LoaderComponent,
        RegisterComponent,
        RegisterRiderComponent
    ],
    providers: [
        HttpService,
        RiderService
    ]
})
export class RegisterModule { }
