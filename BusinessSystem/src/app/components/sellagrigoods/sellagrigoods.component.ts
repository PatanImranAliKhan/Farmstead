import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { GoodsService } from '../../services/goods.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TransportService } from '../../services/transport.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sellagrigoods',
  templateUrl: './sellagrigoods.component.html',
  styleUrls: ['./sellagrigoods.component.css']
})
export class SellagrigoodsComponent implements OnInit, OnDestroy {

  username;
  productname="";
  price;
  quantity;
  image;
  address;
  details;
  product;
  errMess;
  result;

  mediaSub: Subscription;
  deviceXs: boolean = false;
  user;
  invalidpage=false;
  responce;
  constructor( public mediaobserver: MediaObserver, private snackbar: MatSnackBar,
    private goods: GoodsService, private router: Router, private dialog: MatDialog, private transport: TransportService) { }

  ngOnInit(): void {
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });

    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    if(this.user.phase!="agriculture")
    {
      this.invalidpage=true;
    }
    else
    {
      this.invalidpage=false;
    }
    console.log(this.invalidpage);
    this.username=this.user.username;
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }


  submit()
  {
    const dialogRef = this.dialog.open(DialogContentComponent, { width: '350px', data: { result: this.result} },
    );
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
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
    this.goods.addproduct(product)
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
    alert('Something Went Wrong!');
  }

  Move(res)
  {
    if(res=="ok")
    {
      const product = {
        username: this.username,
        email: this.user.email,
        productname: this.productname,
        price: this.price,
        image: this.image,
        address: this.address
      }
      console.log(product);
      this.transport.postAgriTransport(product)
      .subscribe((data) => {console.log(data);this.openSnackbar();this.router.navigate(['/agriculture']);},(err) => {this.Error();console.log(err)});
    }
    else
    {
      this.router.navigate(['/agriculture']);
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
