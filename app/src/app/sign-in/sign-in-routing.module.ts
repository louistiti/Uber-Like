import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in.component';

const signInRoutes: Routes = [
    {
        path: '',
        component: SignInComponent,
        data: {
            title: 'Connexion'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(signInRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SignInRoutingModule { }
