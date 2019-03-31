import { Component, OnInit } from '@angular/core';

import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Balance', 'Details'];
  clients: Client[];
  totalOwed: number;

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();

      console.log(clients);
    });
  }

  getTotalOwed() {
    let total = 0;
    for (let i = 0; i < this.clients.length; i++) {
      total += this.clients[i].balance;
    }

    this.totalOwed = total;
  }
}
