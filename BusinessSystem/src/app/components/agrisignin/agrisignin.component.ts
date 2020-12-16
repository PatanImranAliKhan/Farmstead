import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-agrisignin',
  templateUrl: './agrisignin.component.html',
  styleUrls: ['./agrisignin.component.css']
})
export class AgrisigninComponent implements OnInit, OnDestroy {

  mediaSub: Subscription;
  deviceXs: boolean;
  self: string;
  SigninForm: FormGroup;
  person;
  errMess;
  statis;

  public days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

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

  createForm()
  {
    this.SigninForm=this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      which: ['',[Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  already()
  {
    this.router.navigate(['/login/agriculture']);
  }

  createAccount()
  {
    const who=this.SigninForm.get('which').value;
    const user = this.SigninForm.value;

    this.authorization.addUser(user,"agriculture")
    .subscribe((data) => {
      this.person=data;
      this.errMess=null;
      const object = {
        token: this.person.token,
        resp: this.person.resp
      }
      localStorage.setItem('token',JSON.stringify(object));
      var d = new Date();
      var n = d.getDay();
      console.log(this.days[n-1]);
      // n=1 monday
      this.Move();
    }, (errMess) => {
        this.errMess = errMess; 
        this.person=null;
        this.Move()
    });
  }

  Move()
  {
    const success = "Successfully Signed in";
    const failure = "Please Enter valid credentials";
    if(this.person!=null&&this.errMess==null)
    {
      this.change();
      this.authorization.user=this.person.resp;
      this.snackbar.open(success, "dismiss", {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/agriculture']);
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
