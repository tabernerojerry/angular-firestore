import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: User = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit = () => {
    this.authService
      .login(this.data)
      .then(() => {
        this.flashMessage.show('You are now logged in', {
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
