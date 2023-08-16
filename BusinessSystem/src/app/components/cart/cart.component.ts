import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component'
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean = false;
  statis;

  public user;
  public cart=[];
  public orders = [];
  public ordersplaced:any=[];
  public responce;
  len=false;
  constructor(public mediaobserver: MediaObserver, private dialog: MatDialog, private authorization: AuthorizationService,
    private router: Router, private snackbar: MatSnackBar, private orderservice: OrderService,
     private statistics:StatisticsService) { }

  ngOnInit(): void {
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });

    this.GetStatistics();

    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.cart=this.user.cart;
    if(this.cart.length == 0 )
    {
      this.len=true;
    }
    else
    {
      this.len=false;
    }

    console.log(this.len);
  }

  GetStatistics()
  {
    this.statistics.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis.Monday.login)});
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }

  Remove(product)
  {
    this.cart=this.cart.filter(x => x.productname != product.productname);
    const object= {
      id: this.user._id,
      cart: this.cart
    }
    if(this.cart.length==0)
    {
      this.len=true;
    }
    else
    {
      this.len=false;
    }
    console.log(object);
    this.authorization.updateUser(object,this.user.phase)
    .subscribe((data) => {this.responce=data;console.log(data);this.authorization.updateLocalUserByRemoving(data);this.router.navigate(['/cart'])},(err) => {this.Error()});
  }
  Order(product)
  {
    this.orderservice.GetOneUserOrder(this.user.username,this.user.email)
    .subscribe((data) => {this.ordersplaced=data;;this.checkOrder(product);});
  }

  checkOrder(product)
  {
    let flag=1;
    for(let i=0;i<this.ordersplaced.length;i++)
    {
      if(this.ordersplaced[i].productname==product.productname)
      {
        flag=0;
      }
    }
    if(flag==1)
    {
      if(product.quantity==null)
      {
        product.quantity=1;
      }
      const price=product.quantity * product.price;
      const dialogRef = this.dialog.open(CartDialogComponent, {
        width: '400px',
        data: {price: price}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.PlaceOrder(result,product);
      });
    }
    else
    {
      alert("Already this product is in your's orders list");
    }
  }


  Error()
  {
    alert('something went Wrong!');
  }

  PlaceOrder(res,product)
  {
    if(res=="yes")
    {
      // this.change();
      const object = {
        username: this.user.username,
        email:this.user.email,
        mobile: this.user.mobile,
        productname: product.productname,
        image: product.image,
        price: product.price,
        quantity: product.quantity
      }
      this.orderservice.AddOrder(object)
      .subscribe((data) => {console.log(data);this.Remove(product);this.ordersplaced.push(product);},(err) => {this.Error()});
    }
  }

  OrderAll()
  {
    for(let i=0;i<this.cart.length;i++)
    {
      const object123= {
        username: this.user.username,
        email: this.user.email,
        mobile: this.user.mobile,
        productname: this.cart[i].productname,
        image: this.cart[i].image,
        price: this.cart[i].price,
        quantity: this.cart[i].quantity
      }
      this.orders.push(object123);
    }
    console.log(this.orders);
    const object= {
      id: this.user._id,
      cart: []
    }
    console.log(object);
    this.authorization.updateUser(object,this.user.phase)
    .subscribe((data) => {this.authorization.updateLocalUserByRemoving(data)},(err) => {this.Error()});

    this.orderservice.Postmanyorders(this.orders)
    .subscribe((data) =>{console.log(data);this.opensnack(true);this.ordersplaced.push(this.orders);},(err) => {this.Error()});
  }

  opensnack(bool)
  {
    const success="Your order has been placed succesfully";
    const action="dismiss";
    this.snackbar.open(success, action, {
      duration: 1000,
    });
    if(bool)
    {
      if(this.user.phase == "agriculture")
      {
        this.router.navigate(['/agricommerce']);
      }
      else if(this.user.phase == "aquaculture")
      {
        this.router.navigate(['/aquacommerce']);
      }
      else
      {
        this.router.navigate(['/citizen']);
      }
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
          Orders: this.statis.Monday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==2)
    {
      const object1= {
        Tuesday: {
          login: this.statis.Tuesday.login,
          Signup: this.statis.Tuesday.Signup,
          Orders: this.statis.Tuesday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==3)
    {
      const object1= {
        Wednesday: {
          login: this.statis.Wednesday.login,
          Signup: this.statis.Wednesday.Signup,
          Orders: this.statis.Wednesday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==4)
    {
      const object1= {
        Thursday: {
          login: this.statis.Thursday.login,
          Signup: this.statis.Thursday.Signup,
          Orders: this.statis.Thursday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==5)
    {
      const object1= {
        Friday: {
          login: this.statis.Friday.login,
          Signup: this.statis.Friday.Signup,
          Orders: this.statis.Friday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==6)
    {
      const object1= {
        Saturday: {
          login: this.statis.Saturday.login,
          Signup: this.statis.Saturday.Signup,
          Orders: this.statis.Saturday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==7)
    {
      const object1= {
        Sunday: {
          login: this.statis.Sunday.login,
          Signup: this.statis.Sunday.Signup,
          Orders: this.statis.Sunday.Orders+1
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
  }

}
