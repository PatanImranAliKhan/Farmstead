import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {

  public url: String="http://localhost:2500";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  getAllRequirements(type)
  {
    return this.http.get(`${this.url}/${type}/results`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getRequirement(type,productname)
  {
    return this.http.get(`${this.url}/${type}/getreq/${productname}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
}
