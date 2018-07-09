import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SurfService } from '../surf.service';
import { MatSnackBar } from '@angular/material';
import { tap, take } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MessageBusService } from '../services/message-bus.service';


export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
  nameValidator: FormControl =  new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[0-9a-zA-Z_.-]*')]);
  passwordValidator: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  emailValidator: FormControl = new FormControl('', [Validators.email]);

  isAdmin: Boolean = false;

  usersControl = new FormControl();
  subsControl = new FormControl();
  adminControl = new FormControl();

  hidePw = true;
  genPw = false;
  user = {
    username: '',
    password: '',
    email: '',
    admin: false
  };
  users = undefined;

  notifications = [];
  subscriptions = [];

  constructor(private surfService: SurfService, private snackBar: MatSnackBar, public dialog: MatDialog
  , private busService: MessageBusService) {
    this.refreshNotifications();
    this.isAdmin = this.surfService.user.admin;
  }

  ngOnInit() {
  }
  refreshNotifications() {
    this.surfService.userPoll.pipe( take(1)).subscribe( user => {
      this.notifications = user.notifications;
      this.subscriptions = user.subscriptionsSet;
    }, err => console.log(err));
  }
  closeNotification(id) {
    this.busService.notify('io-start', {});
    this.surfService.closeNotification(id).subscribe( _ => {
      this.busService.notify('io-end', {});
      this.refreshNotifications();
      this.snackBar.open('Closed', id, {
        duration: 2000
      });
    }, err => {
      this.busService.notify('io-end', {});
      this.snackBar.open('Error close', id, {
        duration: 2000
      });
    });
  }
  deleteSubscriptions() {
    console.log(this.subsControl.value);
    this.busService.notify('io-start', {});
    this.surfService.batchUnsubscription(this.subsControl.value).subscribe( _ => {
      this.busService.notify('io-end', {});
      this.refreshNotifications();
      this.snackBar.open('Unsubscriptions Done', 'Subscriptions', {
        duration: 2000
      });
    }, err => {
      this.busService.notify('io-end', {});
      this.snackBar.open(err, 'Subscriptions', {
        duration: 2000
      });
    });
  }
  searchUser(name) {
    this.busService.notify('io-start', {});
    this.surfService.searchUser(name).pipe( tap( users => console.log(users)) )
      .subscribe( users => {
        this.busService.notify('io-end', {});
        this.users = users['filter']( user => user._id !== this.surfService.user._id);

      }, err => {
        this.busService.notify('io-end', {});
        this.snackBar.open(err, 'Error', {
          duration: 2000
        });
      });
  }

  deleteUsers() {
    this.busService.notify('io-start', {});
    this.surfService.deleteUsers(this.usersControl.value).subscribe( _ => {
      this.busService.notify('io-end', {});
      this.snackBar.open('Users Deleted', 'User', {
        duration: 2000
      });
      this.users = undefined;
    }, err => {
      this.busService.notify('io-end', {});
      this.snackBar.open(err, 'User', {
        duration: 2000
      });
    });
  }
  createUser() {
    this.user.username = this.nameValidator.value;
    this.user.password = this.genPw ? this.randomPassword() : this.passwordValidator.value;
    this.user.email = this.emailValidator.value;
    this.user.admin = this.adminControl.value;
    console.log('Creating user');
    console.log(this.user);
    this.busService.notify('io-start', {});
    this.surfService.createUser(this.user).subscribe( _ => {
      this.busService.notify('io-end', {});
      this.snackBar.open('Created User and sent mail to ' + this.user.email, this.user.username, {
        duration: 8000
      });
      this.clear();
    }, err => {
      this.busService.notify('io-end', {});
      this.snackBar.open(err, 'Error', {
        duration: 2000
      });
    });
  }
  nameError() {
    if (this.nameValidator.hasError('minlength')) {
      return 'Name must be at least 6 characters';
    }
    if (this.nameValidator.hasError('pattern')) {
      return 'Name must not contain special characters';
    }
    return '';
  }

  emailError() {
    if (this.emailValidator.errors) {
      return 'Email is not compliant';
    }
    return '';
  }
  clear() {
    this.nameValidator.reset();
    this.passwordValidator.reset();
    this.emailValidator.reset();
    this.user.admin = false;
    this.genPw = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '250px',
      data: {password: this.user.password, username: this.user.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clear();
    });
  }

  randomPassword() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line:triple-equals
      const v = c == 'x'
      // tslint:disable-next-line:no-bitwise
      ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: 'user-dialog.html',
})
export class DialogUserComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onOk(): void {
    this.dialogRef.close();
  }

  copyPassword() {
    console.log('Copied ' + this.data.password);
  }

}
