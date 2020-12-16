import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  public user;
  public username;
  public email;
  public mobile;
  public which;
  public address;
  public password;
  public disableemail=true;
  public disablemobile=true;
  public disableaddress=true;
  public newpass;
  public disablepassword=true;
  public newpassword;
  public details;
  public type;

  constructor(public mediaobserver: MediaObserver, private authorization: AuthorizationService, private router: Router,
    private snackbar: MatSnackBar){}

  ngOnInit(){
    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

    this.username=this.user.username;
    this.email=this.user.email;
    this.mobile=this.user.mobile;
    this.address=this.user.address;
    this.password=this.user.password;
    this.type=this.user.phase;
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  editemail()
  {
    this.disableemail=false;
  }

  editmobile()
  {
    this.disablemobile=false;
  }

  editaddress()
  {
    this.disableaddress=false;
  }

  onBlurMethod()
  {
    if(this.newpass==this.password)
    {
      this.disablepassword=false;
    }
  }

  Submit()
  {
    this.password=this.newpassword;
    const details= {
      id: this.user._id,
      username: this.username,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      password: this.password
    };

    console.log(details);
    if(this.mobile)
    this.authorization.updateUser(details,this.type)
    .subscribe((details) => {
      this.details=details;
      this.authorization.user=details;
      const suc="Successfully updated the details";
      const act="dismiss";
      this.snackbar.open(suc,act, {
        duration: 1000
      });
      this.authorization.updateLocalUserByRemoving(details);
      console.log(details);
    });
    this.router.navigate([`/${this.type}`]);
  }

}

