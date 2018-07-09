import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { MessageBusService } from './services/message-bus.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap, take, takeUntil } from 'rxjs/operators';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { interval, timer } from 'rxjs';


// const API_PATH: String = 'http://localhost:3000';
const API_PATH: String = '';

@Injectable()
export class SurfService {
  public logout$;
  public user: User;

  private startPolling: Boolean = false;
  private endPolling: Boolean = false;

  public userPoll: Observable<any>;


  constructor(private busService: MessageBusService, private http: HttpClient ) {

  }

  searchSpot(spot: string): Observable<any> {
    return this.http.get(API_PATH + `/api/spots?q=${spot}`);
  }

  getSpotById(id: string): Observable<any> {
    return this.http.get(API_PATH + `/api/spot/${id}`);
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

  createUser(user) {
    return this.http.post(API_PATH + `/api/user`, user);
  }

  deleteUsers(users) {
    return this.http.post(API_PATH + `/api/users/delete`, users);
  }
  searchUser(name) {
    return this.http.get(API_PATH + `/api/user/search?name=${name}`);
  }

  getUserById(id) {
    return this.http.get(API_PATH + `/api/user/` + id);
  }
  subscribeSpot(id) {
    this.user.subscriptions.push(id);
    delete this.user.password;
    return this.http.put(API_PATH + `/api/user`, this.user);
  }
  closeNotification(id) {
    return this.http.put(API_PATH + `/api/notification/${id}/opened`, {});
  }
  unsubscribeSpot(id) {
    this.user.subscriptions.splice(this.user.subscriptions.indexOf(id), 1);
    delete this.user.password;
    return this.http.put(API_PATH + `/api/user`, this.user);
  }
  updateUserPassword() {
    return this.http.put(API_PATH + `/api/user/password`, this.user);
  }
  batchUnsubscription(ids) {
    ids.forEach( id => this.user.subscriptions.splice(this.user.subscriptions.indexOf(id), 1));
    return this.http.put(API_PATH + `/api/user`, this.user);
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

    return this.http.post(`${API_PATH}/api/user/login`, {username: name, password: pw}, { headers: new HttpHeaders()})
      .pipe(
        tap(
          data =>  {
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));
            this.user = User.valueOf(data);
            this.enablePoll();
            this.notifyLogin();
          },
          error => console.error(error)
        )
      );
    // return this.mockLogIn(name, pw);
  }
  enablePoll() {
    this.userPoll = timer(0, 2000)
    // .pipe( take(1) )~
    .pipe( takeUntil( this.logout$ ))
    .pipe(
      switchMap( () => this.getUserById(this.user._id))
    ).pipe(
      tap( user => this.user = User.valueOf(user))
    );
    // .pipe( tap( user => console.log(user)));

    // this.userPoll.subscribe( user => console.log(user), err => console.error(err));
  }
  notifyLogin() {
    this.busService.notify('login', {user: this.user});
  }
  isAuthenticated() {
    return this.user !== undefined;
  }

  logout() {
    return this.http.post(API_PATH + '/api/user/logout', {})
      // .pipe( tap( _ => this.userPoll = timer(0, 20000).pipe( take(0))))
      .pipe( tap( _ => this.user = undefined ))
      .pipe( tap( _ => this.busService.notify('logout', {})));
  }

  testingUser(name) {
    let user;
    if (name === 'edukng623') {
      user = new User('edukng623');
      user.setAdmin(true);
      user._id = '5b3a9854811a641d58af168c';
      user.password = 'e296ccda-f3a0-4bb9-820f-f83a4a447bba';
      user.email = 'edujorge13@gmail.com';
    } else {
      user = new User(name);
    }
    return user;
  }
}
