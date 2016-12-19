import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

import 'rxjs/add/operator/finally';

import { RiderService } from '../../users/rider.service';
import { Rider } from '../../users/rider.model';

@Component({
    selector: 'uberlike-register-rider',
    templateUrl: 'register-rider.component.html'
})
export class RegisterRiderComponent implements OnInit {

    @ViewChild('input') input: ElementRef;

    rider: Rider = new Rider();
    isLoading: boolean = false;
    data: Object = { };

    constructor(private renderer: Renderer, private riderService: RiderService) { }

    ngOnInit(): void {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }

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
