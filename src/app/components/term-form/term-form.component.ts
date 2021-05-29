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
  term: Term = {
    definition: [],
    attributes: [],
    subjectArea: []} as Term;

  validateForm!: FormGroup;

  definitionControlList: Array<{ id: number; controlInstance: string }> = [];
  attributeControlList: Array<{ id: number; controlInstance: string }> = [];
  attributeValueControlList: Array<{ valueId: number; controlInstance: string }> = [];
  subjectAreaControlList: Array<{ id: number; controlInstance: string }> = [];
  subjectAreaValueControlList: Array<{ valueId: number; controlInstance: string }> = [];

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
    this.validateForm = this.fb.group({});
    this.validateForm.addControl('nameControl', new FormControl(this.term.name ? this.term.name : null, Validators.required));
    if (this.term.definition.length > 0) {
      this.term.definition.forEach(() => {
        this.addDefinition();
      });
    } else {
      this.addDefinition();
    }
    if (this.term.attributes.length > 0) {
      this.term.attributes.forEach(() => {
        this.addAttribute();
      });
    }
    if (this.term.subjectArea.length > 0) {
      this.term.subjectArea.forEach(() => {
        this.addSubjectArea();
      });
    }
  }

  addDefinition(): void {
    const id = this.definitionControlList.length > 0 ?
      this.definitionControlList[this.definitionControlList.length - 1].id + 1 : 0;
    const control = {
      id,
      controlInstance: `definitionControl${id}`
    };
    const index = this.definitionControlList.push(control);
    this.validateForm.addControl(this.definitionControlList[index - 1].controlInstance,
      new FormControl(this.term.definition.length > 0 ? this.term.definition[index - 1] : null, Validators.required));
  }

  addAttribute(): void {
    const id = this.attributeControlList.length > 0 ?
      this.attributeControlList[this.attributeControlList.length - 1].id + 1 : 100;
    const control = {
      id,
      controlInstance: `attributeControl${id}`
    };

    const valueId = this.attributeValueControlList.length > 0 ?
      this.attributeControlList[this.attributeControlList.length - 1].id * 300 + 1 : 300;
    const valueControl = {
      valueId,
      controlInstance: `attributeControl${valueId}`
    };

    const index = this.attributeControlList.push(control);
    this.attributeValueControlList.push(valueControl);
    this.validateForm.addControl(this.attributeControlList[index - 1].controlInstance,
      new FormControl(this.term.attributes.length > 0 ? this.term.attributes[index - 1].attribute : null, Validators.required));
    this.validateForm.addControl(this.attributeValueControlList[index - 1].controlInstance,
      new FormControl(this.term.attributes.length > 0 ? this.term.attributes[index - 1].value : null, Validators.required));
  }

  addSubjectArea(): void {
    const id = this.subjectAreaControlList.length > 0 ?
      this.subjectAreaControlList[this.subjectAreaControlList.length - 1].id * 10000 + 1 : 10000;
    const control = {
      id,
      controlInstance: `subjectAreaControl${id}`
    };

    const valueId = this.subjectAreaValueControlList.length > 0 ?
      this.attributeControlList[this.attributeControlList.length - 1].id * 700 + 1 : 700;
    const valueControl = {
      valueId,
      controlInstance: `subjectAreaValueControl${valueId}`
    };

    const index = this.subjectAreaControlList.push(control);
    this.subjectAreaValueControlList.push(valueControl);
    this.validateForm.addControl(this.subjectAreaControlList[index - 1].controlInstance,
      new FormControl(this.term.subjectArea.length > 0 ? this.term.subjectArea[index - 1].area : null, Validators.required));
    this.validateForm.addControl(this.subjectAreaValueControlList[index - 1].controlInstance,
      new FormControl(this.term.subjectArea.length > 0 ? this.term.subjectArea[index - 1].termDefinition : null, Validators.required));
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
      if (!this.term.discipline) {
        const tree: UrlTree = this.router.parseUrl(this.router.url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;
        this.term.discipline = s[1].path;
      }
      if (this.term.definition.length > 0) {
        this.term.definition = [];
      }
      this.definitionControlList.forEach((control, index) => {
        this.term.definition.push(this.validateForm.controls[control.controlInstance].value);
      });
      if (this.term.attributes.length > 0) {
        this.term.attributes = [];
      }
      if (this.attributeControlList.length > 0) {
        this.attributeControlList.forEach((control, index) => {
          this.term.attributes.push({
            attribute: this.validateForm.controls[this.attributeControlList[index].controlInstance].value,
            value: this.validateForm.controls[this.attributeValueControlList[index].controlInstance].value
          });
        });
      }
      if (this.term.subjectArea.length > 0) {
        this.term.subjectArea = [];
      }
      if (this.subjectAreaControlList.length > 0) {
        this.subjectAreaControlList.forEach((control, index) => {
          this.term.subjectArea.push({
            area: this.validateForm.controls[this.subjectAreaControlList[index].controlInstance].value,
            termDefinition: this.validateForm.controls[this.subjectAreaValueControlList[index].controlInstance].value
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

  removeField(fieldType: string, index: number): void {
    if (fieldType === 'definition') {
      const control = this.definitionControlList.splice(index, 1)[0];
      this.validateForm.removeControl(control.controlInstance);
    } else if (fieldType === 'attribute' || fieldType === 'subjectArea') {
      const control = fieldType === 'attribute' ?
        this.attributeControlList.splice(index, 1)[0] : this.subjectAreaControlList.splice(index, 1)[0];
      const vControl = fieldType === 'attribute' ?
        this.attributeValueControlList.splice(index, 1)[0] : this.subjectAreaValueControlList.splice(index, 1)[0];
      this.validateForm.removeControl(control.controlInstance);
      this.validateForm.removeControl(vControl.controlInstance);
    }
  }
}
