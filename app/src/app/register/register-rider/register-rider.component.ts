import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

import { Rider } from '../../users/rider.model';

@Component({
    selector: 'uber-like-register-rider',
    templateUrl: 'register-rider.component.html',
    styleUrls: ['register-rider.component.scss']
})
export class RegisterRiderComponent implements OnInit {

    @ViewChild('input') input: ElementRef;

    rider: Rider = new Rider();

    constructor(private renderer: Renderer) { }

    ngOnInit(): void {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }

    riderRegister(rider): void {
        // this.rider.phone = '+33' + this.rider.phone.substr(1);
        console.log(this.rider);
    }

}
