import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BusinessSystem';

  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(public mediaobserver: MediaObserver){}

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }


}
