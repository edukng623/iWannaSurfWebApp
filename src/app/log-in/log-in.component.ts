import { Component, OnInit } from '@angular/core';
import { SurfService } from '../surf.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialState, SamePasswordCredentialState } from './log-in-state';
import { MatSnackBar } from '@angular/material';
import { MessageBusService } from '../services/message-bus.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  login = new CredentialState('', '');
  register = new SamePasswordCredentialState('', '', '', true);
  tabs: Function[] = [() => { this.login.active = true; this.register.active = false; },
  () => { this.login.active = false; this.register.active = true; }];


  constructor(private surfService: SurfService, private router: Router,
    private snackBar: MatSnackBar, private busService: MessageBusService) {
    this.tabChanged(0);
  }

  ngOnInit() {

  }

  private signIn() {
    const user = this.login.getState();
    this.busService.notify('io-start', {message: 'Logging in..'});
    this.surfService.logIn(user.username, user.password).then(_ => {
      this.busService.notify('io-end', {});
      this.router.navigate(['home']);
    })
      .catch(err => {
        this.busService.notify('io-end', {});
        this.snackBar.open(err, 'Error', {
          duration: 2000,
        });
      });
  }

  tabChanged(index) {
    this.tabs[index]();

  }
}
