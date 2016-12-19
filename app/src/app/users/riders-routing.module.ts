import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RiderDetailComponent } from './rider-detail/rider-detail.component';

const ridersRoutes: Routes = [
    { path: 'riders/:id', component: RiderDetailComponent }
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
