import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uberlike-sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInComponent implements OnInit {

    _userType: string = 'rider';

    constructor() { }

    ngOnInit(): void { }

    set userType(newUserType: string) {
        this._userType = newUserType;
    }

}
