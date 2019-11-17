import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { filter } from 'rxjs/operators';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
      this.router.events.pipe(
        filter(e => e instanceof RouterEvent)
      ).subscribe(e => {
        if (e instanceof NavigationStart){
          this.loading = true;
        }

        if (e instanceof NavigationEnd ||
           e instanceof NavigationCancel ||
           e instanceof NavigationError){
             this.loading = false;
           }
      });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
    console.log('Log out');
  }

  displayMessages() {
    this.router.navigate([{outlets: { popup: 'messages'}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages() {
    this.router.navigate([{outlets: { popup: null }}]);
    this.messageService.isDisplayed = false;
  }
}
