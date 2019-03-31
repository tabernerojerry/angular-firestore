import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientsService } from '../../services/clients.service';
import { SettingsService } from '../../services/settings.service';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: 0
  };
  disbaleBalanceOnEdit: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private _clientService: ClientsService,
    private _settingsService: SettingsService,
    private _flashMessage: FlashMessagesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get id from URL
    this.id = this._activatedRoute.snapshot.params.id;
    // Get Client
    this._clientService
      .getClient(this.id)
      .subscribe(client => (this.client = client));

    this.disbaleBalanceOnEdit = this._settingsService.getSettings().disabledBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      // Show Error
      this._flashMessage.show('Please fill up the form correctly', {
        cssClass: 'mat-card alert alert-danger',
        timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update client
      this._clientService.updateClient(value);
      // Show Message
      this._flashMessage.show('Client Updated!', {
        cssClass: 'mat-card alert alert-success',
        timeout: 4000
      });
      // Redirect to dashboard
      this._router.navigate(['/client/' + this.id]);
    }
  }
}
