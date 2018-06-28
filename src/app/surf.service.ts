import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { MessageBusService } from './services/message-bus.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


const API_PATH: String = 'http://localhost:3000';

@Injectable()
export class SurfService {

  private user: User;

  constructor(private busService: MessageBusService, private http: HttpClient ) {

  }

  searchSpot(spot: string): Observable<any> {
    return this.http.get(API_PATH + `/api/spots/search?name=${spot}`);
  }

  getSpotById(id: string): Observable<any> {
    return this.http.get(API_PATH + `/api/spots/get?id=${id}`);
  }

  createSpot(spot): Observable<any> {
    return this.http.post(API_PATH + `/api/spot`, spot);
  }

  updateSpot(spot): Observable<any> {
    return this.http.put(API_PATH + `/api/spot`, spot);
  }

  deleteSpot(id): Observable<any> {
    return this.http.delete(API_PATH + `/api/spot?id=${id}`);
  }
  mockLogIn(name: String, pw: String) {
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
      }, 500);
    });
  }

  logIn(name: String, pw: String) {

    // this.http.post(`${API_PATH}/api/users/login`, {username: name, password: pw}, { headers: new HttpHeaders()})
    //   .pipe(
    //     tap(
    //       data => console.log(data),
    //       error => console.error(error)
    //     )
    //   ).subscribe( user => {
    //     localStorage.setItem('user', JSON.stringify({user}));
    //   });

    return this.mockLogIn(name, pw);
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
