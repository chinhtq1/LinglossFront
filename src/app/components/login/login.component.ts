import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  error = '';
  passwordVisible = false;
  @Output()
  closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private lss: LocalStorageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    this.userService.login(this.validateForm.controls.email.value, this.validateForm.controls.password.value).subscribe(user => {
      if (user && user.id) {
        this.lss.setUser(user);
        this.closeModal.emit();
      } else {
        this.error = 'Аккаунта с такими адресом и паролем не существует. Пожалуйста, попробуйте еще раз';
      }
    });
  }
}
