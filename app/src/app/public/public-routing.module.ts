import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';

import { SignInComponent } from './sign-in/sign-in.component';

const publicRoutes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Inscription'
        }
    },
    {
        path: 'signin',
        component: SignInComponent,
        data: {
            title: 'Connexion'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(publicRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule { }
