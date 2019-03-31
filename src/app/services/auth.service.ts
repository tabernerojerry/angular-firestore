import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  register = ({ email, password }: User) => {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

  login = ({ email, password }: User) => {
    return new Promise((resolve, reject) => {
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

  getAuth = () => this.afAuth.authState.pipe(map(auth => auth));

  logOut = () => this.afAuth.auth.signOut();
}
