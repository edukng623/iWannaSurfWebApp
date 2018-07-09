import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../classes/user';
import { LogInComponent } from '../log-in/log-in.component';
import { SurfService } from '../surf.service';
import { MessageBusService } from '../services/message-bus.service';
import {MatButton} from '@angular/material/button';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // user: User;
  @ViewChild('logoutButton') logoutButton: MatButton;
  // logout$: Observable<any>;

  showLoginButton: Boolean = true;
  loggedIn: Boolean = false;
  currentPath: String = '';
  intensiveIo: Boolean = false;

  notifications: Number = 0;
  constructor(private surfService: SurfService, private router: Router, public activatedRoute: ActivatedRoute,
  private messageBusService: MessageBusService ) {

    this.initRouterEvents();

    this.messageBusService.on('search', (str) => {
      console.log(`Searching for ${str}.`);
      this.intensiveIo = true;
    });
    this.messageBusService.on('login', (args) => this.onLogin(args));
    this.messageBusService.on('logout', args => this.loggedIn = false);
    this.messageBusService.on('io-start', args => {
      console.log(args.message);
      this.intensiveIo = true;
    });

    this.messageBusService.on('io-end', args => {
      this.intensiveIo = false;
    });

   }
   onLogin(args) {
    this.loggedIn = true;
    this.surfService.userPoll.subscribe( user => {
      // console.log( user.notifications);
      this.notifications = user.notifications && user.notifications.filter( n => n.opened ).length
                              || 0;
    });
   }
  logout() {
    this.messageBusService.notify('io-start', {});

    this.surfService.logout().subscribe( _ => {
      console.log('Logout ended');
      this.router.navigate(['home']);
      this.messageBusService.notify('io-end', {});
    }, err => {
      console.log('Logout ended with err: ' + err);
      this.messageBusService.notify('io-end', {});
    });
  }
  initRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        this.currentPath = event.url.slice(1);
        this.showLoginButton = !(this.currentPath === 'login');
    });
  }
  ngOnInit() {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.surfService.logout$ = Observable.fromEvent(this.logoutButton._elementRef.nativeElement, 'click');
  }
}
