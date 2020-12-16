import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit , OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  public login=false;
  constructor(public mediaobserver: MediaObserver, private authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    if(this.authorization.loggedin())
    {
      this.login=true;
    }
    else
    {
      this.login=false;
    }
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
}
