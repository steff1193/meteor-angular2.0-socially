import { Component, OnInit } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router , ROUTER_DIRECTIVES} from '@angular/router';
import { MdInput } from '@angular2-material/input';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './login.mobile.component.html';

@Component({
  selector: 'login',
  template,
  directives: [ROUTER_DIRECTIVES, MdInput, MdToolbar, MdButton, REACTIVE_FORM_DIRECTIVES],
})
export class LoginComponent extends MeteorComponent implements OnInit {
  error: string = '';
  phoneForm: FormGroup;
  verifyForm: FormGroup;
  isStepTwo: boolean = false;
  phone: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.phoneForm = this.formBuilder.group({
      phone: ['', Validators.required]
    });

    this.verifyForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  send() {
    if (this.phoneForm.valid) {
      /*Accounts.requestPhoneVerification(this.phoneForm.value.phone, (err) => {
        if (err) {
          this.error = err.reason || err;
        } else {
          this.phone = this.phoneForm.value.phone;
          this.error = '';
          // move to code verification
          this.isStepTwo = true;
        }
      });*/
    }
  }

  verify() {
    if (this.verifyForm.valid) {
      /*Accounts.verifyPhone(this.phone, this.verifyForm.value.code, (err) => {
        if (err) {
          this.error = err.reason || err;
        }
        else {
          this.router.navigate(['/']);
        }
      });*/
    }
  }
}
