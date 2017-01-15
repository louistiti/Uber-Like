import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';

import { NotFoundComponent } from './not-found.component';

import { HomeComponent } from './home/home.component';

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
        loadChildren: 'app/register/register.module#RegisterModule',
        data: {
            preload: true
        }
    },
    {
        path: 'signin',
        loadChildren: 'app/sign-in/sign-in.module#SignInModule',
        data: {
            preload: true
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
        RouterModule.forRoot(
            appRoutes,
            { preloadingStrategy: SelectivePreloadingStrategy }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [SelectivePreloadingStrategy]
})

export class AppRoutingModule { }
