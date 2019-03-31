import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private _clientService: ClientsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get id from URL
    this.id = this._activatedRoute.snapshot.params.id;
    // Get Client
    this._clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        this.client = client;

        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
    });
  }

  updateBalance() {
    this._clientService.updateClient(this.client);

    // Show Message
    this._flashMessage.show('Balance Updated!', {
      cssClass: 'mat-card alert alert-success',
      timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this._clientService.deleteClient(this.client);

      // Show Message
      this._flashMessage.show('Client removed!', {
        cssClass: 'mat-card alert alert-success',
        timeout: 4000
      });

      // redirect to dashbaord
      this._router.navigate(['/']);
    }
  }
}
