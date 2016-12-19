import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'uberlike-loader',
    template: `
        <img *ngIf="isLoading" src="/assets/images/loader.svg" width="22" height="22" alt="Chargement...">
    `
})
export class LoaderComponent implements OnInit {

    @Input() isLoading: boolean;

    constructor() { }

    ngOnInit() {
    }

}
