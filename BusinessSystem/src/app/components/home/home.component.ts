import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(public mediaobserver: MediaObserver, private router:Router, private auth:  AuthorizationService){}

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    const details=JSON.parse(localStorage.getItem('token'));
    if(details)
    {
      if(details.username=="admin")
      {
        localStorage.removeItem('token');
      }
    }
    if(this.auth.loggedin())
    {
      const details=JSON.parse(localStorage.getItem('token'));
      const phase=details.resp.phase;
      this.router.navigate([`/${phase}`]);
    }
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

}
