import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'uberlike-register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

    /**
     * Using "_" prefix for setter cf https://github.com/angular/angular.io/issues/1108#issuecomment-213580426
     */
    _userType: string = 'rider';

    constructor() { }

    ngOnInit(): void { }

    set userType(newUserType: string) {
        this._userType = newUserType;
    }

}
