import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-aquatransport',
  templateUrl: './aquatransport.component.html',
  styleUrls: ['./aquatransport.component.css']
})
export class AquatransportComponent implements OnInit , OnDestroy {

  public details: any=[];
  public errMess;
  public user;
  public responce;
  public empty=false;
  invalidpage=false;

  mediaSub: Subscription;
  deviceXs: boolean;
  displayedColumns: string[] = ['productname', 'image', 'price', 'address','_id'];
  constructor(private transport: TransportService, public mediaobserver: MediaObserver
    ,private router: Router, private authorization: AuthorizationService) { }

  ngOnInit(): void {

    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });

    const det=JSON.parse(localStorage.getItem('token'));
    this.user=det.resp;
    if(this.user.phase!="aquaculture")
    {
      this.invalidpage=true;
    }
    else
    {
      this.invalidpage=false;
    }
    console.log(this.invalidpage);

    this.transport.GetAquaTransportData(this.user.username,this.user.email)
    .subscribe((data) => {this.details=data;console.log(this.details);this.empty=false;},(err)=>{console.log(err);this.Error()});
    if(this.details.length==0)
    {
      this.empty=true;
    }
    else
    {
      this.empty=false;
    }
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  Delete(product)
  {
    this.transport.deleteAquaData(product._id)
    .subscribe((data) => {console.log(data);},(err) => {this.Error()});

    this.details.filter(x => x._id != product._id);
    if(this.details.length==0)
    {
      this.empty=true;
    }
    else
    {
      this.empty=false;
    }
  }


  Error()
  {
    alert('something went Wrong!');
  }

}
