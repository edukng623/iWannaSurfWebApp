import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../classes/user';
import { LogInComponent } from '../log-in/log-in.component';
import { SurfService } from '../surf.service';
import { MessageBusService } from '../services/message-bus.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // user: User;
  showLoginButton: Boolean = true;
  loggedIn: Boolean = false;
  currentPath: String = '';
  intensiveIo: Boolean = false;

  constructor(private surfService: SurfService, private router: Router, public activatedRoute: ActivatedRoute,
  private messageBusService: MessageBusService ) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        this.currentPath = event.url.slice(1);
        this.showLoginButton = !(this.currentPath === 'login');
    });

    this.messageBusService.on('search', (str) => {
      console.log(`Searching for ${str}.`);
      this.intensiveIo = true;
    });
    this.messageBusService.on('login', args => this.loggedIn = true);
    this.messageBusService.on('logout', args => this.loggedIn = false);
    this.messageBusService.on('io-start', args => {
      console.log(args.message);
      this.intensiveIo = true;
    });

    this.messageBusService.on('io-end', args => {
      this.intensiveIo = false;
    });
   }

  logout() {
    this.messageBusService.notify('io-start', {});
    this.surfService.logout().then( _ => {
      console.log('Logout ended');
      this.messageBusService.notify('io-end', {});
    }).catch( err => {
      console.log('Logout ended with err: ' + err);
      this.messageBusService.notify('io-end', {});
    });
  }

  ngOnInit() {

  }

}
