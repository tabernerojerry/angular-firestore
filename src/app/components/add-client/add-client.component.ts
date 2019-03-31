import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from '../../models/clients';
import { ClientsService } from '../../services/clients.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientsService: ClientsService,
    private settingsService: SettingsService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disabledBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // Show Error
      this.flashMessage.show('Please fill up the form correctly', {
        cssClass: 'mat-card alert alert-danger',
        timeout: 4000
      });
    } else {
      // Add new client
      this.clientsService.addClient(value);
      // Show Message
      this.flashMessage.show('New Client Added!', {
        cssClass: 'mat-card alert alert-success',
        timeout: 4000
      });
      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}

// NEXT: 64
