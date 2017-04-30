import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './not-found.component';

import { HomeComponent } from './home/home.component';

@NgModule({
    /**
     * Must import children routes first
     */
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        HomeComponent
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule { }
