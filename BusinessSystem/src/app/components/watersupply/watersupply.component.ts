import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-watersupply',
  templateUrl: './watersupply.component.html',
  styleUrls: ['./watersupply.component.css']
})
export class WatersupplyComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;

  public user;
  public username;
  public mobile;
  public address;
  public crop;
  public acres: number;
  public type="agriculture";
  public price: number;
  public data;
  public err;
  public responce;
  invalidpage=false;

  constructor(public mediaobserver: MediaObserver, private authorization: AuthorizationService, private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    if(this.user.phase!="agriculture")
    {
      this.invalidpage=true;
    }
    else
    {
      this.invalidpage=false;
    }
    console.log(this.invalidpage);
    this.username=this.user.username;
    this.mobile=this.user.mobile;
    this.address=this.user.address;
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  onBlurMethod()
  {
    this.price=this.acres*24999;
  }

  Submit()
  {
    const supply = {
      username: this.username,
      email: this.user.email,
      mobile: this.mobile,
      crop: this.crop,
      acres: this.acres,
      address: this.address,
      price: this.price
    };

    this.authorization.RequestWater(supply)
    .subscribe((data) => {this.data=data;this.err=null;this.openSnackbar();this.router.navigate(['/agriculture']);}, (err)=> {this.data=null;this.err=err;this.Error()});
  }

  openSnackbar()
  {
    const data="your data has been posted succesfully";
    const data2="something went wrong in submission";
    const action="dismiss"
    this.snackbar.open(data, action, {
      duration: 1000,
    });
  }

  Error()
  {
    alert('something went wrong;');
  }
}
