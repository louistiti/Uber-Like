import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { SignInComponent} from './sign-in/sign-in.component';

import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Accueil'
        }
    },
    {
        path: 'signin',
        component: SignInComponent,
        data: {
            title: 'Connexion'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Inscription'
        }
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
