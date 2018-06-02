import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
@Component({
  selector: 'nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.css']
})
export class NavFooterComponent implements OnInit {
  user: User = new User("edukng623");
  constructor() { 
    this.user.setAdmin(true);
  }

  ngOnInit() {
  }

}