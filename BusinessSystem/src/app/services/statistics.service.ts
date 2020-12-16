import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  public url: String="http://localhost:2500/statistics";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  getStatistics()
  {
    return this.http.get(`${this.url}/getStatistics`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  postStatistics(object)
  {
    return this.http.post(`${this.url}/addStatistics`,object)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  updateStatistics(object)
  {
    return this.http.put(`${this.url}/updateStatistics/5fd4c43da7dad9184064debd`,object)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}
