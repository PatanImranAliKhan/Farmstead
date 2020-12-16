import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AuthorizationService } from '../../services/authorization.service';
import { GoodsService } from '../../services/goods.service';
import { AquagoodsService } from '../../services/aquagoods.service';
import { FeedbackService } from '../../services/feedback.service';
import { TransportService } from '../../services/transport.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CanvasJS from './canvasjs.min';
import { StatisticsService } from '../../services/statistics.service';
import { Router } from '@angular/router';
import { RequirementsService } from '../../services/requirements.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  orders:any=[];
  waterRequests:any=[];
  AgriRequirement:any=[];
  AquaRequirement:any=[];
  AgriSells:any=[];
  AquaSells:any=[];
  AgriTransport:any=[];
  AquaTransport:any=[];
  feedback;
  hide1=true;
  hide2=false;
  statis;
  agriculturelist:any=[];
  aquaculturelist:any=[];
  citizenlist:any=[];
  AgriReq=this.fb.group({
    productname: ['',[Validators.required,Validators.minLength(2)]],
    price: ['',Validators.required],
    image: ['',[Validators.required, Validators.minLength(3)]],
  });
  AquaReq=this.fb.group({
    productname: ['',[Validators.required,Validators.minLength(2)]],
    price: ['',Validators.required],
    image: ['',[Validators.required, Validators.minLength(3)]],
  });
  constructor(public mediaobserver: MediaObserver,private orderservice: OrderService,private authorization: AuthorizationService,
    private AgriGoods: GoodsService, private AquaGoods: AquagoodsService, private FeedbackService: FeedbackService,
    private TransportService:TransportService, private fb: FormBuilder, private StatisticsService: StatisticsService,
    private router: Router, private RequirementsService: RequirementsService) { }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    const user=JSON.parse(localStorage.getItem('token'));
    if(user.username!="admin")
    {
      this.router.navigate(['/home']);
    }

    this.getStatistics();

    this.getProducts();
    this.getRequirements();
    this.GetTransport();

    this.getList();
    this.getWater();

    this.orderservice.GetOrders()
    .subscribe((data) => {this.orders=data;},(err) => {this.orders=null});

    this.FeedbackService.getFeedback()
    .subscribe((data) => {this.feedback=data; console.log(this.feedback)},(err) => {this.feedback=null});
  }

  getWater()
  {
    this.authorization.GetWaterRequests()
    .subscribe((data) => {this.waterRequests=data});
  }

  getList()
  {
    this.authorization.getresponce("agriculture")
    .subscribe((data) => {this.agriculturelist=data;});
    this.authorization.getresponce("aquaculture")
    .subscribe((data) => {this.aquaculturelist=data});
    this.authorization.getresponce("citizen")
    .subscribe((data) => {this.citizenlist=data});
  }

  getProducts()
  {
    this.AgriGoods.getallproducts()
    .subscribe((data) => {this.AgriSells=data});
    this.AquaGoods.getallproducts()
    .subscribe((data) =>{this.AquaSells=data});
  }

  getRequirements()
  {
    this.RequirementsService.getAllRequirements("agriculture")
    .subscribe((data) => {this.AgriRequirement=data});
    this.RequirementsService.getAllRequirements("aquaculture")
    .subscribe((data) => {this.AquaRequirement=data});
  }

  GetTransport()
  {
    this.TransportService.getAllAgriTransportData()
    .subscribe((data) => {this.AgriTransport=data});
    this.TransportService.getAllAquaTransportData()
    .subscribe((data) => {this.AquaTransport=data});
  }

  Chart()
  {
    let chart1 = new CanvasJS.Chart("login", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Logged History"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.statis.Monday.login, label: "Mon" },
          { y: this.statis.Tuesday.login, label: "Tue" },
          { y: this.statis.Wednesday.login, label: "Wed" },
          { y: this.statis.Thursday.login, label: "Thu" },
          { y: this.statis.Friday.login, label: "Fri" },
          { y: this.statis.Saturday.login, label: "Sat" },
          { y: this.statis.Sunday.login, label: "Sun" }
        ]
      }]
    });
      
    chart1.render();
    let chart2 = new CanvasJS.Chart("Signup", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Signup History"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.statis.Monday.Signup, label: "Mon" },
          { y: this.statis.Tuesday.Signup, label: "Tue" },
          { y: this.statis.Wednesday.Signup, label: "Wed" },
          { y: this.statis.Thursday.Signup, label: "Thu" },
          { y: this.statis.Friday.Signup, label: "Fri" },
          { y: this.statis.Saturday.Signup, label: "Sat" },
          { y: this.statis.Sunday.Signup, label: "Sun" }
        ]
      }]
    });
      
    chart2.render();
    let chart3 = new CanvasJS.Chart("Orders", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Ordered History"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.statis.Monday.Orders, label: "Mon" },
          { y: this.statis.Tuesday.Orders, label: "Tue" },
          { y: this.statis.Wednesday.Orders, label: "Wed" },
          { y: this.statis.Thursday.Orders, label: "Thu" },
          { y: this.statis.Friday.Orders, label: "Fri" },
          { y: this.statis.Saturday.Orders, label: "Sat" },
          { y: this.statis.Sunday.Orders, label: "Sun" }
        ]
      }]
    });
      
    chart3.render();

    chart2.render();
    let chart4 = new CanvasJS.Chart("LoginSignupOrders", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Statistics Of Website Traffic (Orders, Signin and Login)"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: this.statis.Monday.Orders+this.statis.Monday.login+this.statis.Monday.Signup, label: "Mon" },
          { y: this.statis.Tuesday.Orders+this.statis.Tuesday.login+this.statis.Tuesday.Signup, label: "Tue" },
          { y: this.statis.Wednesday.Orders+this.statis.Wednesday.login+this.statis.Wednesday.Signup, label: "Wed" },
          { y: this.statis.Thursday.Orders+this.statis.Thursday.login+this.statis.Thursday.Signup, label: "Thu" },
          { y: this.statis.Friday.Orders+this.statis.Friday.login+this.statis.Friday.login, Signup: "Fri" },
          { y: this.statis.Saturday.Orders+this.statis.Saturday.login+this.statis.Saturday.Signup, label: "Sat" },
          { y: this.statis.Sunday.Orders+this.statis.Sunday.login+this.statis.Sunday.Signup, label: "Sun" }
        ]
      }]
    });
    chart4.render();
  }

  getStatistics()
  {
    this.StatisticsService.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis);this.Chart()});
  }

  Error()
  {
    alert('something went wrong!');
  }


  AddAgriRequirement()
  {
    const req=this.AgriReq.value;
    this.orderservice.AddAgriRequirement(req)
    .subscribe((data) => { console.log(data);this.AgriReq.reset()},(err) => {this.Error()});
  }

  AddAquaRequirement()
  {
    const req=this.AquaReq.value;
    this.orderservice.AddAquaRequirement(req)
    .subscribe((data) => { console.log(data);this.AquaReq.reset()},(err) => {this.Error()});
  }

  EditOrderProgress(order)
  {
    const object = {
      id:order._id,
      progress: order.progress
    }
    this.orderservice.updateOrder(object)
    .subscribe((data) => {console.log(data)},(err) => {this.Error()});
  }

  CancelOrder(order)
  {
    this.orderservice.DeleteOrder(order._id)
    .subscribe();
    this.orders=this.orders.filter(x=> x._id!=order._id);
  }
}
