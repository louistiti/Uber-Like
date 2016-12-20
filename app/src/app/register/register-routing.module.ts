import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';

const registerRoutes: Routes = [
    {
        path: '',
        component: RegisterComponent,
        data: {
            title: 'Inscription'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(registerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegisterRoutingModule { }
