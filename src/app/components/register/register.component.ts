import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: User = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onSubmit = () => {
    this.authService
      .register(this.data)
      .then(() => {
        this.flashMessage.show('You are now registered and logged in', {
          cssClass: 'mat-card alert alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err =>
        this.flashMessage.show(err.message, {
          cssClass: 'mat-card alert alert-danger',
          timeout: 4000
        })
      );
  }
}
