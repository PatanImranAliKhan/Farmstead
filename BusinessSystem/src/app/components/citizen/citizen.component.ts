import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean = false;
  invalidpage=false;

  constructor(public mediaobserver: MediaObserver, private router: Router, private authorization: AuthorizationService){}

  ngOnInit(){
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });
    const details=JSON.parse(localStorage.getItem('token'));
    if(details.resp.phase!="citizen")
    {
      this.invalidpage=true;
    }
    else
    {
      this.invalidpage=false;
    }
    console.log(this.invalidpage);
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }

}
