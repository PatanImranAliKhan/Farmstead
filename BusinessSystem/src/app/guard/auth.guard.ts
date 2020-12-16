import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthorizationService){}
  canActivate() : boolean
  {
    if(this.auth.loggedin())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/']);
      return false;
    }
  }
    
}
