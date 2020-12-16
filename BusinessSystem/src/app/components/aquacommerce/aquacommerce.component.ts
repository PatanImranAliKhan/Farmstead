import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { RequirementsService } from '../../services/requirements.service';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { OrderService } from '../../services/order.service';
import { StatisticsService } from '../../services/statistics.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-aquacommerce',
  templateUrl: './aquacommerce.component.html',
  styleUrls: ['./aquacommerce.component.css']
})
export class AquacommerceComponent implements OnInit , OnDestroy {

  public products: any=[];
  public errMess;
  public data="";
  invalid=false;
  cart=[];
  public user;
  public responce;
  statis;
  orders: any=[];
  public invalidpage=false;

  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(public mediaobserver: MediaObserver, private requirements: RequirementsService, private dialog: MatDialog,
    private router: Router, private authorization: AuthorizationService,private OrderService: OrderService, 
    private statistics:StatisticsService, private snackbar: MatSnackBar){}

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

    this.GetStatistics();

    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    if(this.user.phase!="aquaculture")
    {
      this.invalidpage=true;
    }
    else
    {
      this.invalidpage=false;
    }
    console.log(this.invalidpage);
    this.requirements.getAllRequirements("aquarequirements")
    .subscribe((details) => { this.products=details;this.errMess=null; this.invalid=false;}, (errMess) => {this.errMess=errMess;this.products=null; this.invalid=true;});
    if(this.products.length==0)
    {
      this.invalid=true;
    }
    else
    {
      this.invalid=false;
    }
  }

  GetStatistics()
  {
    this.statistics.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis.Monday.login)});
  }

  Getall()
  {
    this.invalid=false;
    this.requirements.getAllRequirements("aquarequirements")
    .subscribe((details) => { this.products=details;this.errMess=null;this.invalid=false;}, (errMess) => {this.errMess=errMess;this.products=null;this.invalid=true;});
    this.data="";
    if(this.products.length==0)
    {
      this.invalid=true;
    }
    else
    {
      this.invalid=false;
    }
  }

  Order(product)
  {
    this.OrderService.GetOneUserOrder(this.user.username,this.user.email)
    .subscribe((data) => {this.orders=data;this.checkOrder(product)});
  }

  checkOrder(product)
  {
    let flag=1;
    for(let i=0;i<this.orders.length;i++)
    {
      if(this.orders[i]._id==product._id)
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
        width: '250px',
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

  AddToCart(product)
  {
    var flag=0;
    for(let i=0;i<this.cart.length;i++)
    {
      if(this.cart[i].productname == product.productname)
      {
        flag=1;
      }
    }
    console.log(flag);
    if(flag==1)
    {
      alert("Already this product is in the cart");
    }
    else
    {
      if(product.quantity==null)
      {
        product.quantity=1;
      }
      const object = {
        id: this.user._id,
        cart: {
          productname: product.productname,
          image: product.image,
          price: product.price,
          quantity: product.quantity
        }
      }
      this.authorization.updateCart(this.user.phase,object)
      .subscribe((data) => {this.responce=data;this.authorization.updateLocalUser(data)},(err) => {this.Error()});
    }
    this.cart.push(product);
  }

  PlaceOrder(res,product)
  {
    if(res=="yes")
    {
      this.change();
      const object = {
        email: this.user.email,
        username: this.user.username,
        mobile: this.user.mobile,
        productname: product.productname,
        image: product.image,
        price: product.price,
        quantity: product.quantity
      }
      this.OrderService.AddOrder(object)
      .subscribe((data) => {console.log(data);this.Removefromcart(product);this.orders.push(product)});
    }
  }
  Removefromcart(product)
  {
    this.cart.filter(x => x._id==product._id);
    const object= {
      id: this.user._id,
      cart: this.cart
    }
    const abc="order has placed succesfully";
    const dismiss="Dismiss";
    this.snackbar.open(abc,dismiss,{
      duration: 3000
    });
    this.authorization.updateUser(object,this.user.phase)
    .subscribe((data) => {this.responce=data;this.authorization.updateLocalUserByRemoving(data)},(err) => {this.Error()});
  }

  Error()
  {
    alert('something went wrong!');
  }

  SearchByData()
  {
    if(this.data=="")
    {
      this.Getall();
    }
    else
    {
      this.products=this.products.filter(x=> {
        return x.productname.toLocaleLowerCase().match(this.data.toLocaleLowerCase());
      })
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