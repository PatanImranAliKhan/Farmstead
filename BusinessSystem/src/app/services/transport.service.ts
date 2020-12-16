import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  public url1: String="http://localhost:2500/agritransport";
  public url2: String="http://localhost:2500/aquatransport";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  getAllAgriTransportData()
  {
    return this.http.get(`${this.url1}/results`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getAllAquaTransportData()
  {
    return this.http.get(`${this.url2}/results`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  postAgriTransport(data)
  {
    return this.http.post(`${this.url1}/addData`,data)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  postAquaTransport(data)
  {
    return this.http.post(`${this.url2}/addData`,data)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  deleteAgriData(id)
  {
    return this.http.delete(`${this.url1}/delete/${id}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  deleteAquaData(id)
  {
    return this.http.delete(`${this.url2}/delete/${id}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetAgriTransportData(username,email)
  {
    return this.http.get(`${this.url1}/getTransportData/${username}/${email}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  GetAquaTransportData(username,email)
  {
    return this.http.get(`${this.url2}/getTransportData/${username}/${email}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}
