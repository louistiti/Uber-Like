import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './not-found.component';

import { RidersModule } from './users/riders.module';

import { ResponseMessageComponent } from './core/response-message.component';
import { LoaderComponent } from './core/loader.component';

import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { RegisterRiderComponent } from './register/register-rider/register-rider.component';

import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    /**
     * Must import children routes first
     */
    imports: [
        BrowserModule,
        FormsModule,
        RidersModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        LoaderComponent,
        ResponseMessageComponent,
        HomeComponent,
        RegisterComponent,
        RegisterRiderComponent,
        SignInComponent
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule { }
