import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './auth.service';

declare var Mmenu: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
  constructor(public AuthService: AuthService) {}

  ngAfterViewInit() {
    const menuElement = document.querySelector('#menu');
    if (menuElement) {
      new Mmenu(menuElement);
    }
  }
}
