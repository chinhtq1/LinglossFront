import {Component, Input, OnInit} from '@angular/core';
import {TermService} from '../../services/term.service';
import {Term} from '../../models/term';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {timer} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.scss']
})
export class TermFormComponent implements OnInit {

  @Input()
  term: Term = {definition: [], attributes: []} as Term;

  termIsNew = false;

  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  listOfValueControl: Array<{ id: number; controlInstance: string }> = [];
  user: User;

  constructor(private route: ActivatedRoute,
              private termService: TermService,
              private fb: FormBuilder,
              public msg: NzMessageService,
              private router: Router,
              private lss: LocalStorageService) {
    this.user = this.lss.getUser();
  }

  ngOnInit(): void {
    this.termIsNew = !(!!this.term.name);
    this.validateForm = this.fb.group({});
    if (!this.term.name) {
      this.validateForm.addControl('nameControl', new FormControl(null, Validators.required));
    }
    this.validateForm.addControl('definitionControl', new FormControl(this.term.definition[0], Validators.required));
    if (this.term.attributes.length > 0) {
      this.term.attributes.forEach(attribute => {
        this.addField(null, attribute);
      });
    }
  }

  addField(e?: MouseEvent, attribute?: {attribute: string, value: string}): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const control = {
      id,
      controlInstance: `attribute${id}`
    };
    const vcontrol = {
      id: id * 1000,
      controlInstance: `attributesValue${id}`
    };
    const index = this.listOfControl.push(control);
    this.listOfValueControl.push(vcontrol);
    this.validateForm.addControl(this.listOfControl[index - 1].controlInstance,
      new FormControl(attribute ? attribute.attribute : null, Validators.required));
    this.validateForm.addControl(this.listOfValueControl[index - 1].controlInstance,
      new FormControl(attribute ? attribute.value : null, Validators.required));
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 0) {
      const index = this.listOfValueControl.indexOf(i);
      this.listOfValueControl.splice(index, 1);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
      this.validateForm.removeControl(`attribute${i.id / 1000}`);
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      if (this.validateForm.controls[`nameControl`]) {
        this.term.name = this.validateForm.controls[`nameControl`].value;
      }
      this.term.definition[0] = this.validateForm.controls[`definitionControl`].value;
      if (!this.term.discipline) {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        this.term.discipline = s[1].path;
      }
      if (this.term.attributes) {
        this.term.attributes.length = 0;
      }
      if (this.listOfControl.length > 0) {
        this.listOfControl.forEach((control, index) => {
          this.term.attributes.push({
            attribute: this.validateForm.controls[this.listOfControl[index].controlInstance].value,
            value: this.validateForm.controls[this.listOfValueControl[index].controlInstance].value
          });
        });
      }
      this.term.id = null;
      if (this.user) {
        this.term.userId = this.user.id;
        if (this.user.role === 'STUDENT') {
          this.term.applicationMode = true;
        } else if (this.user.role === 'TEACHER') {
          this.term.applicationMode = false;
        }
      }
      this.termService.sendTerm(this.term).subscribe(() => {
        if (this.user.role === 'STUDENT') {
          this.msg.success('You application has been sent!');
          console.log(this.term);
        } else if (this.user.role === 'TEACHER') {
          this.msg.success('Your term has been published!');
        }
        this.term = {attributes: []} as Term;
        timer(3500).subscribe(() => {
          this.term = {attributes: []} as Term;
          this.router.navigate(['start']);
        });
      });
    }
  }
}
