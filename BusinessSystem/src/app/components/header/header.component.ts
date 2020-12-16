import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  public present=false;
  constructor(private authorization: AuthorizationService, public mediaobserver: MediaObserver, private OrderService:OrderService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    this.present=this.authorization.loggedin();
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  logout()
  {
    this.authorization.logoutUser();
  }

}
