import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { MessageBusService } from './services/message-bus.service';
@Injectable()
export class SurfService {

  private user: User;

  constructor(private busService: MessageBusService) { }

  logIn(name: String, pw: String) {
    return new Promise((res, rej) => {
      // rej(`User ${name} does not exist`);
      setTimeout(() => {
        if (name === 'reject') {
          rej(`User ${name} does not exist`);
          return;
        }
        this.user = this.testingUser(name);
        this.notifyLogin();
        res(this.user);
      }, 2000);
    });
  }

  notifyLogin() {
    this.busService.notify('login', {user: this.user});
  }
  isAuthenticated() {
    return this.user !== undefined;
  }

  logout() {
    return new Promise((res, rej) => {
      setTimeout( () => {
        this.user = undefined;
        this.busService.notify('logout', {});
        res();
      }, 2000);
    });
  }

  testingUser(name) {
    let user;
    if (name === 'edukng623') {
      user = new User('edukng623');
      user.setAdmin(true);
    } else {
      user = new User(name);
    }
    return user;
  }
}
