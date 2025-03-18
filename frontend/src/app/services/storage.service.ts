import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { STORAGE_KEYS } from '../login/storage_keys.config';
import { LocalUser } from '../login/local_user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  getLocalUser(): LocalUser | any {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    let userLocal = localStorage.getItem(STORAGE_KEYS.localUser);
    if (userLocal == null) {
      return null;
    }
    else {
      return JSON.parse(userLocal);
    }
  }

  setLocalUser(local: LocalUser) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (local == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(local));
    }
  }
}