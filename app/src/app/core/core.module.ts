import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoaderComponent } from './loader.component';
import { ResponseMessageComponent } from './response-message.component';
import { HttpService } from './http.service';

@NgModule({
    // Useful for component depending of this module
    imports: [
        CommonModule,
        HttpModule
    ],
    // What we want to export
    exports: [
        CommonModule,
        HttpModule,
        LoaderComponent,
        ResponseMessageComponent
    ],
    // What depend of this module
    declarations: [
        LoaderComponent,
        ResponseMessageComponent
    ],
    // What we need to provide
    providers: [HttpService]
})
export class CoreModule { }
