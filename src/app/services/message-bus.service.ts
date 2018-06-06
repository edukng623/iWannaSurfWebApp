import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MessageBusService {
  events = {};

  constructor( ) {}

  on(id: string, listener: Function) {
    if (!this.events[id]) {
      this.init(id);
    }
    this.events[id].push(listener);
  }

  notify(id: string, args) {
    this.events[id].forEach( listener => {
      listener(args);
    });
  }

  private init(id: string) {
    this.events[id] = [];
  }
}
