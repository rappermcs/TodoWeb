import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private accountService: AccountService, private router: Router){

  }

  title = 'LOGO Todo App';
  subTitle = 'Logo’nun sizlerle paylaşmaktan gurur duyduğu gerçekleri var!';
  description = 'Daha iyisi için çalışıyoruz..';

  isLoggedIn(): boolean{
    return this.accountService.isLoggedIn();
  }

  logOut(){
    this.accountService.logOut();
    this.router.navigate(['/login']);
  }

}
