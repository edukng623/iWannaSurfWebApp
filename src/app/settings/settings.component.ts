import { Component, OnInit } from '@angular/core';
import { SurfService } from '../surf.service';
import { MatSnackBar } from '@angular/material';
import { MessageBusService } from '../services/message-bus.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  passwordValidator: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password: String;
  hidePw = true;
  constructor(private surfService: SurfService, private snackBar: MatSnackBar, private busService: MessageBusService) {
    this.password = this.surfService.user.password;
   }

  ngOnInit() {
  }

  changePassword() {
    this.busService.notify('io-start', {});
    this.surfService.user.password = this.passwordValidator.value;
    this.surfService.updateUserPassword().subscribe( _ => {
      this.busService.notify('io-end', {});
      this.snackBar.open('Changed Password', 'Settings', {
        duration: 2000
      });
    }, err => {
      this.busService.notify('io-end', {});
      this.snackBar.open('Error Changing Password', 'Settings', {
        duration: 2000
      });
    });
  }
}
