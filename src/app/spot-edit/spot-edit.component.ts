import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurfService } from '../surf.service';
import { tap, map } from 'rxjs/operators';
export class Crowd {
  value: String;
  description: String;
}
@Component({
  selector: 'app-spot-edit',
  templateUrl: './spot-edit.component.html',
  styleUrls: ['./spot-edit.component.scss']
})
export class SpotEditComponent implements OnInit {
  selectedTabIndex = 0;
  spot = undefined;

  crowds: Crowd[] = [
    {
      value: '5',
      description: 'Extremely Crowded'
    },
    {
      value: '4',
      description: 'Crowded'
    },
    {
      value: '3',
      description: 'Some surfers'
    },
    {
      value: '2',
      description: 'Lightly Crowded'
    }
  ];
  constructor(private route: ActivatedRoute, private surfService: SurfService) {
    this.getSpot();
  }

  ngOnInit() {
  }

  getSpot() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surfService.getSpotById(id).pipe(tap(spot => console.log(spot)))
      // .pipe(map(spot => JSON.parse(spot)))
      .subscribe(spot => {
        this.spot = spot;
        console.log('Spot is ' + spot.identification);
      });
  }

  update() {
    console.log(this.spot.swell);
    console.log(this.spot.additionalInfo.crowd.weekDays);
  }

}
