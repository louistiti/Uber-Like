import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'uberlike-response-message',
    template: `
        <div *ngIf="data.success === false" class="error">
            <p>Il semblerait qu'il y ait des erreurs :</p>
            <ul>
                <li class="notice notice-error" *ngFor="let error of data.errors">{{ error.message }}</li>
            </ul>
        </div>
        <div *ngIf="data.success === true" class="success">
            <span class="notice notice-success">{{ data.message }}</span>
        </div>
    `,
    styleUrls: ['response-message.component.scss']
})
export class ResponseMessageComponent implements OnInit {

    // Reference the parent attribute with the render (html)
    @Input() data: any;

    constructor() { }

    ngOnInit() {
    }

}
