import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { MessageBusService } from '../services/message-bus.service';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.css']
})
export class NavFooterComponent implements OnInit {
  user: User;
  constructor(private busService: MessageBusService) {
    this.busService.on('login', args => {
      this.user = args.user;
    });
    this.busService.on('logout', args => this.user = undefined);
  }

  ngOnInit() {

  }

}
