import { Component, OnInit } from '@angular/core';
import {fadeAnimation} from '../animations/fade-in';
import { MessageBusService } from '../services/message-bus.service';
import { SurfService } from '../surf.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  animations: [fadeAnimation]
})
export class DashBoardComponent implements OnInit {
  spots = [];
  showList = false;
  constructor(private busService: MessageBusService, private surfService: SurfService) { }

  ngOnInit() {
  }
  searchSpot(spot) {
    this.busService.notify('io-start', {message: `Searching for ${spot}`});
    this.surfService.searchSpot(spot)
      .pipe( tap( spots => console.log(spots)) )
      .subscribe(spots => {
        this.spots = spots;
        this.showList = true;
        this.busService.notify('io-end', {message: ''});
      });
  }



}
