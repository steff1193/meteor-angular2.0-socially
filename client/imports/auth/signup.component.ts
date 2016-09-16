import { Component, OnInit } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router , ROUTER_DIRECTIVES} from '@angular/router';
import { MdInput } from '@angular2-material/input';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { Accounts } from 'meteor/accounts-base';

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template,
  directives: [ROUTER_DIRECTIVES, MdInput, MdToolbar, MdButton, REACTIVE_FORM_DIRECTIVES],
})
export class SignupComponent extends MeteorComponent implements OnInit {
  signupForm: FormGroup;
  error: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup() {
    if (this.signupForm.valid) {
      Accounts.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }, (err) => {
        if (err) {
          this.error = err;
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
