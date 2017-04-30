import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';
import { ResponseMessageComponent } from './response-message.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    // Useful for component depending of this module
    imports: [
        CommonModule // We use *ngIf directive, etc.
    ],
    // What we want to export
    exports: [
        CommonModule,
        FormsModule,
        LoaderComponent,
        ResponseMessageComponent
    ],
    // What depend of this module
    declarations: [
        LoaderComponent,
        ResponseMessageComponent
    ],
    // What we need to provide
    providers: []
})
export class SharedModule { }
