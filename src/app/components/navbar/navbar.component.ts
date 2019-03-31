import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.showRegister = this.settingsService.getSettings().allowRegistration;

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick = () => {
    this.authService.logOut().then(() => {
      this.isLoggedIn = false;
      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });

    this.flashMessage.show('You are now logged out!', {
      cssClass: 'mat-card alert alert-success',
      timeout: 4000
    });

    this.router.navigate(['/login']);
  }
}
