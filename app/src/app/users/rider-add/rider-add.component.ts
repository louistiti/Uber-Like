import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/finally';

import { regex, rule } from '../../core/validator';

import { RiderService } from '../rider.service';

@Component({
    selector: 'uberlike-rider-add',
    templateUrl: 'rider-add.component.html'
})
export class RiderAddComponent implements OnInit {

    @ViewChild('input') private elementRef: ElementRef;

    riderForm: FormGroup;

    isLoading: boolean = false;
    data: Object = { };

    passwordMinLength: number = rule.password.minLength;

    constructor(
        private fb: FormBuilder,
        private riderService: RiderService
    ) { }

    ngOnInit(): void {
        this.riderForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(regex.phone)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(regex.password)]]
        });
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }

    addRider(): void {
        this.isLoading = true;

        this.riderService.addRider(this.riderForm.value)
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
