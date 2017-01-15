import { FormsModule }    from '@angular/forms';
import { NgModule }       from '@angular/core';

import { CoreModule } from '../core/core.module';

import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
    imports: [
        FormsModule,
        CoreModule,
        SignInRoutingModule
    ],
    declarations: [
        SignInComponent
    ],
    providers: [
        // Should have AuthService here
    ]
})
export class SignInModule { }
