import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private lss: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    let user = {} as User;
    this.userService.login(this.validateForm.controls.email.value, this.validateForm.controls.password.value).subscribe(result => {
      user = result;
      if (result._id) {
        this.lss.setUser(user);
        if (result.role === 'STUDENT') {
          this.router.navigate(['/start']);
        } else if (result.role === 'TEACHER') {
          this.router.navigate(['/start']);
        }
      } else {
        alert('unauthorized');
      }
    });
  }
}
