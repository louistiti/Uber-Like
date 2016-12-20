import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

import { HomeComponent } from './home/home.component';

import { SignInComponent} from './sign-in/sign-in.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Accueil'
        }
    },
    {
        path: 'register',
        loadChildren: 'app/register/register.module#RegisterModule'
    },
    {
        path: 'signin',
        component: SignInComponent,
        data: {
            title: 'Connexion'
        }
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: {
            title: 'Ressource introuvable'
        }
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
