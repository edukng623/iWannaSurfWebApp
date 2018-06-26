import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurfService } from '../surf.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-spot-edit',
  templateUrl: './spot-edit.component.html',
  styleUrls: ['./spot-edit.component.css']
})
export class SpotEditComponent implements OnInit {

  spot = undefined;
  constructor( private route: ActivatedRoute, private surfService: SurfService) {
    this.getSpot();
  }

  ngOnInit() {
  }

  getSpot() {
    const id = this.route.snapshot.paramMap.get('id');
    this.surfService.getSpotById(id).pipe( tap( spot => console.log(spot)) )
      .pipe( map( spot => JSON.parse(spot) ))
      .subscribe( spot => {
        this.spot = spot;
        console.log('Spot is ' + spot.identification);
      });
  }

  update() {
    console.log(this.spot.swell);
  }

}
