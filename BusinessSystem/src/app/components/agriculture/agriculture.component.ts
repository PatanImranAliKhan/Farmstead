import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.css']
})
export class AgricultureComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  invalidpage=false;

  constructor(public mediaobserver: MediaObserver,private router: Router, private authorization: AuthorizationService){}

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    const details=JSON.parse(localStorage.getItem('token'));
    if(details.resp.phase!="agriculture")
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
