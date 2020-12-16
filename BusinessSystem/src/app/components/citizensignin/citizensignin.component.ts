import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-citizensignin',
  templateUrl: './citizensignin.component.html',
  styleUrls: ['./citizensignin.component.css']
})
export class CitizensigninComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  CSigninForm: FormGroup;
  citizen;
  errMess;
  statis

  constructor(public mediaobserver: MediaObserver, private fb: FormBuilder, private router: Router, 
    private authorization: AuthorizationService, private snackbar: MatSnackBar, private statistics: StatisticsService){}

  ngOnInit(){
    this.mediaSub = this.mediaobserver.media$.subscribe((res: MediaChange) => {
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    });
    this.createForm();
    this.statistics.getStatistics()
    .subscribe((data) => {this.statis=data[0];console.log(this.statis.Monday.login)});
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  createForm()
  {
    this.CSigninForm=this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }
  
  already()
  {
    this.router.navigate(['/login/citizen']);
  }

  createAccount()
  {
    const data=this.CSigninForm.value;
    this.authorization.addUser(data,"citizen")
      .subscribe((data) => { 
        this.citizen=data; 
        this.errMess=null;
        const object = {
          token: this.citizen.token,
          resp: this.citizen.resp
        }
        localStorage.setItem('token',JSON.stringify(object));
        this.Move()
      }, (errMess) => {
        this.errMess=errMess; 
        this.citizen=null;
        this.Move()
      });
    
  }

  Move()
  {
    const success = "Successfully Signed in";
    const failure = "Please Enter valid credentials";
    if(this.citizen!=null && this.errMess==null)
    {
      this.change();
      this.authorization.user=this.citizen.resp;
      this.snackbar.open(success, "dismiss", {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/citizen']);
      }, 1000);
    }
    else
    {
      this.snackbar.open(failure, "dismiss", {
        duration: 2000,
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
          login: this.statis.Monday.login,
          Signup: this.statis.Monday.Signup+1,
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
          login: this.statis.Tuesday.login,
          Signup: this.statis.Tuesday.Signup+1,
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
          login: this.statis.Wednesday.login,
          Signup: this.statis.Wednesday.Signup+1,
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
          login: this.statis.Thursday.login,
          Signup: this.statis.Thursday.Signup+1,
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
          login: this.statis.Friday.login,
          Signup: this.statis.Friday.Signup+1,
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
          login: this.statis.Saturday.login,
          Signup: this.statis.Saturday.Signup+1,
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
          login: this.statis.Sunday.login,
          Signup: this.statis.Sunday.Signup+1,
          Orders: this.statis.Sunday.Orders
        }
      }
      this.statistics.updateStatistics(object1)
      .subscribe((data) => {console.log(data)});
    }
  }

}
