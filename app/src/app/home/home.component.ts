import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
    selector: 'uberlike-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: AuthService
    ) { }

    /**
     * When component have been initialized
     */
    ngOnInit(): void { }

}
