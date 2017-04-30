import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import 'rxjs/add/operator/finally';

import { RiderService } from '../rider.service';
import { Rider } from '../rider.model';

@Component({
    selector: 'uberlike-rider-add',
    templateUrl: 'rider-add.component.html'
})
export class RiderAddComponent implements OnInit {

    rider: Rider = <Rider>{ };
    isLoading: boolean = false;
    data: Object = { };

    constructor(private riderService: RiderService) { }

    ngOnInit(): void { }

    addRider(): void {
        this.isLoading = true;

        this.riderService.addRider(this.rider)
            .finally(() => this.isLoading = false)
            .subscribe(
                success => {
                    this.data = success;
                },
                error => {
                    this.data = error;
                }
            );
    }

}
