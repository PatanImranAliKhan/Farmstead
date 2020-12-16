import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url: String="http://localhost:2500/order";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService, private router: Router) { }

  AddOrder(order)
  {
    return this.http.post(`${this.url}/addorder`,order)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  Postmanyorders(orders)
  {
    return this.http.post(`${this.url}/addmoreorders`,orders)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetOrders()
  {
    return this.http.get(`${this.url}/orders`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  updateOrder(order)
  {
    return this.http.put(`${this.url}/updateOrder/${order.id}`,order)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  DeleteOrder(id)
  {
    return this.http.delete(`${this.url}/deleteorder/${id}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetOneUserOrder(username,email)
  {
    return this.http.get(`${this.url}/getOrder/${username}/${email}`);
  }

  AddAgriRequirement(data)
  {
    return this.http.post('http://localhost:2500/agrirequirements/addreq',data)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  AddAquaRequirement(data)
  {
    return this.http.post('http://localhost:2500/aquarequirements/addreq',data)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}