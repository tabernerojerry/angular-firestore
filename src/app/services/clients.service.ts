import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(public afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('clients', ref =>
      ref.orderBy('lastname', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(action => {
          const data = action.payload.doc.data() as Client;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.clients;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          const dataId = action.payload.id;
          return { id: dataId, ...data };
        }
      })
    );

    return this.client;
  }

  updateClient(client: Client) {
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
