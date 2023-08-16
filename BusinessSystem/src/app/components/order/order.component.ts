import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { OrderService } from '../../services/order.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean = false;
  len=false;
  value=50;

  public user;
  public order: any= [];
  public statis:any=[];

  constructor(public mediaobserver: MediaObserver,private orderservice: OrderService, private authorization: AuthorizationService,
    private StatisticsService: StatisticsService) { }

  ngOnInit(): void {
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });

    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.orderservice.GetOneUserOrder(this.user.username,this.user.email)
    .subscribe((data) => {this.order=data;this.check();console.log(this.order)});
    this.GetStatistics();
  }

  GetStatistics()
  {
    this.StatisticsService.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis.Monday.login)});
  }

  check()
  {
    if(this.order.length==0)
    {
      this.len=true;
    }
    else
    {
      this.len=false;
    }
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }

  Cacel(product)
  {
    this.orderservice.DeleteOrder(product._id)
    .subscribe((data)=>{console.log(data);
      // this.change()
    },(err) =>{this.Error();console.log(err)});
    this.order=this.order.filter(x => x._id !=product._id);
    if(this.order.length==0)
    {
      this.len=true;
    }
    else
    {
      this.len=false;
    }
  }

  change()
  {
    var d = new Date();
    var n = d.getDay();
    if(n==1)
    {
      const object1= {
        Monday: {
          login: this.statis.Monday.login,
          Signup: this.statis.Monday.Signup,
          Orders: this.statis.Monday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==2)
    {
      const object1= {
        Tuesday: {
          login: this.statis.Tuesday.login,
          Signup: this.statis.Tuesday.Signup,
          Orders: this.statis.Tuesday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==3)
    {
      const object1= {
        Wednesday: {
          login: this.statis.Wednesday.login,
          Signup: this.statis.Wednesday.Signup,
          Orders: this.statis.Wednesday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==4)
    {
      const object1= {
        Thursday: {
          login: this.statis.Thursday.login,
          Signup: this.statis.Thursday.Signup,
          Orders: this.statis.Thursday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==5)
    {
      const object1= {
        Friday: {
          login: this.statis.Friday.login,
          Signup: this.statis.Friday.Signup,
          Orders: this.statis.Friday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==6)
    {
      const object1= {
        Saturday: {
          login: this.statis.Saturday.login,
          Signup: this.statis.Saturday.Signup,
          Orders: this.statis.Saturday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==7)
    {
      const object1= {
        Sunday: {
          login: this.statis.Sunday.login,
          Signup: this.statis.Sunday.Signup,
          Orders: this.statis.Sunday.Orders-1
        }
      }
      this.StatisticsService.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
  }

  Error()
  {
    alert('something went wrong !');
  }

}
