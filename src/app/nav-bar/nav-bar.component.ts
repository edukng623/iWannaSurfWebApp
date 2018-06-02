import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../classes/user';
import { LogInComponent } from '../log-in/log-in.component';
import { SurfService } from '../surf.service';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // user: User;
  showLoginButton: Boolean = true;
  currentPath: String = "";
  constructor(private surfService: SurfService, private router: Router,public activatedRoute: ActivatedRoute ) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event:NavigationEnd) => {
        this.currentPath = event.url.slice(1);
        this.showLoginButton = !(this.currentPath === 'login');
    });
   }

  ngOnInit() {
    
  }

}