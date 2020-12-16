import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import {  Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Login: FormGroup;
  type: String;
  errMess: String;
  statis;

  details;
  mediaSub: Subscription;
  deviceXs: boolean;
  public days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  constructor(private fb:FormBuilder,private route: ActivatedRoute, private router: Router, private authorization: AuthorizationService
    ,public mediaobserver: MediaObserver, private auth: AuthorizationService, private snackbar: MatSnackBar, private statistics:StatisticsService)
  { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap) => {
      this.type = params.get('type');
      console.log(this.type);
    });
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    const details=JSON.parse(localStorage.getItem('token'));
    if(details)
    {
      if(details.username=="admin")
      {
        localStorage.removeItem('token');
      }
    }
    this.createForm();
    this.statistics.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis.Monday.login)});
  }

  createForm()
  {
    this.Login=this.fb.group(
      {
        user : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
      }
    )
  }

  onSubmit()
  {
    const log=this.Login.value;
    this.authorization.getUser(log.user,log.password,this.type)
      .subscribe((details) => {
        this.details = details;
        this.errMess=null;
        console.log(this.details.a);
        if(this.details.a)
        {
          localStorage.setItem('token',JSON.stringify(this.details.resp));
          this.router.navigate(['/admin']);
        }
        else
        {
          const object = {
            token: this.details.token,
            resp: this.details.resp[0]
          }
          localStorage.setItem('token',JSON.stringify(object));
          this.Move()
        }
      }, (errMess) => {
        this.errMess=errMess; 
        this.details=null;
        this.Move()});
    const message=log.user;
  }

  already(){
    this.router.navigate([`/signin/${this.type}`]);
  }

  Move()
  {
    const success = "Successfully logged in";
    const failure = "invalid username and Password";
    const action="Dismiss";
    if(this.details!=null && this.errMess==null)
    {
      this.snackbar.open(success, action, {
        duration: 1000,
      });
      this.authorization.user=this.details.resp[0];
      this.change();
      this.router.navigate([`/${this.type}`]);
    }
    else
    {
      this.snackbar.open(failure, action, {
        duration: 1000,
      });
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
          login: this.statis.Monday.login+1,
          Signup: this.statis.Monday.Signup,
          Orders: this.statis.Monday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==2)
    {
      const object1= {
        Tuesday: {
          login: this.statis.Tuesday.login+1,
          Signup: this.statis.Tuesday.Signup,
          Orders: this.statis.Tuesday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==3)
    {
      const object1= {
        Wednesday: {
          login: this.statis.Wednesday.login+1,
          Signup: this.statis.Wednesday.Signup,
          Orders: this.statis.Wednesday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==4)
    {
      const object1= {
        Thursday: {
          login: this.statis.Thursday.login+1,
          Signup: this.statis.Thursday.Signup,
          Orders: this.statis.Thursday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==5)
    {
      const object1= {
        Friday: {
          login: this.statis.Friday.login+1,
          Signup: this.statis.Friday.Signup,
          Orders: this.statis.Friday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==6)
    {
      const object1= {
        Saturday: {
          login: this.statis.Saturday.login+1,
          Signup: this.statis.Saturday.Signup,
          Orders: this.statis.Saturday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    else if(n==7)
    {
      const object1= {
        Sunday: {
          login: this.statis.Sunday.login+1,
          Signup: this.statis.Sunday.Signup,
          Orders: this.statis.Sunday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
    if(this.type=="agriculture")
    {
      this.authorization.agriculture=this.details.resp[0];
      this.authorization.aquaculture=null;
      this.authorization.citizen=null;
    }
    if(this.type=="aquaculture")
    {
      this.authorization.aquaculture=this.details.resp[0];
      this.authorization.agriculture=null;
      this.authorization.citizen=null;

    }
    if(this.type=="citizen")
    {
      this.authorization.citizen=this.details.resp[0];
      this.authorization.aquaculture=null;
      this.authorization.agriculture=null;
    }
  }

}
