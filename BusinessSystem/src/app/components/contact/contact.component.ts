import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean = false;
  type;
  star1=true;
  star2=false;
  star3=false;
  star4=false;
  star5=false;
  stars=[1,2,3,4,5];
  public user;
  rating: number=1;
  public feedbacks:any=[];
  FeedbackForm: FormGroup=this.fb.group({
    username: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
    sector: [''],
    rating:[1],
    comment: ['', Validators.required]
  });

  constructor(public mediaobserver: MediaObserver, private fb: FormBuilder, private feedbackservice: FeedbackService,
    private authorization:AuthorizationService, private router: Router, private snackbar: MatSnackBar,){}

  ngOnInit(){
    // this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
    //   this.deviceXs = res.mqAlias === "xs" ? true : false;
    // });
    this.GetFeedback();
    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    if(this.user!=null)
    {
      this.FeedbackForm.controls.username.setValue(this.user.username);
      this.FeedbackForm.controls.email.setValue(this.user.email);
      this.FeedbackForm.controls.mobile.setValue(this.user.mobile);
      this.FeedbackForm.controls.sector.setValue(this.user.phase);
    }
  }

  GetFeedback()
  {
    this.feedbackservice.getFeedback()
    .subscribe((data) => { this.feedbacks=data; console.log(this.feedbacks)},(err) => {console.log(err)});
  }

  ngOnDestroy(){
    // this.mediaSub.unsubscribe();
  }

  Submit()
  {
    const feedback=this.FeedbackForm.value;
    console.log(feedback);
    this.feedbackservice.postfeedback(feedback)
    .subscribe((data) => {console.log(data);this.Succes();},(err) => {console.log(err);this.Error()});
    this.feedbacks.push(this.FeedbackForm.value);
  }
  Succes()
  {
    const suc="Feedback Submission was success";
    const action="Dismiss";
    this.snackbar.open(suc,action, {
      duration:1000
    });
  }

  Error()
  {
    alert('Failure in sending feedback');
  }

  Sub1()
  {
    this.star1=true;
    this.star2=false;
    this.star3=false;
    this.star4=false;
    this.star5=false;
    this.rating=1;
    this.FeedbackForm.controls.rating.setValue(this.rating);
  }

  Sub2()
  {
    this.star1=true;
    this.star2=true;
    this.star3=false;
    this.star4=false;
    this.star5=false;
    this.rating=2;
    this.FeedbackForm.controls.rating.setValue(this.rating);
  }

  Sub3()
  {
    this.star1=true;
    this.star2=true;
    this.star3=true;
    this.star4=false;
    this.star5=false;
    this.rating=3;
    this.FeedbackForm.controls.rating.setValue(this.rating);
  }

  Sub4()
  {
    this.star1=true;
    this.star2=true;
    this.star3=true;
    this.star4=true;
    this.star5=false;
    this.rating=4;
    this.FeedbackForm.controls.rating.setValue(this.rating);
  }

  Sub5()
  {
    this.star1=true;
    this.star2=true;
    this.star3=true;
    this.star4=true;
    this.star5=true;
    this.rating=5;
    this.FeedbackForm.controls.rating.setValue(this.rating);
  }
}
