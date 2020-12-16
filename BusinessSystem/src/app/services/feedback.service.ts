import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public url: String ="http://localhost:2500/feedback";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  postfeedback(feedback)
  {
    return this.http.post(`${this.url}/addfeedback`,feedback)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getFeedback()
  {
    return this.http.get(`${this.url}/feedbacks`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}
