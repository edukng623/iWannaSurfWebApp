import { Component, OnInit } from '@angular/core';
import { MessageBusService } from '../services/message-bus.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor(private messageBusService: MessageBusService ) { }

  ngOnInit() {
  }

}
