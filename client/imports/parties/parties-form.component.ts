import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';

import { Parties } from '../../../both/collections/parties.collection';
//import { PartiesUpload } from './parties-upload.component';

import template from './parties-form.component.html';

@Component({
  selector: 'parties-form',
  template,
  directives: [REACTIVE_FORM_DIRECTIVES, MdCheckbox, MdInput, MdButton/*, PartiesUpload*/]
})
export class PartiesFormComponent implements OnInit {
  addForm: FormGroup;
  images: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      public: [false]
    });
  }

  resetForm() {
    this.addForm.controls['name']['updateValue']('');
    this.addForm.controls['description']['updateValue']('');
    this.addForm.controls['public']['updateValue'](false);
  }

  addParty() {
    if (this.addForm.valid) {
      if (Meteor.userId()) {
        Parties.insert({
          name: this.addForm.value.name,
          description: this.addForm.value.description,
          images: this.images,
          public: this.addForm.value.public,
          owner: Meteor.userId()
        });

        // XXX will be replaced by this.addForm.reset() in RC5+
        this.resetForm();
      } else {
        alert('Please log in to add a party');
      }
    }
  }

  onImage(imageId: string) {
    this.images.push(imageId);
  }
}
