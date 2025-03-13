import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../login/storage_keys.config';
import { LocalUser } from '../login/local_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
 
  getLocalUser() : LocalUser | null{
    let localUser = localStorage.getItem(STORAGE_KEYS.localUser);
    if (localUser == null) {
        return null;
    } else {
      return JSON.parse(localUser);
    }
  }

  setLocalUser(objeto: LocalUser | null): void {
    if (objeto == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(objeto));
    }
  }
}
