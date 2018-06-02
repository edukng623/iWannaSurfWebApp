import { Injectable } from '@angular/core';
import { User } from './classes/user';

@Injectable()
export class SurfService {
  private user: User;
  private onLogIn: Function[] = [];

  constructor() { }

  logIn(name: String, pw: String){
    return new Promise(function(res, rej){
      setTimeout(()=> rej("User " + name + " does not exist"), 2000);
    })  
  }
  isAuthenticated(): Boolean {
    return this.user != null;
  }

  addMessage(receiver: String,message: String){
 
  }
  
}