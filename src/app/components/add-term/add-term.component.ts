import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TermService } from '../../services/term.service';
import { Term } from '../../models/term';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.scss']
})
export class AddTermComponent implements OnInit {

  isVisible = false;

  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  term: Term;

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `${id}`
    };
    const index = this.listOfControl.push(control);
    this.validateForm.addControl(this.listOfControl[index - 1].controlInstance, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,
              private termsService: TermService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
    this.term = {} as Term;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.term.name = this.validateForm.controls[0].value;
    this.term._id = null;
    this.isVisible = false;
    this.termsService.sendTerm(this.term).subscribe();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
