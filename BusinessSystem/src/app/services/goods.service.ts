import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  public url: String="http://localhost:2500/agriproducts";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  getallproducts()
  {
    return this.http.get(`${this.url}/results`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getproduct(productname)
  {
    return this.http.get(`${this.url}/getproduct/${productname}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetNullQuantityAgriProduct()
  {
    return this.http.get(`${this.url}/Equal0`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  updateproduct(product)
  {
    return this.http.put(`${this.url}/updateproduct/${product.id}`,product)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  addproduct(product)
  {
    return this.http.post(`${this.url}/addproduct`,product)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  deleteproduct(id)
  {
    return this.http.delete(`${this.url}/deleteproduct/${id}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}
