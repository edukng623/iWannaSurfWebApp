import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  quotes: String[] = [
    "Why do we fall? So that we can learn to pick ourselves back up.",
    "Our greatest glory is not in ever falling, but in rising every time we fall.",
    "If you kill a killer, the number of killers in the room remains the same.",
    "Sometimes it’s only madness that makes us what we are.",
    "You either die a hero, or live long enough to see yourself become a villain."
  ];
  quote: String;
  constructor() { 
    this.quote = this.quotes[this.getRandomArbitrary(0, this.quotes.length - 1)];
  }

  ngOnInit() {
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}