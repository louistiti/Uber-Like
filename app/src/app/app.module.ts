import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RidersModule } from './users/riders.module';

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
        HttpModule,
        RidersModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        RegisterRiderComponent,
        SignInComponent
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule { }
