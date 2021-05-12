import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  validateForm!: FormGroup;
  user: User = {} as User;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.user.email = this.validateForm.controls.email.value;
      this.user.password = this.validateForm.controls.password.value;
      this.user.name = this.validateForm.controls.name.value;
      this.user.surname = this.validateForm.controls.surname.value;
      this.user.role = 'STUDENT';
      this.user.disciplines = [];
      this.userService.registerUser(this.user).subscribe(user => {
        this.lss.setUser(user);
        window.location.reload();
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private lss: LocalStorageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]]
    });
  }
}
