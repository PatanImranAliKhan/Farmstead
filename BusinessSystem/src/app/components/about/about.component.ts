import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean = false;


  constructor(public mediaobserver: MediaObserver){}

  ngOnInit(){
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }

}
