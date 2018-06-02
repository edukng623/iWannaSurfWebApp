import { Component, OnInit } from '@angular/core';
import { SurfService } from '../surf.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CredentialState, SamePasswordCredentialState} from './log-in-state';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  login =  new CredentialState("","");
  register = new SamePasswordCredentialState("","","",true);
  tabs: Function[] = [ () => {this.login.active = true; this.register.active = false},
                   () => {this.login.active = false; this.register.active = true}];
  logInError: String = undefined;
  logging: Boolean = false;
  constructor(private surfService: SurfService) { 
    this.tabChanged(0); 
  }

  ngOnInit() {

  }

  private signIn(){
     let user = this.login.getState();
     this.logging = true;
     this.surfService.logIn(user.username, user.password).then( _ => console.log("In"))
      .catch( err =>{
        this.logging = false;
        this.logInError = err
      } );
  }
 
  tabChanged(index){
    this.tabs[index]();
  }
}