import { Injectable } from '@angular/core';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  loggedIn = false;
  // Simple CheckLogin Operation
  login(user: User): boolean{
    if (user.userName === 'admin' && user.password === 'admin'){
      this.loggedIn = true;
      localStorage.setItem('isLogged', user.userName);
      return true;
    }
    return false;
  }
  // Check User Login Status
  isLoggedIn(){
    return this.loggedIn;
  }

  // User Logout Operation
  logOut(){
    localStorage.removeItem('isLogged');
    this.loggedIn = false;
  }

}
