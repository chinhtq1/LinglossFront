import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  @Input()
  isVisible = false;

  isOkLoading = false;

  handleCancel(): void {
    this.isVisible = false;
  }

  login(): void {
    this.handleCancel();
    window.location.reload();
  }
}
