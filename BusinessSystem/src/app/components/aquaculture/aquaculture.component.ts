import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-aquaculture',
  templateUrl: './aquaculture.component.html',
  styleUrls: ['./aquaculture.component.css']
})
export class AquacultureComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  invalidpage=false;

  constructor(public mediaobserver: MediaObserver,private router: Router, private authorization: AuthorizationService){}

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    const details=JSON.parse(localStorage.getItem('token'));
    console.log(details);
    
    if(details.resp.phase!="aquaculture")
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
    this.mediaSub.unsubscribe();
  }

}
