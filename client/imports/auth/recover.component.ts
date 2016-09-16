import { Component, OnInit } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router , ROUTER_DIRECTIVES} from '@angular/router';
import { MdInput } from '@angular2-material/input';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';
import { Accounts } from 'meteor/accounts-base';

import template from './recover.component.html';

@Component({
  selector: 'recover',
  template,
  directives: [ROUTER_DIRECTIVES, MdInput, MdToolbar, MdButton, REACTIVE_FORM_DIRECTIVES],
})
export class RecoverComponent extends MeteorComponent implements OnInit {
  recoverForm: FormGroup;
  error: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.recoverForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    this.error = '';
  }

  recover() {
    if (this.recoverForm.valid) {
      Accounts.forgotPassword({
        email: this.recoverForm.value.email
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
