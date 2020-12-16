import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AquagoodsService } from '../../services/aquagoods.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TransportService } from '../../services/transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sellaquaproducts',
  templateUrl: './sellaquaproducts.component.html',
  styleUrls: ['./sellaquaproducts.component.css']
})
export class SellaquaproductsComponent implements OnInit , OnDestroy {

  public product;
  username;
  productname: String;
  price;
  quantity;
  image;
  address;
  details;
  errMess;
  user;
  public result;
  responce;
  invalidpage=false;

  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(public mediaobserver: MediaObserver,private snackbar: MatSnackBar,
    private aquagoods: AquagoodsService, private router: Router, private dialog: MatDialog, private transport: TransportService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

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
    console.log(this.user);
    this.username=this.user.username;
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  submit()
  {
    const dialogRef = this.dialog.open(DialogContentComponent, { width: '350px', data: { result: this.result} },
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result=result;
      this.Transfer(result);
    });

  }


  Transfer(res)
  {
    const product = {
      username: this.username,
      email:this.user.email,
      productname: this.productname,
      price: this.price,
      image: this.image,
      address: this.address
    }
    this.aquagoods.addproduct(product)
    .subscribe((details) => {
      this.product=details;
      this.errMess=null;
      this.Move(res);
    }, (errMess) => {
      this.errMess=errMess;
      this.product=null;
    });
  }

  Error()
  {
    alert('Somthing Went Wrong!');
  }

  Move(res)
  {
    if(res=="ok")
    {
      const product = {
        username: this.username,
        email:this.user.email,
        productname: this.productname,
        price: this.price,
        image: this.image,
        address: this.address
      }
      console.log(res);
      this.transport.postAquaTransport(product)
      .subscribe((data) => {console.log(data);this.openSnackbar();this.router.navigate(['/aquaculture']);},(err)=>{this.Error()});
    }
    else
    {
      this.router.navigate(['/aquaculture']);
    }
  }

  openSnackbar()
  {
    const data="your data has been posted succesfully";
    const data2="something went wrong in submission";
    const action="dismiss"
    this.snackbar.open(data, action, {
      duration: 1000,
    });
  }
}
