import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurfService } from '../surf.service';
import { tap, map } from 'rxjs/operators';
import { Defaults } from './defaults';
import { MatSnackBar } from '@angular/material';

export class Crowd {
  value: String;
  description: String;
}

@Component({
  selector: 'app-spot-edit',
  templateUrl: './spot-edit.component.html',
  styleUrls: ['./spot-edit.component.css']
})
export class SpotEditComponent implements OnInit {
  create = false;
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
  constructor(private route: ActivatedRoute, private surfService: SurfService,
  private router: Router, private snackBar: MatSnackBar) {
    this.getSpot();
  }

  ngOnInit() {
  }

  getSpot() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.spot = Defaults.emptySpot();
      this.create = true;
      return;
    }
    this.surfService.getSpotById(id).pipe(tap(spot => console.log(spot)))
      // .pipe(map(spot => JSON.parse(spot)))
      .subscribe(spot => {
        this.spot = spot;
        console.log('Spot is ' + spot.identification);
      });
  }

  update() {
    console.log(this.spot);
    this.surfService.updateSpot(this.spot).pipe( tap( spot => console.log(spot) ) )
      .subscribe( spot => {
        this.snackBar.open('Updated Spot', this.spot.identification.name, {
          duration: 2000
        });
      }, err => {
        this.snackBar.open(err, 'Error', {
          duration: 2000
        });
      });
  }

  createSpot() {
    console.log('Spot is: ');
    console.log(this.spot);

    this.surfService.createSpot(this.spot).pipe( tap( spot => console.log(spot)) )
      .subscribe( spot => {
        this.router.navigate([`/spots/edit/${spot['_id']}`]);
        this.create = false;
        this.spot = spot;
      },
      err => {
        console.log(err);
      });
  }

  delete() {
    this.surfService.deleteSpot(this.spot._id).pipe( tap( spot => console.log(spot) ))
      .subscribe( _ => {
        this.snackBar.open('Deleted Spot', this.spot.identification.name, {
          duration: 2000
        });
        this.router.navigate([`/dashboard`]);
      }, err => {
        this.snackBar.open(err, 'Error', {
          duration: 2000
        });
      });
  }

}
