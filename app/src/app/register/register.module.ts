import { FormsModule }    from '@angular/forms';
import { NgModule }       from '@angular/core';

import { CoreModule } from '../core/core.module';

import { RegisterComponent } from './register.component';
import { RegisterRiderComponent } from './register-rider/register-rider.component';
import { RegisterRoutingModule } from './register-routing.module';

import { RiderService } from '../users/rider.service';

@NgModule({
    imports: [
        FormsModule,
        CoreModule,
        RegisterRoutingModule
    ],
    declarations: [
        RegisterComponent,
        RegisterRiderComponent
    ],
    providers: [
        RiderService
    ]
})
export class RegisterModule { }
