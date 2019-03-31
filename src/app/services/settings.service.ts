import { Injectable } from '@angular/core';

import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disabledBalanceOnAdd: true,
    disabledBalanceOnEdit: false
  };

  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings = (): Settings => this.settings;

  changeSettings = (settings: Settings) => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
