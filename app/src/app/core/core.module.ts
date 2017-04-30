import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpService } from './http.service';

@NgModule({
    // Useful for component depending of this module
    imports: [],
    // What we want to export
    exports: [
        HttpModule
    ],
    // What depend of this module
    declarations: [],
    // What we need to provide
    providers: [HttpService]
})
export class CoreModule {
    /**
     * To avoid multiples "singletons" instances
     * https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#how-can-i-tell-if-a-module-or-service-was-previously-loaded-
     */
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}
