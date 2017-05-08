import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cookie } from 'ng2-cookies';

import 'rxjs/add/operator/finally';

import config from '../../core/config';
import { fromSecsToDate } from '../../core/utils';
import { rule } from '../../core/validator';
import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'uberlike-rider-auth',
    templateUrl: 'rider-auth.component.html'
})
export class RiderAuthComponent implements OnInit, AfterViewInit {

    @ViewChild('input') private elementRef: ElementRef;

    riderForm: FormGroup;

    isLoading: boolean = false;
    data: Object = { };

    passwordMinLength: number = rule.password.minLength;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.riderForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }

    authRider(): void {
        this.isLoading = true;

        const o = {
            user_type: 'rider',
            grant_type: 'password'
        };

        Object.assign(o, this.riderForm.value);

        this.authService.authenticate(o)
            .finally(() => this.isLoading = false)
            .subscribe(
                success => {
                    this.data = success;
                    const accessToken = this.data['data'][0].access_token;
                    const refreshToken = this.data['data'][0].refresh_token;
                    const clientId = this.data['data'][0].client_id;
                    const expiresIn = this.data['data'][0].expires_in;

                    Cookie.set('access_token', accessToken,
                        fromSecsToDate(expiresIn), undefined, undefined, config.securedCookie);

                    Cookie.set('refresh_token', refreshToken,
                        fromSecsToDate(config.refreshTokenExp), undefined, undefined, config.securedCookie);

                    Cookie.set('client_id', clientId,
                        fromSecsToDate(config.refreshTokenExp), undefined, undefined, config.securedCookie);
                },
                error => {
                    this.data = error;
                }
            );
    }

}
