import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RiderComponent } from './rider/rider.component';

const ridersRoutes: Routes = [
    { path: 'riders/:id', component: RiderComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ridersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RiderRoutingModule { }
