import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurfService } from '../surf.service';
import { tap, map } from 'rxjs/operators';
import { Defaults } from './defaults';
import { MatSnackBar } from '@angular/material';
import { MessageBusService } from '../services/message-bus.service';

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
  following: Boolean = false;
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
  private router: Router, private snackBar: MatSnackBar, private busService: MessageBusService) {
    this.getSpot();
  }

  ngOnInit() {
  }
  unsubscribe() {
    this.busService.notify('io-start', {message: `Unsubscribing ${this.spot._id}`});
    this.surfService.unsubscribeSpot(this.spot._id)
      .pipe( tap( _ => console.log('Unsubscribed' + this.spot._id)) )
      .subscribe(_ => {
        this.busService.notify('io-end', {message: `Unsubscribing ${this.spot._id}`});
        this.snackBar.open('Unsubscribed ', this.spot._id, {
          duration: 2000
        });
      }, err => {
        this.busService.notify('io-end', {message: `Unsubscribing ${this.spot._id}`});
        this.snackBar.open('Error unsubscribing ', this.spot._id, {
          duration: 2000
        });
      });
  }
  subscribe() {
    this.busService.notify('io-start', {});
    this.surfService.subscribeSpot(this.spot._id)
      .pipe( tap( _ => console.log('Subscribed ' + this.spot._id)) )
      .subscribe( _ => {
        this.busService.notify('io-end', {});
        this.snackBar.open('Subscribed ', this.spot._id, {
          duration: 2000
        });
      }, err => {
        this.busService.notify('io-end', {});
        this.snackBar.open('Error subscribing ', this.spot._id, {
          duration: 2000
        });
      });
  }
  checkFollowing() {
    if (this.surfService.user) {
      this.following = this.surfService.user.subscriptions.find( sub => sub === this.spot._id ) && true || false;
    }
  }
  getSpot() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.spot = Defaults.emptySpot();
      this.create = true;
      return;
    }
    this.busService.notify('io-start', {});
    this.surfService.getSpotById(id).pipe(tap(spot => console.log(spot)))
      // .pipe(map(spot => JSON.parse(spot)))
      .subscribe(spot => {
        this.spot = spot;
        this.surfService.userPoll.subscribe( user => {
          this.checkFollowing();
        });
        console.log('Spot is ' + spot.identification);
        this.busService.notify('io-end', {});
      }, err => {
        this.busService.notify('io-end', {});
        this.snackBar.open('Error loading ', id, {
          duration: 2000
        });
      });
  }

  update() {
    // console.log(this.spot);
    this.busService.notify('io-start', {});
    this.surfService.updateSpot(this.spot).pipe( tap( spot => console.log(spot) ) )
      .subscribe( spot => {
        this.busService.notify('io-end', {});
        this.snackBar.open('Updated Spot', this.spot.identification.name, {
          duration: 2000
        });
      }, err => {
        this.busService.notify('io-end', {});
        this.snackBar.open(err, 'Error', {
          duration: 2000
        });
      });
  }

  createSpot() {
    console.log('Spot is: ');
    console.log(this.spot);
    this.busService.notify('io-start', {});
    this.surfService.createSpot(this.spot).pipe( tap( spot => console.log(spot)) )
      .subscribe( spot => {
        this.busService.notify('io-end', {});
        this.router.navigate([`/spots/edit/${spot['_id']}`]);
        this.create = false;
        this.spot = spot;
      },
      err => {
        this.busService.notify('io-end', {});
        console.log(err);
      });
  }

  delete() {
    this.busService.notify('io-start', {});
    this.surfService.deleteSpot(this.spot._id).pipe( tap( spot => console.log(spot) ))
      .subscribe( _ => {
        this.busService.notify('io-end', {});
        this.snackBar.open('Deleted Spot', this.spot.identification.name, {
          duration: 2000
        });
        this.router.navigate([`/dashboard`]);
      }, err => {
        this.busService.notify('io-end', {});
        this.snackBar.open(err, 'Error', {
          duration: 2000
        });
      });
  }

}
