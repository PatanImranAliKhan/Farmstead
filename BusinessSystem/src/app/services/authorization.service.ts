import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public user=null;
  agriculture=null;
  aquaculture=null;
  citizen=null;
  public url: String = "http://localhost:2500";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService, private router: Router) { }

  addUser(user,type)
  {
    return this.http.post(`${this.url}/${type}/adduser`,user)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  getresponce(type)
  {
    return this.http.get(`${this.url}/${type}/results`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  deleteUser(user,type)
  {
    return this.http.delete(`${this.url}/${type}/delete/${user.username}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  updateUser(user,type) 
  {
    return this.http.put(`${this.url}/${type}/update/${user.id}`,user)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getUser(user,pass,type)
  {
    return this.http.get(`${this.url}/${type}/getuser/${user}/${pass}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  loggedin()
  {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  updateCart(type, cart)
  {
    return this.http.put(`${this.url}/${type}/updateCart/${cart.id}`,cart)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }


  RequestWater(user)
  {
    return this.http.post(`${this.url}/waterReq/addRequest`,user)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetWaterRequests()
  {
    return this.http.get(`${this.url}/waterReq/getRequests`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }




  updateLocalUser(details)
  {
    const object = {
      token: details.token,
      resp: details.resp
    }
    localStorage.setItem('token',JSON.stringify(object));
  }

  updateLocalUserByRemoving(resp)
  {
    const detail=JSON.parse(localStorage.getItem('token'));
    const object = {
      token: detail.token,
      resp: resp
    }
    localStorage.setItem('token',JSON.stringify(object));
  }
}
